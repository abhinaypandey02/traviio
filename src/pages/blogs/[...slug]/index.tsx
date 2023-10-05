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
  tags: string[]
  destinations: string[]
  globals: SanityGlobals
} & LocalePage

export default function BlogPage({
  slug,
  data,
  locale,
  globals,
  destinations,
  tags,
}: BlogPageProps) {
  return (
    <LocaleProvider locale={locale}>
      {JSON.stringify({ destinations, tags })}
      <Slicer globals={globals} components={BlogPageSectionsMap} sections={data?.sections} />
    </LocaleProvider>
  )
}

export async function fetchTags() {
  const tags = (await client.fetch(
    `*[_type == "blog_page" && defined(article)]{
      "tags": article->{
        "tags": tags[]->{
          "name": name.en
        }.name
      }.tags[]
    }.tags[]`
  )) as string[]
  return tags
}

export async function fetchDestinationNames() {
  const destinations = (await client.fetch(
    `*[_type == "blog_page" && defined(article)]{
      "destination": article->{
        "destination": destination->{
          "name": name.en
        }.name
      }.destination
    }.destination`
  )) as string[]
  return destinations
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const destinations = await fetchDestinationNames()
  const tags = await fetchTags()
  return {
    paths: [...destinations, ...tags]
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
    `*[_type == "blog_page" && (article->destination->name.en == "${slug}" || "${sanitizeSlug(
      slug
    )}" in article->tags[]->.name.en)]{
      ...,
      article->{
        ...,
        tags[]->,
        destination->
        }
      }`
  )) as SanityBlogPage
  return page
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const blogPageData = await fetchBlogPageData(slug)
  const destinations = await fetchDestinationNames()
  const tags = await fetchTags()
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      slug: slug,
      data: blogPageData,
      destinations,
      tags,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
