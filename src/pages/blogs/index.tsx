import type { GetStaticProps } from 'next'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityBlogPage, SanityGlobals, SanityLocale } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import { BlogPageSectionsMap } from '@/components/sections'

import { fetchDestinationNames, fetchTags } from './[...slug]'

type BlogPageProps = {
  data: SanityBlogPage
  globals: SanityGlobals
} & LocalePage

export default function BlogPage({ data, locale, globals }: BlogPageProps) {
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

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ locale }) => {
  const blogPageData = (await client.fetch(
    `*[_type == "blog_page" && slug.current == "/"][0]{
      ...,
      sections[] {
        ...,
        _type == "featured_blogs_section" => {
          ...,
          featured_blogs[]->{
            ...,
            tags[]->,
            destination-> {
              name,
            }
          }
        },
        _type == "blogs_section" => {
          ...,
          blogs[]->{
            ...,
            tags[]->
          }
        }
      }
      }
      `
  )) as SanityBlogPage
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  const destinations = await fetchDestinationNames()
  const tags = await fetchTags()
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
