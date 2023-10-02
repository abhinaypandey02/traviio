import React from 'react'

import { LocalizedString } from '@/contexts/LocaleProvider'
import { SanityDestinationsSection } from '@/sanity/types'
import { displayNumber } from '@/utils/utils'

type DestinationCardProps = {
  data: Exclude<SanityDestinationsSection['destinations'], undefined>[number]
  tourCount?: number
}

const DestinationCard = ({ data, tourCount }: DestinationCardProps) => {
  return (
    <div className="w-fit h-fit">
      <img
        className=" w-full rounded-2xl"
        src="https://www.jaipurstuff.com/wp-content/uploads/2022/08/First-Time-Visitors-Guide-to-Jaipur.jpg"
        alt=""
      />
      <h3 className="mt-2 font-medium">
        {/* @ts-ignore */}
        <LocalizedString text={data.destination?.name} />
      </h3>
      {tourCount && <h4 className="opacity-60 my-1 text-sm">{displayNumber(tourCount, 'tour')}</h4>}
    </div>
  )
}

export default DestinationCard
