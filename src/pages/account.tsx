import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
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
import countries from '@/utils/countries.json'
import { LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import Button from '@/components/buttons/Button'
import Container from '@/components/Container'
import Layout from '@/components/layout'
import { TourSectionsMap } from '@/components/sections'
import { OptionalVisits } from '@/components/sections/Payment/Page1'
import Page2 from '@/components/sections/Payment/Page2'
import Page3, { PaymentMethod } from '@/components/sections/Payment/Page3'
import TourHeroSection from '@/components/sections/Tours/TourHeroSection'

import Input from '@/components/atoms/Input'
import TabSelector from '@/components/atoms/Selector'

import { gql } from '../../__generated__'
import { BookingsQuery, GetUserQuery } from '../../__generated__/graphql'
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
          experience_cards[]{
            ...,
            link_to->
          }
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
      className={
        'relative bg-[#F2FAFF] px-5 md:px-20  my-11 py-12 text-center flex flex-col z-10 items-center'
      }
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
  locale: SanityLocale
}) {
  const { control, watch, getValues } = useForm<{ optionalVisits: Record<string, string[]> }>({
    defaultValues: {
      optionalVisits: {},
    },
  })
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'bank'>('stripe')
  const router = useRouter()

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
          newPrice += localizedNumber(visit.price?.discounted_price, locale)
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
          cityName: localizedString(city?.city_name, locale),
          visitName: localizedString(visit?.title, locale),
          price: localizedNumber(visit?.price?.discounted_price, locale),
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
      <Container>
        {watch('optionalVisits') && (
          <OptionalVisits
            defaultValues={booking?.optionalTours}
            data={bookingTour?.payment?.extras}
            control={control}
            locale={locale}
          />
        )}
        <div>
          You have selected ${newPrice}
          <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </div>
        <button onClick={pay}>Pay</button>
      </Container>
    </div>
  )
}
function SidebarBox({ children }: PropsWithChildren) {
  return <div className={'bg-light-blue rounded-2xl p-9 border border-darkblue/10'}>{children}</div>
}
function SidebarTitles({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h4 className={'text-sm text-gray mb-1'}>{title}</h4>
      <h4 className={'font-medium text-darkblue'}>{subtitle}</h4>
    </div>
  )
}
function Sidebar({
  bookingTour,
  booking,
  locale,
}: {
  bookingTour: SanityTourPage
  booking: Booking
  locale: SanityLocale
}) {
  return (
    <div className={'flex flex-col gap-7 min-w-max'}>
      <SidebarBox>
        <h3 className={'text-2xl font-bold'}>Tour details</h3>
        <hr className={'border-yellow mt-2 border-[2px] w-20 mb-4'} />
        <div className={'grid grid-cols-2 gap-y-4 gap-x-12'}>
          <div className={'col-span-2'}>
            <SidebarTitles
              title={'Name'}
              subtitle={localizedString(bookingTour.hero_section?.title, locale)}
            />
          </div>
          <SidebarTitles
            title={'Trip start'}
            subtitle={new Date(parseInt(booking.from)).toDateString()}
          />
          <SidebarTitles
            title={'Trip end'}
            subtitle={new Date(parseInt(booking.to)).toDateString()}
          />
          <SidebarTitles
            title={'Countries'}
            subtitle={`${bookingTour.overview_card?.countries} Countries`}
          />
          <SidebarTitles title={'City'} subtitle={`${bookingTour.overview_card?.cities} cities`} />
        </div>
      </SidebarBox>
      <SidebarBox>
        <div className={'flex justify-between items-center mb-3 text-gray font-medium'}>
          <span>Tour Package</span>
          <span>
            {booking.adults.length} x ${(booking.price / booking.adults.length).toLocaleString()}
          </span>
        </div>
        <div className={'flex justify-between items-center mb-3 text-gray font-medium'}>
          <span>Total</span>
          <span>${booking.price.toLocaleString()}</span>
        </div>
        <div className={'flex justify-between items-center text-gray font-medium'}>
          <span>Total paid</span>
          <span className={'text-blue'}>-${booking.paid.toLocaleString()}</span>
        </div>
        <hr className={'my-4 border-yellow'} />

        <div className={'flex justify-between items-center font-bold'}>
          <span>Total Remaining</span>
          <span>${(booking.price - booking.paid).toLocaleString()}</span>
        </div>
      </SidebarBox>
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
  locale: SanityLocale
}) {
  const { token } = useUser()
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      adults: booking.adults.map((adult) => ({
        ...adult,
        dob: new Date(parseInt(adult.dob)).toISOString().slice(0, 10),
        passportExpiry:
          adult.passportExpiry &&
          new Date(parseInt(adult.passportExpiry)).toISOString().slice(0, 10),
      })),
    },
  })
  function onSubmit(data: { adults: Booking['adults'] }) {
    const client = getReactClient(token)
    setLoading(true)
    client
      .mutate({
        mutation: gql(`
        #graphql
        mutation UpdateBooking($booking: UpdateBookingInput!){
          updateBooking(booking: $booking)
        }
      `),
        variables: {
          booking: {
            id: booking._id,
            adults: data.adults.map((adult) => ({
              ...adult,
              dob: new Date(adult.dob).toString(),
              passportExpiry: adult.passportExpiry && new Date(adult.passportExpiry).toString(),
            })),
          },
        },
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Container className={'flex justify-between'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-10 md:pt-0 md:rounded-2xl overflow-hidden flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <p className="text-2xl text-darkblue font-bold">1. Primary Passenger Details</p>
          <p className="text-base text-gray font-medium">
            Have you reviewed the details in the booking summary? If something isn't correct, you
            can adjust your details in the previous steps.
          </p>
        </div>
        <div className="flex flex-col gap-[18px] ">
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Full Name</p>
            <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-3">
              <Input
                name="adults.0.name.designation"
                control={control}
                placeholder="Prefix"
                type="select"
                options={[
                  { label: 'Mr', value: 'Mr' },
                  { label: 'Ms', value: 'Ms' },
                  { label: 'Dr', value: 'Dr' },
                ]}
                rules={{ required: true }}
              />
              <Input
                rules={{ required: true }}
                name="adults.0.name.firstName"
                control={control}
                placeholder="First Name"
                type="text"
              />
              <Input
                name="adults.0.name.middleName"
                control={control}
                placeholder="Middle Name"
                type="text"
              />
              <Input
                rules={{ required: true }}
                name="adults.0.name.lastName"
                control={control}
                placeholder="Last Name"
                type="text"
              />
            </div>
            <div className={'grid grid-cols-2 gap-3'}>
              <div>
                <p className="text-base font-medium text-darkblue">Date of Birth</p>
                <Input
                  name="adults.0.dob"
                  control={control}
                  placeholder="Date"
                  type="date"
                  rules={{ required: true }}
                />
              </div>
              <div>
                <p className="text-base font-medium text-darkblue">Mobile</p>

                <div className="grid grid-cols-[120px_1fr] gap-3">
                  <Input
                    name="adults.0.phone.code"
                    rules={{ required: true }}
                    control={control}
                    type="select"
                    options={countries.map((c) => ({
                      value: c.dial_code,
                      label: `${c.name} (${c.dial_code})`,
                    }))}
                  />
                  <Input
                    name="adults.0.phone.number"
                    rules={{ required: true }}
                    control={control}
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-[390px]">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">Nationality</p>
              <Input
                name="adults.0.nationality"
                control={control}
                placeholder=" "
                rules={{ required: true }}
                type="select"
                options={countries.map((c) => ({ value: c.name, label: c.name }))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-[390px]">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">Passport Number</p>
              <Input
                name={`adults.0.passportNumber`}
                control={control}
                type={'text'}
                rules={{ required: true }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-[390px]">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">Date of Passport Expiry*</p>
              <Input
                name={`adults.0.passportExpiry`}
                control={control}
                rules={{ required: true }}
                type="date"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-[390px]">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">Additional Information</p>
              <Input
                name={`adults.0.additionalInformation`}
                control={control}
                placeholder={
                  'Provide Additional Preferences and Special Requests: Allergies, room requests etc...'
                }
                rules={{ required: true }}
                type="textarea"
              />
            </div>
          </div>
          <Button disabled={loading} text={'Submit'} />
        </div>
        {Array.from(Array(booking.adults.length - 1).keys()).map((i) => (
          <div>
            <div className="flex flex-col gap-6">
              <p className="text-2xl text-darkblue font-bold">{i + 2}. Adult Passenger Details</p>
              <p className="text-base text-gray font-medium">
                Have you reviewed the details in the booking summary? If something isn't correct,
                you can adjust your details in the previous steps.
              </p>
            </div>
            <div className="flex flex-col gap-[18px] ">
              <div className="flex flex-col gap-2">
                <p className="text-base font-medium text-darkblue">Full Name</p>
                <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-3">
                  <Input
                    name={`adults.${i + 1}.name.designation`}
                    control={control}
                    placeholder="Prefix"
                    type="select"
                    options={[
                      { label: 'Mr', value: 'Mr' },
                      { label: 'Ms', value: 'Ms' },
                      { label: 'Dr', value: 'Dr' },
                    ]}
                    rules={{ required: true }}
                  />
                  <Input
                    rules={{ required: true }}
                    name={`adults.${i + 1}.name.firstName`}
                    control={control}
                    placeholder="First Name"
                    type="text"
                  />
                  <Input
                    name={`adults.${i + 1}.name.middleName`}
                    control={control}
                    placeholder="Middle Name"
                    type="text"
                  />
                  <Input
                    rules={{ required: true }}
                    name={`adults.${i + 1}.name.lastName`}
                    control={control}
                    placeholder="Last Name"
                    type="text"
                  />
                </div>
                <div className={'grid grid-cols-2 gap-3'}>
                  <div>
                    <p className="text-base font-medium text-darkblue">Date of Birth</p>
                    <Input
                      name={`adults.${i + 1}.dob`}
                      control={control}
                      placeholder="Date"
                      type="date"
                      rules={{ required: true }}
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium text-darkblue">Mobile</p>

                    <div className="grid grid-cols-[120px_1fr] gap-3">
                      <Input
                        name={`adults.${i + 1}.phone.code`}
                        rules={{ required: true }}
                        control={control}
                        type="select"
                        options={countries.map((c) => ({
                          value: c.dial_code,
                          label: `${c.name} (${c.dial_code})`,
                        }))}
                      />
                      <Input
                        name={`adults.${i + 1}.phone.number`}
                        rules={{ required: true }}
                        control={control}
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 max-w-[390px]">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-medium text-darkblue">Nationality</p>
                  <Input
                    name={`adults.${i + 1}.nationality`}
                    control={control}
                    placeholder=" "
                    rules={{ required: true }}
                    type="select"
                    options={countries.map((c) => ({ value: c.name, label: c.name }))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 max-w-[390px]">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-medium text-darkblue">Passport Number</p>
                  <Input
                    name={`adults.${i + 1}.passportNumber`}
                    control={control}
                    rules={{ required: true }}
                    type={'text'}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 max-w-[390px]">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-medium text-darkblue">Date of Passport Expiry*</p>
                  <Input
                    name={`adults.${i + 1}.passportExpiry`}
                    control={control}
                    rules={{ required: true }}
                    type="date"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 max-w-[390px]">
                <div className="flex flex-col gap-2">
                  <p className="text-base font-medium text-darkblue">Additional Information</p>
                  <Input
                    name={`adults.${i + 1}.additionalInformation`}
                    control={control}
                    placeholder={
                      'Provide Additional Preferences and Special Requests: Allergies, room requests etc...'
                    }
                    rules={{ required: true }}
                    type="textarea"
                  />
                </div>
              </div>
            </div>
            <Button disabled={loading} text={'Submit'} />
          </div>
        ))}
      </form>
      <Sidebar bookingTour={bookingTour} booking={booking} locale={locale} />
    </Container>
  )
}
function FlightInformation({
  bookingTour,
  booking,
  locale,
}: {
  bookingTour: SanityTourPage
  booking: Booking
  locale: SanityLocale
}) {
  const [flights, setFlights] = useState(1)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      flights: booking.flights?.map((f) => ({
        ...f,
        arrivalTime: new Date(parseInt(f.arrivalTime)).toISOString().slice(0, 16),
        departureTime: new Date(parseInt(f.departureTime)).toISOString().slice(0, 16),
      })),
    },
  })

  const { token } = useUser()
  const [loading, setLoading] = useState(false)
  async function onSubmit(data: any) {
    const client = getReactClient(token)
    setLoading(true)
    await client.mutate({
      mutation: gql(`
      #graphql
      mutation UpdateFlightInfo($booking:UpdateBookingInput!){
        updateBooking(booking: $booking)
      }
    `),
      variables: {
        booking: {
          flights: data.flights,
          id: booking._id,
        },
      },
    })
    setLoading(false)
  }
  return (
    <Container className={'flex justify-between'}>
      <form onSubmit={handleSubmit(onSubmit)} className={'p-10 md:pt-0'}>
        {Array.from(Array(flights).keys()).map((i) => (
          <div className="flex flex-col gap-6 mb-6">
            <div>
              <p className="text-2xl text-darkblue font-bold flex justify-between">
                <span>{i + 1}. Flight Information</span>
                {i > 0 && (
                  <button
                    type={'button'}
                    className={'text-blue font-medium text-lg'}
                    onClick={() => setFlights((o) => o - 1)}
                  >
                    Remove
                  </button>
                )}
              </p>
              <p className="text-base text-gray font-medium">
                Have you reviewed the details in the booking summary? If something isn't correct,
                you can adjust your details in the previous steps.
              </p>
            </div>
            <div className="">
              <p className="text-base font-medium text-darkblue mb-2">Flight Number</p>
              <Input
                name={`flights.${i}.flightNumber`}
                control={control}
                placeholder=" "
                rules={{ required: true }}
                type="text"
              />
            </div>
            <div className="">
              <p className="text-base font-medium text-darkblue mb-2">Departure Time</p>
              <Input
                name={`flights.${i}.departureTime`}
                control={control}
                placeholder="Select date and time"
                rules={{ required: true }}
                type="datetime-local"
              />
            </div>
            <div className="">
              <p className="text-base font-medium text-darkblue mb-2">Arrival Airport</p>
              <Input
                name={`flights.${i}.arrivalAirport`}
                control={control}
                placeholder=" "
                rules={{ required: true }}
                type="text"
              />
            </div>
            <div className="">
              <p className="text-base font-medium text-darkblue mb-2">Air Company</p>
              <Input
                name={`flights.${i}.airCompany`}
                control={control}
                placeholder=" "
                rules={{ required: true }}
                type="text"
              />
            </div>
            <div className="">
              <p className="text-base font-medium text-darkblue mb-2">Arrival Time</p>
              <Input
                name={`flights.${i}.arrivalTime`}
                control={control}
                placeholder=" "
                rules={{ required: true }}
                type="datetime-local"
              />
            </div>
            <Button text={'Submit' + (loading ? 'ting' : '')} disabled={loading} />
          </div>
        ))}
        <button
          type={'button'}
          className={'text-blue font-medium text-lg'}
          onClick={() => setFlights((o) => o + 1)}
        >
          Add another flight
        </button>
      </form>
      <Sidebar bookingTour={bookingTour} booking={booking} locale={locale} />
    </Container>
  )
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
  const { user, token, refetch } = useUser()
  const { control, handleSubmit } = useForm<{ user: GetUserQuery['user'] }>({
    defaultValues: {
      user: { ...user, dob: user?.dob && new Date(parseInt(user?.dob)).toISOString().slice(0, 10) },
    },
  })
  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    getValues,
  } = useForm<{
    new_password: string
    old_password: string
    confirm_password: string
  }>()
  const [loading, setLoading] = useState(false)
  function onSubmit(data: { user: GetUserQuery['user'] }) {
    const client = getReactClient(token)
    setLoading(true)
    client
      .mutate({
        mutation: gql(`
        #graphql
        mutation UpdateUser($user: UpdateUserInput!){
          updateUser(user: $user){
            name {
                firstName
            }
          }
        }
      `),
        variables: {
          user: { ...user, ...data.user },
        },
      })
      .finally(() => setLoading(false))
  }
  function onSubmitPassword(data: {
    new_password: string
    old_password: string
    confirm_password: string
  }) {
    if (data.new_password !== data.confirm_password || !user?.email) {
      return
    }
    const client = getReactClient(token)
    setLoading(true)
    client
      .mutate({
        mutation: gql(`
        #graphql
        mutation UpdateUserPassword($email:String!, $old_password: String!, $new_password: String!){
          updateUserPassword(email: $email, old_password: $old_password, new_password: $new_password)
        }
      `),
        variables: { ...data, email: user.email },
      })
      .then((res) => {
        if (res) alert('Updated')
      })
      .finally(() => setLoading(false))
  }
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px] ">
        <div className="flex flex-col gap-6">
          <p className="text-2xl text-darkblue font-bold">1. Personal Information</p>
          <p className="text-base text-gray font-medium">
            Have you reviewed the details in the booking summary? If something isn't correct, you
            can adjust your details in the previous steps.
          </p>
        </div>
        <div className="flex flex-col gap-2 max-w-screen-md">
          <p className="text-base font-medium text-darkblue">Full Name</p>
          <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-3">
            <Input
              name="user.name.designation"
              control={control}
              placeholder="Prefix"
              type="select"
              options={[
                { label: 'Mr', value: 'Mr' },
                { label: 'Ms', value: 'Ms' },
                { label: 'Dr', value: 'Dr' },
              ]}
              rules={{ required: true }}
            />
            <Input
              rules={{ required: true }}
              name="user.name.firstName"
              control={control}
              placeholder="First Name"
              type="text"
            />
            <Input
              name="user.name.middleName"
              control={control}
              placeholder="Middle Name"
              type="text"
            />
            <Input
              rules={{ required: true }}
              name="user.name.lastName"
              control={control}
              placeholder="Last Name"
              type="text"
            />
          </div>
          <div className={'max-w-sm'}>
            <div>
              <p className="text-base font-medium text-darkblue">Date of Birth</p>
              <Input
                name="user.dob"
                control={control}
                placeholder="Date"
                type="date"
                rules={{ required: true }}
              />
            </div>
          </div>
          <div className={'max-w-sm'}>
            <p className="text-base font-medium text-darkblue">Mobile</p>

            <div className="grid grid-cols-[120px_1fr] gap-3">
              <Input
                name="user.phone.code"
                rules={{ required: true }}
                control={control}
                type="select"
                options={countries.map((c) => ({
                  value: c.dial_code,
                  label: `${c.name} (${c.dial_code})`,
                }))}
              />
              <Input
                name="user.phone.number"
                rules={{ required: true }}
                control={control}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 max-w-sm">
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Nationality</p>
            <Input
              name="user.nationality"
              control={control}
              placeholder=" "
              rules={{ required: true }}
              type="select"
              options={countries.map((c) => ({ value: c.name, label: c.name }))}
            />
          </div>
        </div>
        <Button disabled={loading} text={'Submit'} />
      </form>
      <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="flex flex-col gap-[18px] ">
        <div className="flex flex-col gap-6">
          <p className="text-2xl text-darkblue font-bold">2. Change Password</p>
          <p className="text-base text-gray font-medium">
            Have you reviewed the details in the booking summary? If something isn't correct, you
            can adjust your details in the previous steps.
          </p>
        </div>
        <div className="flex flex-col gap-2 max-w-screen-md">
          <p className="text-base font-medium text-darkblue">Old Password</p>
          <Input
            name="old_password"
            control={controlPassword}
            placeholder="XXXXXXXXX"
            type="password"
            rules={{ required: true }}
          />
          <p className="text-base font-medium text-darkblue">New Password</p>
          <Input
            name="new_password"
            control={controlPassword}
            placeholder="XXXXXXXXX"
            type="password"
            rules={{ required: true }}
          />
          <p className="text-base font-medium text-darkblue">Confirm Password</p>
          <Input
            name="confirm_password"
            control={controlPassword}
            placeholder="XXXXXXXXX"
            type="password"
            rules={{ required: true, validate: (v) => v === getValues('new_password') }}
          />
        </div>

        <Button disabled={loading} text={'Submit'} />
      </form>
    </Container>
  )
}
function Payment({
  bookingTour,
  booking,
  locale,
}: {
  bookingTour: SanityTourPage
  booking: Booking
  locale: SanityLocale
}) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'bank'>('bank')
  const [bookOnly, setBookOnly] = useState(false)
  return (
    <Container className={'flex justify-between'}>
      <div className={'p-10 md:pt-0'}>
        <Page3
          paid={booking.paid}
          totalPrice={booking.price}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          bookOnly={bookOnly}
          toggleBookOnly={() => setBookOnly((o) => !o)}
        />
      </div>
      <Sidebar bookingTour={bookingTour} booking={booking} locale={locale} />
    </Container>
  )
}
const Account = (props: PageProps) => {
  const { user, logout, token } = useUser()
  const [booking, setBooking] = useState<Booking>()
  const [bookingTour, setBookingTour] = useState<SanityTourPage>()
  const router = useRouter()

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
                paid
                flights{
                  airCompany
                  arrivalAirport
                  arrivalTime
                  departureTime
                  flightNumber
                }
                price
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
                  phone{
                    code
                    number
                  }
                  passportExpiry
                  passportNumber
                  additionalInformation
                  additionalTravellers
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
              <h2>Welcome {user.name.firstName}</h2>
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
