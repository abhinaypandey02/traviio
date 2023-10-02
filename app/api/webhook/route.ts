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
    // console.log(payload, sig, endpointSecret, req.headers.get('stripe-signature'))
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (error) {
    console.error(error)
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    })
  }
  switch (event.type) {
    case 'checkout.session.completed': {
      const checkoutSessionCompleted = event.data.object as any
      const bookingId = checkoutSessionCompleted.metadata?.booking
      await client.mutate({
        mutation: gql(`
          #graphql
          mutation UpdateBookingPayment($id:String!, $key:String!){
            completeBooking(booking: $id, token:$key)
          }`),
        variables: {
          id: bookingId,
          key: process.env.BACKEND_SECRET!,
        },
      })
      break
    }
  }
  return new Response('payment confirmation route received', {
    status: 200,
  })
}
