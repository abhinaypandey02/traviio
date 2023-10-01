import React, { useEffect, useState } from 'react'
import Container from '../Container'
import { LocalizedString } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import { SanityDestinationsSection } from '@/sanity/types'

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
    <Container>
    <div >
      <h2 className="text-blue text-base font-medium">
        <LocalizedString text={data.tagline} />
      </h2>
      <h4 className="text-3xl font-medium ">
        <LocalizedString text={data.title} />
      </h4>
      <hr className="lg:w-1/12 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2" />
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-x-10 py-8 gap-y-5">
        {validDestinations.map((destination, idx) => (
          <DestinationCard
            key={destination._key}
            data={destination}
            tourCount={tourCounts?.[idx]}
          />
        ))}
      </div>
    </div>
    </Container>
  )
}

export default DestinationsSection
