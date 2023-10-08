import Image from 'next/image'
import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider, localizedString } from '@/contexts/LocaleProvider'
import client, { urlFor } from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import {
  SanityArticle,
  SanityBlogPage,
  SanityDestinationPage,
  SanityGlobals,
  SanityImageHeaderSection,
  SanityLocale,
  SanitySlug,
  SanityTag,
} from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs, getSlugsFromPath, sanitizeSlug } from '@/utils/utils'

import Container from '@/components/Container'
import Layout from '@/components/layout'
import { BlogPageSectionsMap } from '@/components/sections'
import ImageHeaderSection from '@/components/sections/ImageHeaderSection'
import SEO from '@/components/Seo'
import BlogDetailCard from '@/components/molecule/BlogDetailCard'
type BlogPageProps = {
  slug: string
  articles: SanityArticle[]
  content: SanityTag | SanityDestinationPage
  globals: SanityGlobals
} & LocalePage

export default function BlogPage({ slug, articles, locale, globals, content }: BlogPageProps) {
  const imageHeaderData =
    content._type === 'tag'
      ? {
          header: content.name,
          image: content.hero_image,
          _type: 'image_header_section' as const,
        }
      : (content.sections?.find(
          (s) => s._type === 'image_header_section'
        ) as SanityImageHeaderSection)
  // console.log(articles)
  return (
    <LocaleProvider locale={locale}>
      <SEO title={`${localizedString(content.name, locale)} - Blogs`} />
      <Layout globals={globals} breadcrumbs={[]} locale={locale}>
        {imageHeaderData && <ImageHeaderSection data={imageHeaderData} />}
        <Container className={'grid grid-cols-3 my-5'}>
        {articles?.map((article, index) => {
          return (
            <BlogDetailCard
              country={localizedString(article.destination?.name)}
              excerpt={localizedString(article.introduction)}
              image={article.cover_image ? urlFor(article.cover_image) : ''}
              link={`/blogs/${article.slug?.current}`}
              title={localizedString(article.title)}
              date={localizedString(article.time)}
              author={localizedString(article.author)}
              key={index}
            />
          )
        })}
        </Container>
      </Layout>
    </LocaleProvider>
  )
}

export async function fetchTags() {
  return (await client.fetch(
    `*[_type == "tag"]{
      "slug": slug.current
    }.slug`
  )) as string[]
}

export async function fetchDestinationNames() {
  return (await client.fetch(
    `*[_type == "destination_page"]{
      "slug": slug.current
    }.slug`
  )) as string[]
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

async function fetchBlogPageData(slug: string): Promise<SanityArticle[]> {
  return (await client.fetch(
    `*[_type == "article" && (destination->slug.current == "${slug}" || "${slug}" in tags[]->.slug.current)]{
      ...,
      destination->,
      tags[]->
      }`
  )) as SanityArticle[]
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const blogPageData = await fetchBlogPageData(slug)
  const content = await client.fetch(
    `*[(_type=="tag"||_type=="destination_page") && slug.current=="${slug}"][0]`
  )
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      slug: slug,
      articles: blogPageData,
      content,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
