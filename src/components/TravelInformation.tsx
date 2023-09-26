import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'
import { SanityTravelInfoSection } from '@/sanity/types'

import Button from './buttons/Button'

const TravelInformation = ({ data }: { data: SanityTravelInfoSection }) => {
  return (
    <div className="bg-white flex flex-col gap-12 max-w-[1280px] w-[90%] mx-auto text-center items-center justify-center  rounded-2xl border-yellow border-[1px] shadow-md px-20 py-10">
      <Image
        src={data.icon ? urlFor(data.icon) : ''}
        alt={data.icon?.alt?.en ?? ''}
        height={78}
        width={78}
      />

      <h2 className="my-3 text-4xl font-medium">{data.title?.en}</h2>
      <h5 className="text-base my-4 opacity-60">{data.subtitle?.en}</h5>
      <Button varient={data.cta?.type} text={data.cta?.label?.en} className="px-10 py-3" />
    </div>
  )
}

export default TravelInformation
