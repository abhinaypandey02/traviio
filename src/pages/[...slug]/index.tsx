import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider, localizedString } from '@/contexts/LocaleProvider'
import client, { urlFor } from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityGlobals, SanityLocale, SanityPage, SanitySlug } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import { SectionMap } from '@/components/sections'
import SEO from '@/components/Seo'

type PageProps = {
  slug: string
  data: SanityPage
  globals: SanityGlobals
} & LocalePage

export default function Page({ slug, data, locale, globals }: PageProps) {
  return (
    <LocaleProvider locale={locale}>
      <SEO
        title={data?.meta_data?.meta_title && localizedString(data.meta_data?.meta_title, locale)}
        description={
          data?.meta_data?.meta_description &&
          localizedString(data?.meta_data?.meta_description, locale)
        }
        image={data?.meta_data?.meta_image && urlFor(data?.meta_data?.meta_image)}
      />

      <Slicer
        promo_banner={data.promo_banner}
        breadcrumbs={
          data.slug?.current && data.slug.current !== '/'
            ? [
                {
                  label: localizedString(data.meta_data?.meta_title, locale),
                  value: data.slug?.current,
                },
              ]
            : []
        }
        globals={globals}
        components={SectionMap}
        sections={data?.sections}
      />
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(
    `*[_type == "page" && slug.current != "/"]{slug}.slug`
  )) as SanitySlug[]

  return {
    paths: getPaths(slugs, locales),
    fallback: false,
  }
}

async function fetchPageData(slug: string): Promise<SanityPage> {
  const page = (await client.fetch(
    `*[_type == "page"  && slug.current == "${slug}"][0]{
      ...,
      sections[]{
        ...,
        _type == "featured_blogs_section" => {
          ...,
          featured_blogs[]->
        },
        _type == "deals_section" => {
          ...,
          deals[] {
            ...,
            tour->
          }
        }
      }
    }`
  )) as SanityPage

  return page
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const pageData = await fetchPageData(slug)
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
      data: pageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
