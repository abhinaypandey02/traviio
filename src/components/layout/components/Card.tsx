import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Card(props: { title: string; excerpt: string; image: string; link: string }) {
  const { title, excerpt, image, link } = props
  return (
    <Link href={link} className="h-fit my-2">
      <div className="rounded-xl overflow-hidden shadow min-h-max cursor-pointer bg-white">
        <div className="relative h-[50%] min-h-[150px]">
          <Image src={image} fill alt="" objectFit="cover" />
        </div>
        <div className="flex flex-col gap-3 p-3">
          <p className="font-semibold text-lg">{title}</p>
          <p className="text-sm">
            <span className="opacity-50">{excerpt}</span>{' '}
            <span className="text-blue">Read More</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Card
