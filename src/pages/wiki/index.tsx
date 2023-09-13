import type { GetStaticProps } from 'next'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityGlobals, SanityLocale, SanityTravelWiki } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import Layout from '@/components/layout/index'

type WikiPageProps = {
  data: SanityTravelWiki
  globals: SanityGlobals
} & LocalePage

export default function WikiPage({ data, locale, globals }: WikiPageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Layout>
        {data.sections?.map((section, idx) => (
          // Write the component here with the data section
          <div key={idx}>{JSON.stringify(section)}</div>
        ))}
      </Layout>
    </LocaleProvider>
  )
}

export const getStaticProps: GetStaticProps<WikiPageProps> = async ({ locale }) => {
  const wikiPageData = (await client.fetch(
    `*[_type == "travel_wiki"  && slug.current == "/"][0]`
  )) as SanityTravelWiki
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      data: wikiPageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
