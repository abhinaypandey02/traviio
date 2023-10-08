import type { GetStaticProps } from 'next'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityArticle, SanityBlogPage, SanityGlobals, SanityLocale } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import { BlogPageSectionsMap } from '@/components/sections'

import { fetchDestinationNames, fetchTags } from './[...slug]'

type BlogPageProps = {
  data: SanityBlogPage
  globals: SanityGlobals
  allBlogs: SanityArticle[]
} & LocalePage

export default function BlogPage({ data, locale, globals, allBlogs }: BlogPageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Slicer
        breadcrumbs={[]}
        globals={globals}
        components={BlogPageSectionsMap}
        sections={data?.sections?.map((sec) =>
          sec._type === 'all_blogs_section' ? { ...sec, blogs: allBlogs } : sec
        )}
      />
    </LocaleProvider>
  )
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ locale }) => {
  const allBlogs = await client.fetch(`*[_type=="article"]{
    destination->{
      name
    },
    introduction,
    time,
    cover_image,
    title
    }
  `)
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
        _type == "featured_place_blogs_section" => {
          ...,
          cards[]->
        },
        _type == "interests_section" => {
          ...,
          interests[]->{
            name,
            icon,
            slug
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
      allBlogs,
      destinations,
      tags,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
