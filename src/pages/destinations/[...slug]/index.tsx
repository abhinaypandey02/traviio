import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
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

type PageProps = {
  slug: string
  data: SanityDestinationPage
  globals: SanityGlobals
} & LocalePage

export default function Page({ slug, data, locale, globals }: PageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Slicer components={DestinationSectionsMap} sections={data.sections} />
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
