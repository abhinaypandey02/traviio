import React from 'react'
import Image from 'next/image'

import { LocalizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityDestinationsSection } from '@/sanity/types'
import { displayNumber } from '@/utils/utils'

type DestinationCardProps = {
  data: Exclude<SanityDestinationsSection['destinations'], undefined>[number]
  tourCount?: number
}

const DestinationCard = ({ data, tourCount }: DestinationCardProps) => {
  const image = data.image || data.destination?.meta_data?.meta_image
  return (
    <div className="w-full h-fit">
      <div className={'min-h-[310px]  relative'}>
        {image && (
          <Image
            height={310}
            width={408}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            src={urlFor(image)}
            alt=""
          />
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold">
        {/* @ts-ignore */}
        <LocalizedString text={data.destination?.name} />
      </h3>
      {tourCount && (
        <h4 className="text-gray font-medium mt-0.5 text-sm">
          {displayNumber(tourCount, 'Tour Package')}
        </h4>
      )}
    </div>
  )
}

export default DestinationCard
