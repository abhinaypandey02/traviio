import { NextResponse } from 'next/server'

import sanityClient, { urlFor } from '@/sanity/client'
import { SanityTourPage } from '@/sanity/types'
import { getClient } from '@/utils/client'
import getStripe from '@/utils/stripe'

import { gql } from '../../../__generated__'
import {
  AddBookingMutationVariables,
  OptionalTour,
  OptionalTourInput,
  StagedExtrasBookingMutationVariables,
  UpdateBookingExtrasMutationVariables,
} from '../../../__generated__/graphql'
import booking from '../graphql/types/Booking'

export const POST = async (req: Request) => {
  const body: StagedExtrasBookingMutationVariables = await req.json()
  if (!body['stagedOptionalTours'] || !body['id'])
    return new NextResponse('', {
      status: 400,
    })
  const stripe = getStripe()
  const client = await getClient()
  const bookingRes = await client.query({
    query: gql(`
      #graphql
      query SingleBooking($id:String!){
        booking(id: $id){
          email
          tour
          optionalTours {
            price
          }
        }
      }
    `),
    variables: {
      id: body.id,
    },
  })
  client.mutate({
    mutation: gql(`
      #graphql
      mutation StagedExtrasBooking($id:ID!,$stagedOptionalTours:[OptionalTourInput!]){
        updateBooking(booking: {stagedOptionalTours:$stagedOptionalTours, id:$id})
      }
    `),
    variables: {
      id: body.id,
      stagedOptionalTours: body.stagedOptionalTours,
    },
  })

  if (bookingRes.data?.booking) {
    const booking = bookingRes.data.booking
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
    const checkout = await stripe.checkout.sessions.create({
      customer_email: booking.email,
      line_items: [
        {
          price_data: {
            unit_amount:
              100 *
              (((body['stagedOptionalTours'] as OptionalTourInput[])?.reduce(
                (acc, curr) => acc + curr.price,
                0
              ) || 0) -
                (booking.optionalTours?.reduce((acc, curr) => acc + curr.price, 0) || 0)),
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
        receipt_email: booking.email,
      },
      metadata: {
        booking: body.id,
        optionalTours: 'true',
      },
      mode: 'payment',
      success_url: process.env.NEXT_PUBLIC_BASE_URL!,
      payment_method_types: ['card'],
    })
    return new Response(checkout.url)
  }
}
