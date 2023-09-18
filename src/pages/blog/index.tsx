import type { GetStaticProps } from 'next'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityBlogPage, SanityGlobals, SanityLocale } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import { BlogPageSectionsMap } from '@/components/sections'

type BlogPageProps = {
  data: SanityBlogPage
  globals: SanityGlobals
} & LocalePage

export default function BlogPage({ data, locale, globals }: BlogPageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Slicer components={BlogPageSectionsMap} sections={data.sections} />
    </LocaleProvider>
  )
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ locale }) => {
  const blogPageData = (await client.fetch(
    `*[_type == "blog_page"  && slug.current == "/"][0]{
      ...,
      article->{
        ...,
        destination->,
        tags[]->,
        sidebar {
          ...,
          sidebar_related_tours {
            ...,
            tags[]->
          }
        }
      }
    }`
  )) as SanityBlogPage
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      data: blogPageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
