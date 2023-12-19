import React from 'react'
import Link from 'next/link'

import { localizedString } from '@/contexts/LocaleProvider'
import { SanityLocale, SanityPromoBanner } from '@/sanity/types'

import Container from '@/components/Container'

function PromoBanner({ banner, locale }: { banner?: SanityPromoBanner; locale: SanityLocale }) {
  if (!banner) return null
  return (
    <div className="w-full h-[40px] flex flex-col items-center justify-center z-10 text-white bg-darkblue">
      <Container className="pl-[18px] pr-[19px]">
        <div
          className={'font-medium text-xs md:text-sm leading-[20px] md:leading-[24px] text-center '}
        >
          {localizedString(banner.text, locale)}{' '}
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
