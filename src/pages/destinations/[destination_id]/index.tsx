import type { GetStaticPaths, GetStaticProps } from 'next/types'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import Slicer from '@/sanity/slicer'
import { SanityDestinationPage, SanityGlobals, SanityLocale, SanitySlug } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs, sanitizeSlug } from '@/utils/utils'

import { DestinationSectionsMap } from '@/components/sections'

type PageProps = {
  id: string
  data: SanityDestinationPage
  globals: SanityGlobals
} & LocalePage

export default function Page({ id, data, locale, globals }: PageProps) {
  return (
    <LocaleProvider locale={locale}>
      <Slicer components={DestinationSectionsMap} sections={data.sections} />
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const destinationIds = (await client.fetch(
    `*[_type == "destination_page"].destination_id`
  )) as string[]

  return {
    paths: destinationIds
      .map((id) =>
        (locales ?? []).map((locale) => ({
          params: {
            destination_id: id,
          },
          locale,
        }))
      )
      .flat(),
    fallback: false,
  }
}

async function fetchDestinationPageData(id: string): Promise<SanityDestinationPage> {
  const page = (await client.fetch(
    `*[_type == "destination_page"  && destination_id == "${id}"][0]`
  )) as SanityDestinationPage

  console.log(id, page)

  return page
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params, locale }) => {
  const destinationId = sanitizeSlug(getSanitySlugFromSlugs(params?.destination_id))
  const pageData = await fetchDestinationPageData(destinationId)
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      id: destinationId,
      data: pageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
