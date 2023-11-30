import React, { useCallback, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-stars'

import { localizedNumber, localizedString } from '@/contexts/LocaleProvider'
import { useUser } from '@/contexts/UserProvider'
import client, { urlFor } from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanityTourPage } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import Button from '@/components/buttons/Button'
import Container from '@/components/Container'
import Layout from '@/components/layout'
import { TourSectionsMap } from '@/components/sections'
import { OptionalVisits } from '@/components/sections/Payment/Page1'
import Page2 from '@/components/sections/Payment/Page2'
import { PaymentMethod } from '@/components/sections/Payment/Page3'
import TourHeroSection from '@/components/sections/Tours/TourHeroSection'

import TabSelector from '@/components/atoms/Selector'

import { gql } from '../../__generated__'
import { BookingsQuery } from '../../__generated__/graphql'
import { getReactClient } from '../../apollo-client-ssr'

type PageProps = {
  slug: string
  globals: SanityGlobals
} & LocalePage

type Booking = NonNullable<NonNullable<BookingsQuery['user']>['bookings']>[number]

async function fetchPageData(slug: string): Promise<SanityTourPage> {
  return (await client.fetch(
    `*[_type == "tour_page"  && slug.current == "${slug}"][0]{
      ...,
      destination->,
      sections[] {
        ...,
        _type == "featured_tours_section" => {
          ...,
          tour_cards[] {
            ...,
            content->
          }
        },
        _type == "tour_selection_section" => {
          ...,
          tags[]->
        },
        _type == "pricing_section" => {
          ...,
          "weekly_schedule": ^.timeline.timeline,
          "disabled": ^.timeline.disabled,
          "price_overrides": ^.price_overrides,
          "price": ^.overview_card.price,
        },
        _type == "memorable_experiences_section" => {
          ...,
          experience_cards[]->
        }
      }
    }`
  )) as SanityTourPage
}
function RequestForm({ booking }: { booking: Booking }) {
  const { token } = useUser()
  const [request, setRequest] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()
  return (
    <Container
      className={'relative bg-[#F2FAFF] my-11 py-12 text-center flex flex-col z-10 items-center'}
    >
      <h2 className={'text-[40px] font-bold mb-2'}>Request Form</h2>
      <p className={'text-lg '}>Have any requests that you would like to inform us about?</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setLoading(true)
          const client = getReactClient(token)
          await client.mutate({
            mutation: gql(`
              #graphql
              mutation UpdateRequests($requests:[String!], $id:ID!){
                updateBooking(booking: {requests: $requests, id: $id})
              }
            `),
            variables: {
              requests: [...(booking.requests || []), request],
              id: booking._id,
            },
          })
          setLoading(false)
          setDone(true)
        }}
        className={'w-full'}
      >
        <textarea
          value={request}
          disabled={done}
          onChange={(e) => setRequest(e.target.value)}
          required={true}
          rows={5}
          className={'py-7 px-10 my-4 rounded-md w-full max-w-[900px]'}
          placeholder={'Type something here'}
        />
        <div>
          <Button
            disabled={done}
            className={'max-w-[148px] mx-auto'}
            text={done ? 'Submitted!' : loading ? 'Submitting' : 'Submit'}
          />
        </div>
      </form>
      <Image
        width={1280}
        height={440}
        src={'/request-bg.png'}
        alt={''}
        sizes={`
              100vw
            `}
        className={'absolute w-full h-full top-0 -z-10 left-0 object-cover'}
      />
    </Container>
  )
}
function TripInformation({
  bookingTour,
  booking,
  locale,
}: {
  bookingTour: SanityTourPage
  booking: Booking
  locale: string
}) {
  return (
    <div>
      {bookingTour?.sections
        ?.filter((section) =>
          [
            'whats_included_section',
            'itinerary_section',
            'memorable_experiences_section',
            'faq_section',
          ].includes(section._type)
        )
        .map((section) => {
          const Component = TourSectionsMap[section?._type]
          return (
            <React.Fragment key={section._key}>
              {Component &&
                React.createElement(Component, {
                  data: section,
                  slug: booking?.tour,
                  locale,
                })}
            </React.Fragment>
          )
        })}
      <RequestForm booking={booking} />
    </div>
  )
}
function PersonalInformation({
  bookingTour,
  booking,
  locale,
}: {
  bookingTour: SanityTourPage
  booking: Booking
  locale: string
}) {
  const { control } = useForm()
  return (
    <div>
      <Page2 adultsNumber={booking.adults.length} control={control} />
    </div>
  )
}
function FlightInformation({
  bookingTour,
  booking,
  locale,
}: {
  bookingTour: SanityTourPage
  booking: Booking
  locale: string
}) {
  return <div></div>
}
function AccountTab({
  bookingTour,
  booking,
  locale,
}: {
  bookingTour: SanityTourPage
  booking: Booking
  locale: string
}) {
  return <div></div>
}
function Payment({
  bookingTour,
  booking,
  locale,
}: {
  bookingTour: SanityTourPage
  booking: Booking
  locale: string
}) {
  return <div></div>
}
const Account = (props: PageProps) => {
  const { user, logout, token } = useUser()
  const [booking, setBooking] = useState<Booking>()
  const [bookingTour, setBookingTour] = useState<SanityTourPage>()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'bank'>('stripe')
  const { control, watch, getValues } = useForm<{ optionalVisits: Record<string, string[]> }>({
    defaultValues: {
      optionalVisits: {},
    },
  })
  const fetchUpcomingTour = useCallback(async () => {
    if (token) {
      const client = getReactClient(token)
      const bookings = await client.query({
        query: gql(`
          #graphql
          query Bookings{
            user{
              bookings {
                tour
                email
                requests
                from
                to
                optionalTours {
                  cityID
                  visitID
                }
                _id
                adults {
                  name {
                    firstName
                    lastName
                    designation
                    middleName
                  }
                  email
                  address {
                    country
                    line1
                    state
                    town
                  }
                  dob
                  nationality
                  phone
                }
              }
            }
          }
        `),
      })
      const bookingData = bookings.data.user?.bookings?.[0]
      if (bookingData) {
        setBooking(bookingData)
        const tour = await fetchPageData(bookingData.tour)
        if (tour) {
          setBookingTour(tour)
        }
      }
    }
  }, [token])
  const [selected, setSelected] = useState(0)
  useEffect(() => {
    void fetchUpcomingTour()
  }, [fetchUpcomingTour])

  let newPrice = 0
  const op: Record<string, Array<string>> = watch('optionalVisits')
  bookingTour?.payment?.extras?.forEach(
    (city) =>
      city.visits?.forEach((visit, i) => {
        if (
          op[city._key]?.[i] &&
          booking?.optionalTours?.findIndex(
            (x) => x.cityID === city._key && x.visitID === visit._key
          ) === -1
        ) {
          newPrice += localizedNumber(visit.price?.discounted_price, props.locale)
        }
      })
  )
  function pay() {
    const optionalInputData = getValues('optionalVisits')
    const optionalVisits = Object.keys(optionalInputData).flatMap((cityID) => {
      const city = bookingTour?.payment?.extras?.find((city) => city._key === cityID)
      return optionalInputData?.[cityID].filter(Boolean).map((visitID: string) => {
        const visit = city?.visits?.find((visit) => visit._key === visitID)
        return {
          cityID,
          visitID,
          cityName: localizedString(city?.city_name, props.locale),
          visitName: localizedString(visit?.title, props.locale),
          price: localizedNumber(visit?.price?.discounted_price, props.locale),
        }
      })
    })
    fetch('/api/extras-checkout', {
      method: 'POST',
      body: JSON.stringify({
        stagedOptionalTours: optionalVisits,
        id: booking?._id,
      }),
    }).then(async (res) => {
      router.replace(await res.text())
    })
  }
  if (user === null) router.push('/login')
  if (user) {
    return (
      <Layout breadcrumbs={[]} globals={props.globals} locale={props.locale}>
        <div className="">
          <div className=" relative">
            <Image
              src={bookingTour?.hero_section?.image ? urlFor(bookingTour.hero_section?.image) : ''}
              style={{ width: '100%', height: '480px' }}
              width={700}
              height={73}
              alt=""
            />
            <div className="text-3xl lg:text-[52px] leading-tight  text-white absolute bottom-[60px]  font-black text-center inset-x-0 ">
              <h2>Welcome {user.name}</h2>
              <div className={'font-bold text-[40px]'}>
                <span className="text-yellow">
                  {localizedString((bookingTour?.destination as any)?.name, props.locale)} tour:{' '}
                </span>
                {localizedString(bookingTour?.hero_section?.title, props.locale)}
              </div>
            </div>
          </div>
          <div className="relative h-[80px]">
            <div className="absolute grid grid-cols-3 max-w-[1280px] inset-x-0 divide-x-2 divide-darkblue/10 top-[-34px] mx-auto bg-primary rounded-t-2xl py-7">
              <div className="flex items-center gap-4 justify-center px-7  w-full">
                <div className="relative h-12 w-12">
                  <Image alt="" src={'/trip-from.svg'} fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium text-gray whitespace-nowrap">Trip start</p>
                  <p className="text-xl font-bold text-darkblue whitespace-nowrap">
                    {booking?.from && new Date(parseInt(booking.from)).toDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-center px-7  w-full">
                <div className="relative h-12 w-12">
                  <Image alt="" src={'/trip-from.svg'} fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium text-gray whitespace-nowrap">Trip end</p>
                  <p className="text-xl font-bold text-darkblue whitespace-nowrap">
                    {booking?.to && new Date(parseInt(booking.to)).toDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4  justify-center px-7  w-full">
                <div className="relative h-12 w-12">
                  <Image alt="" src={'/ColoredCalender.svg'} fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium text-gray whitespace-nowrap">Duration</p>
                  <p className="text-xl font-bold text-darkblue">
                    {localizedString(bookingTour?.overview_card?.duration, props.locale)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'my-10'}>
          <TabSelector
            tabs={[
              'Trip information',
              'Personal information',
              'Flight Information',
              'Account',
              'Payment',
            ]}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        {booking &&
          bookingTour &&
          [
            <TripInformation bookingTour={bookingTour} booking={booking} locale={props.locale} />,
            <PersonalInformation
              bookingTour={bookingTour}
              booking={booking}
              locale={props.locale}
            />,
            <FlightInformation bookingTour={bookingTour} booking={booking} locale={props.locale} />,
            <AccountTab bookingTour={bookingTour} booking={booking} locale={props.locale} />,
            <Payment bookingTour={bookingTour} booking={booking} locale={props.locale} />,
          ][selected]}
        <Container>
          {watch('optionalVisits') && (
            <OptionalVisits
              defaultValues={booking?.optionalTours}
              data={bookingTour?.payment?.extras}
              control={control}
              locale={props.locale}
            />
          )}
          <div>
            You have selected ${newPrice}
            <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          </div>
          <button onClick={pay}>Pay</button>
        </Container>
        <button
          onClick={() => {
            logout().then(() => {
              router.push('/login')
            })
          }}
        >
          LOGOUT
        </button>
      </Layout>
    )
  }
  return 'Loading...'
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const globals = (await client.fetch(`*[_type == "globals"][0]{
    ...,
    navbar {
  ...,
      links[] {
        ...,
        _type == "tour_dropdown" => {
          ...,
          destinations[] {
            ...,
            destination->,
            tours[]->,
            blogs[]->,
          }
        }
      }
}
}`)) as SanityGlobals
  return {
    props: {
      slug: slug,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}

export default Account
