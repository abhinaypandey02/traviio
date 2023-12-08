import React from 'react'
import Link from 'next/link'

import { localizedString } from '@/contexts/LocaleProvider'
import { SanityLink } from '@/sanity/types'

interface item {
  href: string
  title: string
}

const Footer__links = ({ heading, items }: { heading: string; items: SanityLink[] }) => {
  return (
    <div className="flex gap-2 flex-col text-darkblue">
      <h1 className="psb-2 font-bold  text-base md:text-lg leading-7 md:leading-normal">
        {heading}
      </h1>
      {items.map((item, index) => {
        return (
          <Link
            href={item.url || ''}
            key={index}
            className="text-xs md:text-base  font-normal md:font-medium  leading-tight md:leading-normal"
          >
            {localizedString(item.text)}
          </Link>
        )
      })}
    </div>
  )
}

export default Footer__links
