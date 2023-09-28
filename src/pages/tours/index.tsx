import type { GetStaticProps } from 'next'

import { LocaleProvider, localizedString } from '@/contexts/LocaleProvider'
import client, { urlFor } from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityGlobals, SanityLocale, SanityTourPage } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import { TourSectionsMap } from '@/components/sections'
import SEO from '@/components/Seo'

type GuidePageProps = {
  data: SanityTourPage
  globals: SanityGlobals
} & LocalePage

export default function GuidePage({ data, locale, globals }: GuidePageProps) {
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
      <Slicer components={TourSectionsMap} sections={data?.sections} />
    </LocaleProvider>
  )
}

export const getStaticProps: GetStaticProps<GuidePageProps> = async ({ locale }) => {
  const guidePageData = (await client.fetch(
    `*[_type == "tour_page"  && slug.current == "/"][0]{
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
        }
      }
    }`
  )) as SanityTourPage
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      data: guidePageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
