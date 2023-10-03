import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityBlogPage, SanityGlobals, SanityLocale, SanitySlug } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs, getSlugsFromPath, sanitizeSlug } from '@/utils/utils'

import { BlogPageSectionsMap } from '@/components/sections'
type BlogPageProps = {
  slug: string
  data: SanityBlogPage
  globals: SanityGlobals
} & LocalePage

export default function BlogPage({ slug, data, locale, globals }: BlogPageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Slicer globals={globals} components={BlogPageSectionsMap} sections={data?.sections} />
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(
    `*[_type == "blog_page" && defined(article)]{
      "destination": article->{
        "destination": destination->{
          "name": name.en
        }.name
      }.destination
    }.destination`
  )) as string[]

  return {
    paths: slugs
      .map((slug) =>
        (locales ?? []).map((locale) => ({
          params: {
            slug: getSlugsFromPath(slug),
          },
          locale,
        }))
      )
      .flat(),
    fallback: false,
  }
}

async function fetchBlogPageData(slug: string): Promise<SanityBlogPage> {
  const page = (await client.fetch(
    `*[_type == "blog_page" && article->destination->name.en == "${sanitizeSlug(slug)}"][0]{
      ...,
      article->{
        ...,
        destination->
        }
      }`
  )) as SanityBlogPage
  return page
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const blogPageData = await fetchBlogPageData(slug)
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      slug: slug,
      data: blogPageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
