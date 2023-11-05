import React from 'react'
import Image from 'next/image'
import ReactStars from 'react-stars'

import { urlFor } from '@/sanity/client'
import { SanityAccommodationSection } from '@/sanity/types'

import Star from '../Star'
const AccomodationCard = ({
  data,
}: {
  data: Exclude<SanityAccommodationSection['accommodation_types'], undefined>[0]
}) => {
  return (
    <div className="rounded-2xl overflow-hidden min-w-[310px] w-full max-w-[400px] shadow-lg place-self-center">
      <div className="text-center bg-[#1A4767] py-3 rounded-t-2xl items-center flex flex-col ">
        <h4 className="text-xl text-white font-semibold">{data.title?.en}</h4>
        <h5 className="text-white text-sm">{data.subtitle?.en}</h5>
        {/*@ts-ignore*/}
        <div className="flex">
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </div>
      <div className="bg-[#ecf4ff] py-4 px-4 flex flex-col gap-4">
        {data.resorts?.map((item, index) => (
          <div className="flex flex-col">
            <div className="w-full h-36 relative" key={index}>
              <Image
                className="object-cover"
                src={item.image ? urlFor(item.image) : ''}
                alt=""
                fill
              />
            </div>
            <h6 className="text-base font-medium">{item.title?.en}</h6>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccomodationCard
