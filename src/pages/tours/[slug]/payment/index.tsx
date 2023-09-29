import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next/types'

import client from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanitySlug, SanityTourPage } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import Layout from '@/components/layout'
import FeatureSection from '@/components/sections/FeatureSection'
import Page1 from '@/components/sections/Payment/Page1'
import Page2 from '@/components/sections/Payment/Page2'
import Page3 from '@/components/sections/Payment/Page3'
import Tabs from '@/components/sections/Payment/Tabs'
type PageProps = {
  slug: string
  data: SanityTourPage
  globals: SanityGlobals
} & LocalePage

export default function Page({ slug, data, locale, globals }: PageProps) {
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

  return (
    <Layout globals={globals}>
      <FeatureSection data={features} />
      <Tabs tour={data}>
        <Page1 extras={data.payment} />
        <Page2 />
        <Page3 />
      </Tabs>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(`*[_type == "tour_page"]{slug}.slug`)) as SanitySlug[]

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.current.slice(1) } })),
    fallback: false,
  }
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
        }
      }
    }`
  )) as SanityTourPage

  return page
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const pageData = await fetchPageData(slug)
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      slug: slug,
      data: pageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
