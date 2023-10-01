'use server'
import sanityClient, { urlFor } from '@/sanity/client'
import { SanityTourPage } from '@/sanity/types'
// import { getSession } from '@/lib/session'
import { getClient } from '@/utils/client'
import getStripe from '@/utils/stripe'
import type { ApolloClient } from '@apollo/client'

import { gql } from '../../__generated__'
import { AddBookingInput, AddBookingMutationVariables } from '../../__generated__/graphql'

export async function getPaymentIntentInfo(payment_intent: string) {
  const stripe = getStripe()
  return await stripe.paymentIntents.retrieve(payment_intent)
}

export async function checkout(booking: AddBookingMutationVariables['booking']) {
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
            unit_amount: tour.overview_card?.price?.discounted_price?.en,
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
    return checkout.url
  }
}
