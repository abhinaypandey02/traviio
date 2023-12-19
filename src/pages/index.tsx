import type { GetStaticProps } from 'next'

import { LocaleProvider, localizedString } from '@/contexts/LocaleProvider'
import client, { urlFor } from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityGlobals, SanityLocale, SanityPage } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'
import { getAllPages, PageData } from '@/utils/utils'

import { SectionMap } from '@/components/sections'
import Popup from '@/components/sections/Popup'
import SEO from '@/components/Seo'

type PageProps = {
  data: SanityPage
  globals: SanityGlobals
} & LocalePage

export default function Page({ data, locale, globals }: PageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Popup />
      <SEO
        title={data?.meta_data?.meta_title && localizedString(data.meta_data?.meta_title, locale)}
        description={
          data?.meta_data?.meta_description &&
          localizedString(data?.meta_data?.meta_description, locale)
        }
        image={data?.meta_data?.meta_image && urlFor(data?.meta_data?.meta_image)}
      />

      <Slicer
        breadcrumbs={[]}
        promo_banner={data.promo_banner}
        globals={globals}
        components={SectionMap}
        sections={data?.sections}
      />
    </LocaleProvider>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const pageData = (await client.fetch(
    `*[_type == "page"  && slug.current == "/"][0]{
      ...,
      sections[]{
        ...,
        _type == "featured_blogs_section" => {
          ...,
          featured_blogs[]->
        },
        _type == "deals_section" => {
          ...,
          deals[] {
            ...,
            tour->
          }
        },
        _type == "destinations_section" => {
          ...,
          destinations[] {
            ...,
            'destination': {
              '_ref': destination._ref,
              'count': (*[_type == "tour_page" && document._ref == ^._id && !(_id in path("drafts.*"))]),
              ...destination->
            }
          }
        },
      }
    }`
  )) as SanityPage
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
      data: pageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
