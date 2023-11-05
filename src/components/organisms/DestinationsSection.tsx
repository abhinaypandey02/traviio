import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { LocalizedString } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import { SanityDestinationsSection } from '@/sanity/types'

import Container from '../Container'
import DestinationCard from '../molecule/DestinationCard'

type DestinationsSectionProps = {
  data: SanityDestinationsSection
}

const DestinationsSection = ({ data }: DestinationsSectionProps) => {
  const [tourCounts, setTourCounts] = useState(
    Array.from({ length: data.destinations?.length || 0 }, () => 0)
  )
  const validDestinations =
    data.destinations?.filter((destination) => destination.destination) || []
  if (
    process.env.NEXT_PUBLIC_DEVELOPMENT &&
    data.destinations?.length &&
    data.destinations.length < 4
  ) {
    data.destinations?.push(data.destinations[0])
    data.destinations?.push(data.destinations[0])
    data.destinations?.push(data.destinations[0])
  }

  useEffect(() => {
    const fetchTourCounts = async () => {
      const tourCounts = await Promise.all(
        validDestinations.map(async (destination) => {
          const ref = destination.destination?._ref
          if (ref === undefined) return 0
          const tourCount = await client.fetch(
            `count(*[_type == "tour_page" && references("${ref}") && !(_id in path("drafts.*"))])`
          )
          return tourCount
        })
      )
      setTourCounts(tourCounts)
    }
    fetchTourCounts()
  }, [])

  return (
    <Container className={'mb-[50px] md:mb-[80px]'}>
      <div>
        <h4 className="text-blue text-xs  md:text-base font-medium uppercase leading-tight md:leading-normal ">
          <LocalizedString text={data.tagline} />
        </h4>

        <h2 className="text-2xl md:text-[40px] w-fit leading-tight my-3 font-bold -tracking-[1.2px] md:leading-[50px]">
          <LocalizedString text={data.title} />
          <hr className="w-[85px] md:w-1/3 text-yellow  bg-yellow mt-[9px] rounded-full border-t border-b-2" />
        </h2>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-5 md:gap-7 mt-[30px] md:mt-12">
          {validDestinations.map((destination, idx) => (
            <DestinationCard
              key={destination._key + idx}
              data={destination}
              tourCount={tourCounts?.[idx]}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default dynamic(Promise.resolve(DestinationsSection), { ssr: false })
