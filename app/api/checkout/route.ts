import sanityClient, { urlFor } from '@/sanity/client'
import { SanityTourPage } from '@/sanity/types'
import { getClient } from '@/utils/client'
import getStripe from '@/utils/stripe'

import { gql } from '../../../__generated__'
import { AddBookingMutationVariables } from '../../../__generated__/graphql'

export const POST = async (req: Request) => {
  const booking: AddBookingMutationVariables['booking'] = await req.json()
  console.log(booking)
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
  const newBooking = await client.mutate({
    mutation: gql(`
            #graphql
            mutation AddBooking($booking:AddBookingInput!){
                addBooking(booking:$booking)
            }
        `),
    variables: {
      booking,
    },
  })
  if (newBooking.data?.addBooking) {
    const checkout = await stripe.checkout.sessions.create({
      customer_email: booking.adults[0]?.email,
      line_items: [
        {
          price_data: {
            unit_amount: booking.price,
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
    })
    return new Response(checkout.url)
  }
}
