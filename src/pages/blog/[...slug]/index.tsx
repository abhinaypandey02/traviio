import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import { fetchDestinationNames, fetchTags } from '@/pages/blogs/[...slug]'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityBlogPage, SanityGlobals, SanityLocale, SanitySlug } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs, getSlugsFromPath } from '@/utils/utils'

import Container from '@/components/Container'
import Layout from '@/components/layout/index'
import { BlogPageSectionsMap } from '@/components/sections'
import ArticleHeroSection from '@/components/sections/ArticleHeroSection'
import BlogContentSection from '@/components/sections/BlogContentSection'
import InThisPost from '@/components/sections/InThisPost'

import BlogReview from '@/components/organisms/BlogReview'
import BlogSidebar from '@/components/organisms/BlogSidebar'
type BlogPageProps = {
  data: SanityBlogPage
  globals: SanityGlobals
} & LocalePage

export default function BlogPage({ data, locale, globals }: BlogPageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Layout breadcrumbs={[]} locale={locale} globals={globals}>
        <Container>
          <div className="flex items-start bg-white w-full gap-x-14">
            <div className="w-3/4">
              <ArticleHeroSection data={data.article} />
              <InThisPost />

              <BlogContentSection data={data?.article?.subsections} />
            </div>
            <BlogSidebar />
          </div>
          <BlogReview data={data.article?.author} />
        </Container>
      </Layout>
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
    paths: getPaths(slugs, locales),
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
  console.log(page)
  return page
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const blogPageData = await fetchBlogPageData(slug)
  const tags = await fetchTags()
  const destinations = await fetchDestinationNames()
  const globals = (await client.fetch(`*[_type == "globals"][0]{
    ...,
    navbar {
  ...,
      links[] {
        ...,
        _type == "tour_dropdown" => {
          ...,
          destinations[] {
            ...,
            destination->,
            tours[]->,
            blogs[]->,
          }
        }
      }
}
}`)) as SanityGlobals
  console.log(locale)
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
