import type { GetStaticProps } from 'next'

import { LocaleProvider } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanityTailorYourTour } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

type TailorYourTourPageProps = {
  data: SanityTailorYourTour
  globals: SanityGlobals
} & LocalePage

export default function Page({ data, locale, globals }: TailorYourTourPageProps) {
  return <LocaleProvider locale={locale}>{JSON.stringify(data)}</LocaleProvider>
}

export const getStaticProps: GetStaticProps<TailorYourTourPageProps> = async ({ locale }) => {
  const tailorYourTourPageData = (await client.fetch(
    `*[_type == "tailor_your_tour"][0]`
  )) as SanityTailorYourTour
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      data: tailorYourTourPageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
