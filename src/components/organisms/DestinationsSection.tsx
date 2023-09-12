import React from 'react'

import DestinationCard from '../molecule/DestinationCard'

const DestinationsSection = () => {
  return (
    <div className="py-10 px-10">
      <h2 className="text-blue text-base font-medium">DESITINATIONS</h2>
      <h4 className="text-3xl font-medium ">Where We Can Go</h4>
      <hr className="lg:w-1/12 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2" />
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-x-10 py-8 gap-y-5">
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
      </div>
    </div>
  )
}

export default DestinationsSection
