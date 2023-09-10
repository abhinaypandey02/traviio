import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanitySlug, SanityTravelWiki } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

type WikiPageProps = {
  slug: string
  data: SanityTravelWiki
  globals: SanityGlobals
} & LocalePage

export default function WikiPage({ slug, data, locale, globals }: WikiPageProps) {
  return <LocaleProvider locale={locale}>{JSON.stringify(data)}</LocaleProvider>
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(
    `*[_type == "travel_wiki" && slug.current != "/"]{slug}.slug`
  )) as SanitySlug[]

  return {
    paths: getPaths(slugs, locales),
    fallback: false,
  }
}

async function fetchBlogPageData(slug: string): Promise<SanityTravelWiki> {
  const wikiPage = (await client.fetch(
    `*[_type == "travel_wiki"  && slug.current == "${slug}"][0]`
  )) as SanityTravelWiki

  return wikiPage
}

export const getStaticProps: GetStaticProps<WikiPageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const wikiPageData = await fetchBlogPageData(slug)
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      slug: slug,
      data: wikiPageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
