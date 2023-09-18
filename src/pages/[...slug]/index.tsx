import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityGlobals, SanityLocale, SanityPage, SanitySlug } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import { SectionMap } from '@/components/sections'

type PageProps = {
  slug: string
  data: SanityPage
  globals: SanityGlobals
} & LocalePage

export default function Page({ slug, data, locale, globals }: PageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Slicer components={SectionMap} sections={data.sections} />
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(
    `*[_type == "page" && slug.current != "/"]{slug}.slug`
  )) as SanitySlug[]

  return {
    paths: getPaths(slugs, locales),
    fallback: false,
  }
}

async function fetchPageData(slug: string): Promise<SanityPage> {
  const page = (await client.fetch(
    `*[_type == "page"  && slug.current == "${slug}"][0]{
      ...,
      sections[]{
        ...,
        _type == "featured_blogs_section" => {
          ...,
          featured_blogs[]->
        }
      }
    }`
  )) as SanityPage

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
