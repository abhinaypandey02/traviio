import type { GetStaticProps } from 'next'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityGlobals, SanityLocale, SanityPage } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import { SectionMap } from '@/components/sections'

type PageProps = {
  data: SanityPage
  globals: SanityGlobals
} & LocalePage

export default function Page({ data, locale, globals }: PageProps) {
  console.log(globals)
  return (
    <LocaleProvider locale={locale}>
      <Slicer globals={globals} components={SectionMap} sections={data?.sections} />
    </LocaleProvider>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const pageData = (await client.fetch(
    `*[_type == "page"  && slug.current == "/"][0]{
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
        },
        _type == "destinations_section" => {
          ...,
          destinations[] {
            ...,
            'destination': {
              '_ref': destination._ref,
              ...destination->
            }
          }
        },
      }
    }`
  )) as SanityPage
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      data: pageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
