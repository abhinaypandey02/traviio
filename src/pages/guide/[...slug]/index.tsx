import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanitySlug, SanityTravelGuide } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

type GuidePageProps = {
  slug: string
  data: SanityTravelGuide
  globals: SanityGlobals
} & LocalePage

export default function GuidePage({ slug, data, locale, globals }: GuidePageProps) {
  return (
    <LocaleProvider locale={locale}>
      {data?.sections?.map((section, idx) => (
        // Write the component here with the data section
        <div key={idx}>{JSON.stringify(section)}</div>
      ))}
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(
    `*[_type == "travel_guide" && slug.current != "/"]{slug}.slug`
  )) as SanitySlug[]

  return {
    paths: getPaths(slugs, locales),
    fallback: false,
  }
}

async function fetchBlogPageData(slug: string): Promise<SanityTravelGuide> {
  const guidePage = (await client.fetch(
    `*[_type == "travel_guide"  && slug.current == "${slug}"][0]`
  )) as SanityTravelGuide

  return guidePage
}

export const getStaticProps: GetStaticProps<GuidePageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const guidePageData = await fetchBlogPageData(slug)
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      slug: slug,
      data: guidePageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
