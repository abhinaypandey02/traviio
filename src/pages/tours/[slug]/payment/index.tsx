import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { localizedNumber, localizedString } from '@/contexts/LocaleProvider'
import { useYupValidationResolver } from '@/pages/tailor_your_tour'
import client from '@/sanity/client'
import {
  SanityGlobals,
  SanityLocale,
  SanityPricingSection,
  SanitySlug,
  SanityTourPage,
} from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import Layout from '@/components/layout'
import FeatureSection from '@/components/sections/FeatureSection'
import Page1, { IPaymentTourExtras } from '@/components/sections/Payment/Page1'
import Page2, { IContactInfo } from '@/components/sections/Payment/Page2'
import Page3 from '@/components/sections/Payment/Page3'
import Tabs from '@/components/sections/Payment/Tabs'

type PageProps = {
  slug: string
  data: SanityTourPage
  globals: SanityGlobals
  from: number
  to: number
} & LocalePage

export type PaymentSchema = IPaymentTourExtras & IContactInfo
const features: any = {
  type: 'small',
  features: [
    {
      _type: 'feature',
      icon: {
        _type: 'icon',
        asset: {
          _ref: 'image-111ab8f560c67845718f8442c6d48685a58376ff-49x48-svg',
          _type: 'reference',
        },
      },
      _key: 'a01d9ed85a9b',
      title: {
        _type: 'localestring',
        en: 'Book with $200 deposit',
      },
    },
    {
      _type: 'feature',
      icon: {
        _type: 'icon',
        asset: {
          _ref: 'image-393fae89d6050e95f8b506e48e723bd52c388c70-96x96-png',
          _type: 'reference',
        },
      },
      _key: '78c1fc3ff814',
      title: {
        _type: 'localestring',
        en: 'Interest free payment plans',
      },
    },
    {
      _key: 'eb7c0e8cedbc',
      title: {
        _type: 'localestring',
        en: 'No fees for booking modifications',
      },
      _type: 'feature',
      icon: {
        _type: 'icon',
        asset: {
          _ref: 'image-201f1571c134329463aaeef8eadefa10bdab1994-96x96-png',
          _type: 'reference',
        },
      },
    },
    {
      _type: 'feature',
      icon: {
        _type: 'icon',
        asset: {
          _type: 'reference',
          _ref: 'image-d1aab501335dae71547bde67e1c87c39aa8e72d6-96x96-png',
        },
      },
      _key: '0954f10e731a',
      title: {
        _type: 'localestring',
        en: '24/7 Support',
      },
    },
  ],
  _type: 'feature_section',
  _key: '2d330e2f5c6c',
}
export default function Page({ slug, data, locale, globals, from, to }: PageProps) {
  const validationSchema = yup.object({
    adultMembers: yup.number().required('Required'),
    childrenMembers: yup.number().required('Required'),
    hotelChoice: yup.string().required('Required'),
    roomType: yup.string().required('Required'),
    sharingRoomWith: yup.string().required('Required'),
    optionalVisits: yup
      .array()
      .of(yup.string())
      .test({
        message: 'Should Select atleast 1',
        test: (value) => (value ? value?.length > 0 : false),
      }),
    titlePrefix: yup.string().required('Required'),
    firstName: yup.string().required('Required'),
    middleName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    dobDate: yup.string().required('Required'),
    dobMonth: yup.string().required('Required'),
    dobYear: yup.string().required('Required'),
    nationality: yup.string().required('Required'),
    email: yup.string().required('Required'),
    mobileCode: yup.string().required('Required'),
    mobileNumber: yup.string().required('Required'),
    address: yup.string().required('Required'),
    town: yup.string().required('Required'),
    state: yup.string().required('Required'),
    country: yup.string().required('Required'),
    adultPassenger: yup.array().of(
      yup.object({
        titlePrefix: yup.string().required('Required'),
        firstName: yup.string().required('Required'),
        middleName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        dobDate: yup.string().required('Required'),
        dobMonth: yup.string().required('Required'),
        dobYear: yup.string().required('Required'),
        email: yup.string().required('Required'),
      })
    ),
  })

  const resolver = useYupValidationResolver(validationSchema)

  const pricingData: SanityPricingSection = data?.sections?.find(
    (section) => section._type === 'pricing_section'
  ) as SanityPricingSection

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PaymentSchema>({
    defaultValues: {
      optionalVisits: [],
    },
    resolver,
  })

  const [addons, setAddons] = useState<number>(0)

  useEffect(() => {
    let a = 0
    const optionalVisit = getValues('optionalVisits')
    data?.payment?.extras?.forEach((extra) => {
      optionalVisit?.includes(localizedString(extra.title)) &&
        (a += localizedNumber(extra.price?.initial_price) || 0)
    })
    data?.payment?.room_sharing_options?.forEach((room) => {
      localizedString(room?.title) === getValues('roomType') &&
        (a += localizedNumber(room?.price?.initial_price) || 0)
    })
    data?.payment?.room_options?.forEach((room) => {
      localizedString(room?.title) === getValues('hotelChoice') &&
        (a += localizedNumber(room?.price?.initial_price) || 0)
    })
    setAddons(a)
  }, [getValues(), errors])
  const router = useRouter()

  const startDate = new Date(from)
  const endDate = new Date(to)

  const onSubmit: SubmitHandler<PaymentSchema> = async (data) => {
    fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        adults: data.adultMembers,
        from: startDate.toDateString(),
        children: data.childrenMembers,
        guests: data.childrenMembers + data.adultMembers,
        tour: slug,
        hotelType: data.hotelChoice,
        roomType: data.roomType,
        to: endDate.toDateString(),
        price: 200,
      }),
    }).then(async (res) => {
      const url = await res.text()
      router.replace(url || '/')
    })
  }
  return (
    <Layout locale={locale} breadcrumbs={[]} globals={globals}>
      {/*<FeatureSection data={features} />*/}
      <Tabs
        onSubmit={handleSubmit(onSubmit)}
        tour={data}
        startDate={startDate}
        endDate={endDate}
        pricingData={pricingData}
        adultsNumber={getValues('adultMembers')}
        childrenNumber={getValues('childrenMembers')}
        addons={addons}
      >
        <Page1
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          payment={data.payment}
        />
        <Page2 errors={errors} register={register} setValue={setValue} getValues={getValues} />
        <Page3 />
      </Tabs>
    </Layout>
  )
}

// export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
//   const slugs = (await client.fetch(`*[_type == "tour_page"]{slug}.slug`)) as SanitySlug[]
//
//   return {
//     paths: slugs.map((slug) => ({ params: { slug: slug.current.slice(1) } })),
//     fallback: false,
//   }
// }
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
