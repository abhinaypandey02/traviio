import React from 'react'
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
  SanityLocaleString,
  SanityPhoto,
  SanitySlug,
  SanityTag,
} from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs, getSlugsFromPath, sanitizeSlug } from '@/utils/utils'

import Container from '@/components/Container'
import Layout from '@/components/layout'
import BlogChoose from '@/components/molecule/BlogChoose'
import BlogDetailCard from '@/components/molecule/BlogDetailCard'
import { BlogPageSectionsMap } from '@/components/sections'
import ImageHeaderSection from '@/components/sections/ImageHeaderSection'
import { Pagination } from '@/components/sections/ReviewSection'
import SEO from '@/components/Seo'

type BlogPageProps = {
  slug: string
  articles: SanityArticle[]
  content: SanityTag | SanityDestinationPage | SanityBlogPage
  globals: SanityGlobals
  destinations: { name: SanityLocaleString; slug: string; icon: SanityPhoto }[]
  tags: { name: SanityLocaleString; slug: string; icon: SanityPhoto }[]
} & LocalePage

export default function BlogPage({
  slug,
  articles,
  locale,
  globals,
  content,
  destinations,
  tags,
}: BlogPageProps) {
  const imageHeaderData =
    content?._type === 'tag'
      ? {
          header: content?.name,
          image: content.hero_image,
          _type: 'image_header_section' as const,
        }
      : content?._type === 'destination_page'
      ? (content?.sections?.find(
          (s) => s?._type === 'image_header_section'
        ) as SanityImageHeaderSection)
      : (content?.sections?.find(
          (s) => s?._type === 'image_header_section'
        ) as SanityImageHeaderSection)
  // console.log(articles)
  const [value, setValue] = React.useState(0)
  return (
    <LocaleProvider locale={locale}>
      <SEO
        title={`${localizedString(
          content?._type === 'tag'
            ? content?.name
            : content?._type === 'destination_page'
            ? content?.name
            : content?.meta_data?.meta_title,
          locale
        )} - Blogs`}
      />
      <Layout globals={globals} breadcrumbs={[]} locale={locale}>
        {imageHeaderData && <ImageHeaderSection data={imageHeaderData} />}
        <Container className={'my-5'}>
          {/* {JSON.stringify(content)} */}

          {articles && (
            <>
              <h4 className="font-[700] text-[24px]">Latest Articles</h4>
              <hr className="text-yellow bg-yellow w-1/12 rounded-full border-2 my-2" />
              <BlogChoose
                items={[...destinations, ...tags].map((item) => {
                  return {
                    title: localizedString(item?.name),
                    link: `/blogs${item.slug}`,
                    images: [urlFor(item.icon)],
                  }
                })}
              />
              <div className="grid grid-cols-3 my-10">
                {articles?.map((article, index) => {
                  return (
                    <BlogDetailCard
                      country={localizedString((article.destination as any)?.name)}
                      excerpt={localizedString(article.introduction)}
                      image={article.cover_image ? urlFor(article.cover_image) : ''}
                      link={`/blogs${article.slug?.current}`}
                      title={localizedString(article.title)}
                      date={localizedString(article.time)}
                      author={localizedString(article.author?.name)}
                      key={index}
                    />
                  )
                })}
              </div>
              <Pagination
                total={articles?.length || 0}
                pageSize={9}
                currentPage={value}
                onChange={setValue}
              />
            </>
          )}
        </Container>
      </Layout>
    </LocaleProvider>
  )
}

export async function fetchTags() {
  return (await client.fetch(
    `*[_type == "tag"]{
      name,
      icon,
      "slug": slug.current
    }`
  )) as { name: SanityLocaleString; slug: string; icon: SanityPhoto }[]
}

export async function fetchDestinationNames() {
  return (await client.fetch(
    `*[_type == "destination_page"]{
      name,
      icon,
      "slug": slug.current
    }`
  )) as { name: SanityLocaleString; slug: string; icon: SanityPhoto }[]
}

export async function fetchBlogSlugs() {
  return (await client.fetch(
    `*[_type == "blog_page" && defined(is_article) && is_article == false && slug.current != "/"]{
      "slug": slug.current,
    }`
  )) as { slug: string }[]
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const destinations = await fetchDestinationNames()
  const tags = await fetchTags()
  const slugs = await fetchBlogSlugs()
  return {
    paths: [...destinations, ...tags, ...slugs]
      .map((slug) =>
        (locales ?? []).map((locale) => ({
          params: {
            slug: getSlugsFromPath(slug.slug),
          },
          locale,
        }))
      )
      .flat(),
    fallback: false,
  }
}

async function fetchBlogPageData(slug: string): Promise<SanityBlogPage> {
  return await client.fetch(
    `*[_type == "blog_page" && slug.current == "${slug}" && is_article == false][0]{
      ...,
      article->{
        ...,
        tags[]->,
        destination->
      },
      tags[]->,
      sidebar[]{
        _type == "sidebar_latest_articles" => {
          ...,
          articles[]->{
            ...,
            tags[]->,
            destination->
          }
        },
        _type == "sidebar_related_tours" => {
          ...,
          tours[]->{
            ...
          }
        }
      }
    }`
  )
}

async function fetchArticles(slug: string, blogPageData: SanityBlogPage): Promise<SanityArticle[]> {
  // Check if this page is in blog pages that isn't an article
  if (blogPageData) {
    const tagSlugs = blogPageData?.tags?.map((tag: any) => tag.slug.current) ?? []

    console.log({ str: JSON.stringify(tagSlugs) })

    const articles = await client.fetch(
      `*[_type == "article" && count((tags[]->{"slug": slug.current}.slug)[@ in ${JSON.stringify(
        tagSlugs
      )}]) > 0]{
        ...,
        destination->,
        tags[]->
      }`
    )

    return articles as SanityArticle[]
  }

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
  let content = await fetchBlogPageData(slug)
  const blogPageData = await fetchArticles(slug, content)
  if (!content) {
    content = await client.fetch(
      `*[(_type=="tag"||_type=="destination_page") && slug.current=="${slug}"][0]`
    )
  }
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
  return {
    props: {
      slug: slug,
      articles: blogPageData,
      content,
      tags,
      destinations,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
