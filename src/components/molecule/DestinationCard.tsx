import React from 'react'
import Image from 'next/image'

import { LocalizedString, localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityDestinationsSection } from '@/sanity/types'
import { displayNumber } from '@/utils/utils'

import Schema from '@/components/atoms/Schema'

type DestinationCardProps = {
  data: Exclude<SanityDestinationsSection['destinations'], undefined>[number]
  tourCount?: number
}

const DestinationCard = ({ data, tourCount, locale }: PropsWithLocale<DestinationCardProps>) => {
  const image = data.image || data.destination?.meta_data?.meta_image
  return (
    <div className="w-full h-fit">
      <Schema
        data={{
          '@context': 'https://schema.org',
          '@type': 'Place',
          address: localizedString(data.destination?.name, locale),
          name: localizedString(data.destination?.name, locale),
          image: image && urlFor(image),
        }}
      />
      <div className={'min-h-[250px] md:min-h-[310px]  relative'}>
        {image && (
          <Image
            height={310}
            width={408}
            className="absolute top-0 left-0 w-full h-full rounded-2xl"
            src={urlFor(image)}
            alt=""
          />
        )}
      </div>
      <h3 className="mt-2 md:mt-4 text-lg font-bold">
        {/* @ts-ignore */}
        <LocalizedString text={data.destination?.name} />
      </h3>
      {tourCount && (
        <p className="text-gray font-medium mt-0 md:mt-[2px] text-xs leading-normal">
          {displayNumber(tourCount, 'Tour Package')}
        </p>
      )}
    </div>
  )
}

export default DestinationCard
