import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import PortableText from 'react-portable-text'
import { LocalizedString, localizedString } from '@/contexts/LocaleProvider'

const PortableTextSerializer = {
  locale_rich_text: (props: any) => {
    return <p>{props.en[0].children[0].text}</p>
  },
}

function BlogDetailCard(props: {
  country: string
  title: string
  date: string
  image: string
  link: string
  excerpt: string
  author: string
  className?: string
}) {
  const { country, title, date, image, excerpt, link, author, className } = props
  return (
    <Link href={link} className="w-[410px] rounded-xl overflow-hidden shadow-md h-fit">
      {/* {JSON.stringify({props})} */}
      <div className={`rounded-xl shadow-md w-full h-full min-h-fit flex flex-col ${className}`}>
        <div className="min-h-[300px] grow w-full relative">
          <Image src={image} fill alt="" />
        </div>
        <div className="p-5 flex flex-col gap-2 h-fit">
          <p className="uppercase text-blue text-lg font-semibold">{country}</p>
          <h3 className="font-semibold text-xl capitalize">{title}</h3>
          <div className='flex flex-col'>
            <span className="text-md text-gray font-medium gap-1 line-clamp-2">{excerpt}</span>
            <span className="underline text-blue">Read More</span>
          </div>
          <p className="text-gray">
            By {author} On {date}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default BlogDetailCard
