import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import { SanityLocale, SanityPage } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs, getSlugsFromPath } from '@/utils/utils'

type PageProps = {
  slug: string
  data: SanityPage
} & LocalePage

export default function Page({ slug, data, locale }: PageProps) {
  return (
    <LocaleProvider locale={locale}>
      <div>{JSON.stringify({ slug, data, locale })}</div>
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(
    `*[_type == "page" && slug.current != "/"]{slug}.slug`
  )) as SanityPage['slug'][]

  return {
    paths: getPaths(slugs, locales),
    fallback: false,
  }
}

async function fetchPageData(slug: string): Promise<SanityPage> {
  const page = (await client.fetch(
    `*[_type == "page"  && slug.current == "${slug}"][0]`
  )) as SanityPage

  return page
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const pageData = await fetchPageData(slug)
  return {
    props: {
      slug: slug,
      data: pageData,
      locale: (locale ?? 'en') as SanityLocale,
    },
  }
}
