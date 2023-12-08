import { getClient } from '@/utils/client'
import getStripe from '@/utils/stripe'

import { gql } from '../../../__generated__'

export async function POST(req: Request) {
  const payload = await req.text()

  const sig = req.headers.get('stripe-signature') as string
  let event
  const endpointSecret = process.env.WEBHOOK_SECRET as string
  const client = await getClient()

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (error) {
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    })
  }
  switch (event.type) {
    case 'checkout.session.completed': {
      const checkoutSessionCompleted = event.data.object as any
      const bookingId = checkoutSessionCompleted.metadata?.booking as string
      const optionalTours = checkoutSessionCompleted.metadata?.optionalTours
      if (optionalTours && bookingId) {
        await client.mutate({
          mutation: gql(`
            #graphql
            mutation UpdateBookingExtras($id:String!,$key:String!){
              completeExtrasBooking(booking: $id, token:$key)
            }
          `),
          variables: {
            id: bookingId,
            key: process.env.BACKEND_SECRET!,
          },
        })
      } else {
        const booking = await client.query({
          query: gql(`
            #graphql
            query GetBooking($id:String!){
              booking(id: $id){
                email
              }
            }
          `),
          variables: {
            id: bookingId,
          },
        })
        client.mutate({
          mutation: gql(`
            #graphql
            mutation UpdateBookingPayment($id:String!, $key:String!, $paid:Int!){
              completeBooking(booking: $id, token:$key, paid:$paid)
            }`),
          variables: {
            id: bookingId,
            key: process.env.BACKEND_SECRET!,
            paid: checkoutSessionCompleted.amount_total,
          },
        })
        fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/email', {
          method: 'POST',
          body: JSON.stringify({
            subject: 'New Bookings!',
            to: booking.data.booking?.email,
            html: `Thanks for the new booking. Create a new account by visiting <a href="https://traviio.vercel.app/signup?email=${booking.data.booking?.email}">here.</a>`,
            text: `Thanks for the new booking. Create a new account by visiting here.`,
          }),
        })
      }

      break
    }
  }
  return new Response('payment confirmation route received', {
    status: 200,
  })
}
