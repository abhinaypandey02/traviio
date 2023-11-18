import React from 'react'
import Link from 'next/link'

import { localizedString } from '@/contexts/LocaleProvider'
import { SanityLocale, SanityPromoBanner } from '@/sanity/types'

import Container from '@/components/Container'

function PromoBanner({ banner, locale }: { banner?: SanityPromoBanner; locale: SanityLocale }) {
  if (!banner) return null
  return (
    <div className="w-full z-10 py-1 md:py-2  text-white bg-darkblue text-[11px] md:text-sm font-medium leading-tight  md:leading-normal ">
      <Container>
        <div className={'w-full text-center '}>
          {localizedString(banner.text, locale)}
          <Link
            href={banner.link?.url || '/'}
            className="underline cursor-pointer font-bold underline-offset-[3px] "
          >
            {localizedString(banner.link?.text, locale)}
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default PromoBanner
