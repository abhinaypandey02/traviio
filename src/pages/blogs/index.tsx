import type { GetStaticProps } from 'next'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityBlogPage, SanityGlobals, SanityLocale } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import { BlogPageSectionsMap } from '@/components/sections'

import { fetchDestinationNames, fetchTags } from './[...slug]'

type BlogPageProps = {
  data: SanityBlogPage[]
  destinations: string[]
  tags: string[]
  globals: SanityGlobals
} & LocalePage

export default function BlogPage({ data, locale, globals, destinations, tags }: BlogPageProps) {
  return <LocaleProvider locale={locale}>{JSON.stringify({ data })}</LocaleProvider>
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ locale }) => {
  const blogPageData = (await client.fetch(
    `*[_type == "blog_page"]{
      ...,
      article->{
        ...,
        tags[]->,
        destination->
        }
      }`
  )) as SanityBlogPage[]
  const destinations = await fetchDestinationNames()
  const tags = await fetchTags()
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      data: blogPageData,
      destinations,
      tags,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
