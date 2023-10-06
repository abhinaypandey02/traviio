import React from 'react'
import Link from 'next/link'
import { SanityLink } from '@/sanity/types'
import { localizedString } from '@/contexts/LocaleProvider'

interface item {
  href: string
  title: string
}

const Footer__links = ({ heading, items }: { heading: string; items: SanityLink[] }) => {
  return (
    <div className="flex gap-2 flex-col text-darkblue">
      <h1 className="pb-2 font-semibold text-xl">{heading}</h1>
      {items.map((item, index) => {
        return (
          <Link href={item.url || ''} key={index} className="text-lg">
            {localizedString(item.text)}
          </Link>
        )
      })}
    </div>
  )
}

export default Footer__links
