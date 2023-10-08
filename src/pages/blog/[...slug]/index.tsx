import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import { fetchDestinationNames, fetchTags } from '@/pages/blogs/[...slug]'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityBlogPage, SanityGlobals, SanityLocale, SanitySlug } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs, getSlugsFromPath } from '@/utils/utils'

import { BlogPageSectionsMap } from '@/components/sections'
type BlogPageProps = {
  slug: string
  data: SanityBlogPage
  destinations: string[]
  tags: string[]
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
      <Slicer
        breadcrumbs={[]}
        globals={globals}
        components={BlogPageSectionsMap}
        sections={data?.sections}
      />
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(
    `*[_type == "blog_page" && defined(slug.current) && defined(article)]{
      slug,
    }.slug`
  )) as SanitySlug[]

  return {
    paths: slugs
      .map((slug) =>
        (locales ?? []).map((locale) => ({
          params: {
            slug: getSlugsFromPath(slug.current),
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
    `*[_type == "blog_page" && slug.current == "${slug}"][0]{
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
  const tags = await fetchTags()
  const destinations = await fetchDestinationNames()
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
