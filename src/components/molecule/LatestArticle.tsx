import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedString } from '@/contexts/LocaleProvider'
import { SanityPrice } from '@/sanity/types'

function LatestArticle(props: {
  image: string
  title: string
  link: string
  tourDetails?: {
    days: number
    countries: number
    price: SanityPrice
  }
}) {
  const { image, title, link, tourDetails } = props
  return (
    <Link href={link} className="p-3 rounded-xl flex items-center justify-center gap-2 bg-white">
      <div className="min-w-[75px] min-h-[75px] h-full rounded-xl overflow-hidden relative">
        <Image src={image} fill alt="" style={{ objectFit: 'cover', aspectRatio: 1 }} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">{title}</p>
        {tourDetails && (
          <>
            <div className="grid grid-cols-2">
              <div className="flex gap-2">
                <Image src="/calendar.svg" height={18} width={18} alt="calendar" />
                <p>{tourDetails.days} days</p>
              </div>
              <div className="flex gap-2">
                <Image src="/globe.svg" height={18} width={18} alt="calendar" />
                <p>{tourDetails.countries} countries</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="line-through text-gray">
                {(localizedString(tourDetails.price.currency_symbol) || '') +
                  (tourDetails.price.initial_price || '')}
              </p>
              <p className="text-red font-semibold">
                From{' '}
                {(localizedString(tourDetails.price.currency_symbol) || '') +
                  (tourDetails.price.discounted_price || '')}
              </p>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default LatestArticle
