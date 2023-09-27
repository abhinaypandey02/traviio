import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/sanity/client'
import DateFormat from '@/utils/utils'
import { SanityImage } from '@/sanity/types'

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
    <Link href={link} className="w-full rounded-xl overflow-hidden shadow-md h-fit">
      <div className={`rounded-xl shadow-md w-full h-full min-h-fit flex flex-col ${className}`}>
        <div className="min-h-[300px] grow w-full relative">
          <Image src={image} fill alt="" />
        </div>
        <div className="p-5 flex flex-col gap-2 h-fit">
          <p className="uppercase text-blue text-lg font-semibold">{country}</p>
          <h3 className="font-semibold text-xl capitalize">{title}</h3>
          <p className="text-md text-gray font-medium">
            {excerpt} <span className="underline text-blue">Read More</span>
          </p>
          <p className="text-gray">
            By {author} On {DateFormat(new Date(date))}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default BlogDetailCard
