import React from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider, localizedString } from '@/contexts/LocaleProvider'
import client, { urlFor } from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanityPage, SanitySlug, SanityTourPage } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import Layout from '@/components/layout'
import { TourSectionsMap } from '@/components/sections'
import TourHeroSection from '@/components/sections/Tours/TourHeroSection'
import SEO from '@/components/Seo'

type PageProps = {
  slug: string
  data: SanityTourPage
  globals: SanityGlobals
} & LocalePage

export default function Page({ slug, data, locale, globals }: PageProps) {
  return (
    <LocaleProvider locale={locale}>
      <SEO
        title={data.meta_data?.meta_title && localizedString(data.meta_data?.meta_title, locale)}
        description={
          data.meta_data?.meta_description &&
          localizedString(data.meta_data?.meta_description, locale)
        }
        image={data.meta_data?.meta_image && urlFor(data.meta_data?.meta_image)}
      />
      <Layout>
        <TourHeroSection hero_section={data?.hero_section} overview_card={data.overview_card} />
        {data?.sections?.map((section) => {
          const Component = TourSectionsMap[section._type]
          return (
            <React.Fragment key={section._key}>
              {Component &&
                React.createElement(Component, {
                  data: section,
                })}
            </React.Fragment>
          )
        })}
      </Layout>
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(`*[_type == "tour_page"]{slug}.slug`)) as SanitySlug[]

  return {
    paths: getPaths(slugs, locales),
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
