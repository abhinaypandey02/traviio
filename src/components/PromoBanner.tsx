import React from 'react'
import Link from 'next/link'

import { localizedString } from '@/contexts/LocaleProvider'
import { SanityLocale, SanityPromoBanner } from '@/sanity/types'

import Container from '@/components/Container'

function PromoBanner({ banner, locale }: { banner?: SanityPromoBanner; locale: SanityLocale }) {
  if (!banner) return null
  return (
    <section className="w-full z-10 py-2 text-white bg-darkblue text-sm font-medium leading-6">
      <Container>
        <div className={'w-full text-center'}>
          {localizedString(banner.text, locale)}{' '}
          <Link
            href={banner.link?.url || '/'}
            className="underline cursor-pointer underline-offset-[3px]"
          >
            {localizedString(banner.link?.text, locale)}
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default PromoBanner
