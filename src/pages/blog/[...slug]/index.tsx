import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import { fetchDestinationNames, fetchTags } from '@/pages/blogs/[...slug]'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityBlogPage, SanityGlobals, SanityLocale, SanitySlug } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs, getSlugsFromPath } from '@/utils/utils'

import { BlogPageSectionsMap } from '@/components/sections'
import Layout from '@/components/layout/index'
import ArticleHeroSection from '@/components/sections/ArticleHeroSection'
import Container from '@/components/Container'
import BlogReview from '@/components/organisms/BlogReview'
import BlogSidebar from '@/components/organisms/BlogSidebar'
import InThisPost from '@/components/sections/InThisPost'
import BlogContentSection from '@/components/sections/BlogContentSection'
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

      <Layout>
        <Container>

        <div className='flex items-start bg-white w-full gap-x-10'>

          <div className='w-3/4' >
            <ArticleHeroSection data={data.article} />
              <InThisPost/>

              <BlogContentSection data={data?.article?.subsections}/>
            <BlogReview
              image="/temp.jpg"
              name="Robert Brown"
              socialImage="/linkedin.svg"
              socialLink="/"
              text="One of the most impressive and oldest landmarks in the area of Old Cairo. It has some interesting architectural features like its offset façade facing the street front. It stands out among other neighborhood buildings as they sit at an angle unlike the mosque. The mosque also aligns with the Muslim qibla, the direction where Muslims pray facing Mecca."
              />
 
          </div>
          <BlogSidebar />
        </div>
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
