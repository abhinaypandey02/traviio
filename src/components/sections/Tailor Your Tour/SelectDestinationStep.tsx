import React from 'react'
import Image from 'next/image'

import { localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'

import Button from '@/components/buttons/Button'

export default function SelectDestinationStep({
  destinations,
  setSelectedDestination,
  selectedDestination,
  locale,
}: {
  destinations: any
  setSelectedDestination: any
  selectedDestination: any
  locale: any
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {destinations.map((d: any, ind: any) => (
        <div
          key={ind}
          onClick={() => setSelectedDestination(d._id)}
          className={`relative w-full h-[224px] rounded-xl overflow-hidden ${
            [2, 3].includes(ind % 6) && 'lg:col-span-2'
          }`}
        >
          {d.meta_data?.meta_image && (
            <Image
              src={urlFor(d.meta_data?.meta_image)}
              alt={localizedString(d.meta_data.meta_title, locale)}
              fill
              className="object-cover object-center"
            />
          )}
          <Button
            text={localizedString(d.meta_data?.meta_title, locale)}
            className={`w-fit px-4 text-base absolute z-10 bottom-3 left-3 cursor-pointer ${
              selectedDestination == d._id && 'bg-white/40 backdrop-blur'
            }`}
            style={{
              width: 'fit-content',
            }}
            onClick={() => {
              setSelectedDestination(d._id)
            }}
          />
        </div>
      ))}
    </div>
  )
}
