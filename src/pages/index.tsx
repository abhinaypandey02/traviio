import type { GetStaticProps } from 'next'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityLocale, SanityPage } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import { SectionMap } from '@/components/sections'

type PageProps = {
  data: SanityPage
} & LocalePage

export default function Page({ data, locale }: PageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Slicer components={SectionMap} sections={data.sections} />
    </LocaleProvider>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const pageData = (await client.fetch(
    `*[_type == "page"  && slug.current == "/"][0]`
  )) as SanityPage
  return {
    props: {
      data: pageData,
      locale: (locale ?? 'en') as SanityLocale,
    },
  }
}
