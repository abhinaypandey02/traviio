import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider, localizedString } from '@/contexts/LocaleProvider'
import client, { urlFor } from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import {
  SanityDestinationPage,
  SanityGlobals,
  SanityLocale,
  SanitySlug,
  SanityTourPage,
} from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import { DestinationSectionsMap } from '@/components/sections'
import SEO from '@/components/Seo'

type PageProps = {
  slug: string
  data: SanityDestinationPage
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
      <Slicer components={DestinationSectionsMap} sections={data?.sections} />
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(`*[_type == "destination_page"]{slug}.slug`)) as SanitySlug[]

  return {
    paths: getPaths(slugs, locales),
    fallback: false,
  }
}

async function fetchPageData(slug: string): Promise<SanityDestinationPage> {
  const page = (await client.fetch(
    `*[_type == "destination_page"  && slug.current == "${slug}"][0]{
      ...,
      sections[] {
        ...,
        _type == "top_things_section" => {
          ...,
          destination->,
          top_things[]->
        },
        _type == "tour_selection_section" => {
          ...,
          tags[]->
        }
      }
    }`
  )) as SanityDestinationPage

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
