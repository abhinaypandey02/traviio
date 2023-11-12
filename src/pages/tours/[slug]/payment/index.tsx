import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { localizedNumber, localizedString } from '@/contexts/LocaleProvider'
import { useYupValidationResolver } from '@/pages/tailor_your_tour'
import client, { urlFor } from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanityPricingSection, SanityTourPage } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import Layout from '@/components/layout'
import Page1, { IPaymentTourExtras } from '@/components/sections/Payment/Page1'
import Page2, { IContactInfo } from '@/components/sections/Payment/Page2'
import Page3 from '@/components/sections/Payment/Page3'
import Tabs from '@/components/sections/Payment/Tabs'
import SEO from '@/components/Seo'

import { AddBookingMutationVariables } from '../../../../../__generated__/graphql'

type PageProps = {
  slug: string
  data: SanityTourPage
  globals: SanityGlobals
  from: number
  to: number
} & LocalePage

export type PaymentSchema = IPaymentTourExtras & IContactInfo
export default function Page({ slug, data, locale, globals, from, to }: PageProps) {
  const pricingData: SanityPricingSection = data?.sections?.find(
    (section) => section._type === 'pricing_section'
  ) as SanityPricingSection

  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<PaymentSchema>({
    mode: 'onChange',
    defaultValues: {
      optionalVisits: [],
      adultMembers: 1,
      childrenMembers: 0,
    },
  })

  const [optionalVisits, setOptionalVisits] = useState(0)
  const [roomTypes, setRoomTypes] = useState(0)
  const [hotelChoice, setHotelChoice] = useState(0)
  useEffect(() => {
    const unsub = watch((value, _info) => {
      const info = _info as { name: keyof typeof value }
      if (info.name?.startsWith('optionalVisits')) {
        const selected = Object.values(value['optionalVisits'] as any)
        setOptionalVisits(
          data?.payment?.extras?.reduce(
            (acc, extra: any) =>
              acc +
              (selected.includes(extra._key) ? localizedNumber(extra.price?.initial_price) : 0),
            0
          ) || 0
        )
      }
      if (info.name === 'roomType') {
        setRoomTypes(
          data?.payment?.room_sharing_options?.reduce(
            (acc, extra) =>
              acc +
              (value['roomType'] === localizedString(extra?.title)
                ? localizedNumber(extra.price?.initial_price)
                : 0),
            0
          ) || 0
        )
      }
      if (info.name === 'hotelChoice') {
        setHotelChoice(
          data?.payment?.room_options?.reduce(
            (acc, extra) =>
              acc +
              (value['hotelChoice'] === localizedString(extra?.title)
                ? localizedNumber(extra.price?.initial_price)
                : 0),
            0
          ) || 0
        )
      }
    })
    return unsub.unsubscribe
  }, [])
  const router = useRouter()

  const startDate = new Date(from)
  const endDate = new Date(to)
  const [loading, setLoading] = useState(false)
  const onSubmit: SubmitHandler<PaymentSchema> = async (data) => {
    setLoading(true)
    const booking: AddBookingMutationVariables['booking'] & { paid: number } = {
      adults: [
        {
          email: data.email,
          dob: new Date(data.dob).toString(),
          name: {
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName,
            designation: data.titlePrefix,
          },
          phone: data.mobileCode + data.mobileNumber,
          nationality: data.nationality,
          address: {
            country: data.country,
            town: data.town,
            state: data.state,
            line1: data.address,
          },
        },
        ...data.adultPassenger.map((passenger) => ({
          email: passenger.email,
          dob: new Date(passenger.dob).toString(),
          name: {
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            middleName: passenger.middleName,
            designation: passenger.titlePrefix,
          },
        })),
      ],
      from: startDate.toDateString(),
      children: data.childrenMembers,
      guests: parseInt(data.childrenMembers.toString()) + parseInt(data.adultMembers.toString()),
      tour: slug,
      hotelType: data.hotelChoice,
      roomType: data.roomType,
      to: endDate.toDateString(),
      paid: paymentMethod === 'bank' ? 0 : bookOnly ? 20000 : totalPrice * 100,
      price: totalPrice * 100,
      email: data.email,
    }
    fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(booking),
    })
      .then(async (res) => {
        if (paymentMethod === 'bank') {
          alert('Payment info sent to the bank!')
        }
        const url = await res.text()
        router.replace(url || '/')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const [totalPrice, setTotalPrice] = useState(0)
  const [bookOnly, setBookOnly] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'bank'>('stripe')
  return (
    <Layout locale={locale} breadcrumbs={[]} globals={globals}>
      <SEO
        title={
          data?.meta_data?.meta_title &&
          'Book ' + localizedString(data.meta_data?.meta_title, locale)
        }
        description={
          data?.meta_data?.meta_description &&
          localizedString(data?.meta_data?.meta_description, locale)
        }
        image={data?.meta_data?.meta_image && urlFor(data?.meta_data?.meta_image)}
      />
      <Tabs
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        tour={data}
        startDate={startDate}
        endDate={endDate}
        pricingData={pricingData}
        adultsNumber={watch('adultMembers')}
        childrenNumber={watch('childrenMembers')}
        trigger={trigger}
        setTotalPrice={setTotalPrice}
        loading={loading}
        addons={roomTypes + hotelChoice + optionalVisits}
      >
        <Page1 errors={errors} control={control} payment={data.payment} />
        <Page2
          addPassenger={() => setValue('adultMembers', getValues('adultMembers') + 1)}
          removePassenger={() => setValue('adultMembers', getValues('adultMembers') - 1)}
          adultsNumber={watch('adultMembers')}
          control={control}
        />
        <Page3
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
          bookOnly={bookOnly}
          toggleBookOnly={() => setBookOnly((o) => !o)}
          totalPrice={totalPrice}
        />
      </Tabs>
    </Layout>
  )
}

async function fetchPageData(slug: string): Promise<SanityTourPage> {
  const page = (await client.fetch(
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
        }
      }
    }`
  )) as SanityTourPage

  return page
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
  locale,
  query,
}) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const { from, to } = query

  if (!from || !to) return { props: {}, notFound: true }
  const fromDate = new Date(parseInt(from.toString())).getTime()
  const toDate = new Date(parseInt(to.toString())).getTime()
  if (isNaN(fromDate) || isNaN(toDate)) return { props: {}, notFound: true }

  const pageData = await fetchPageData(slug)
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
      data: pageData,
      locale: (locale ?? 'en') as SanityLocale,
      from: fromDate,
      to: toDate,
      globals,
    },
  }
}
