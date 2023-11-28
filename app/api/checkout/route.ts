import sanityClient, { urlFor } from '@/sanity/client'
import { SanityTourPage } from '@/sanity/types'
import { getClient } from '@/utils/client'
import getStripe from '@/utils/stripe'

import { gql } from '../../../__generated__'
import { AddBookingMutationVariables } from '../../../__generated__/graphql'

export const POST = async (req: Request) => {
  const booking: AddBookingMutationVariables['booking'] & { paid?: number } = await req.json()
  const stripe = getStripe()
  const client = await getClient()
  const tour: SanityTourPage = await sanityClient.fetch(
    `*[_type == "tour_page"  && slug.current == "${booking.tour}"][0]`
  )
  const images = []
  if (tour.meta_data?.meta_image) {
    images.push(urlFor(tour.meta_data.meta_image))
  }
  if (tour.hero_section?.image) {
    images.push(urlFor(tour.hero_section?.image))
  }
  const bookingData = { ...booking }
  delete bookingData.paid
  const newBooking = await client.mutate({
    mutation: gql(`
            #graphql
            mutation AddBooking($booking:AddBookingInput!){
                addBooking(booking:$booking)
            }
        `),
    variables: {
      booking: bookingData,
    },
  })
  if (newBooking.data?.addBooking) {
    if (!booking.paid) {
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/email', {
        method: 'POST',
        body: JSON.stringify({
          subject: '[PAYMENT REQUIRED] New Booking!',
          to: booking.adults[0]?.email,
          html: `Thanks for the new booking. Complete payment by sending to this acc:08765432.`,
          text: `Thanks for the new booking. Complete payment by sending to this acc:08765432.`,
        }),
      })
      return
    }
    const checkout = await stripe.checkout.sessions.create({
      customer_email: booking.adults[0]?.email,
      line_items: [
        {
          price_data: {
            unit_amount: booking.paid,
            product_data: {
              name:
                tour.hero_section?.title?.en || tour.meta_data?.meta_title?.en || 'Tour booking',
              description: tour.overview_card?.about?.en || tour.meta_data?.meta_description?.en,
              images,
            },
            currency: 'USD',
          },
          quantity: 1,
        },
      ],
      invoice_creation: {
        enabled: true,
      },
      payment_intent_data: {
        receipt_email: booking.adults[0]?.email,
      },
      metadata: {
        booking: newBooking.data?.addBooking,
      },
      mode: 'payment',
      success_url: process.env.NEXT_PUBLIC_BASE_URL!,
      payment_method_types: ['card'],
    })
    return new Response(checkout.url)
  }
}
