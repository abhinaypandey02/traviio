import type { GetStaticProps } from 'next'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanityTravelGuide } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

type GuidePageProps = {
  data: SanityTravelGuide
  globals: SanityGlobals
} & LocalePage

export default function GuidePage({ data, locale, globals }: GuidePageProps) {
  return <LocaleProvider locale={locale}>{JSON.stringify(data)}</LocaleProvider>
}

export const getStaticProps: GetStaticProps<GuidePageProps> = async ({ locale }) => {
  const guidePageData = (await client.fetch(
    `*[_type == "travel_guide"  && slug.current == "/"][0]`
  )) as SanityTravelGuide
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      data: guidePageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
