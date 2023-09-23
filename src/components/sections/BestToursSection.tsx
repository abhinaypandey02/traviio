import React from 'react'

import FilterDropdown from '../organisms/FilterDropdown'
import BestTours from '../organisms/BestTours'

function BestToursSection() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center">
        <h2 className="text-blue text-base font-medium">Tours and Trips</h2>
        <h4 className="text-3xl font-medium ">Best Tours of Egypt</h4>
        <hr className="lg:w-1/2 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2" />
      </div>
      <div className="mx-auto max-w-[90%] grid md:grid-cols-4 grid-cols-1 gap-5">
        <div className='h-full'>
          <FilterDropdown
            className=""
            items={[
              {
                title: 'Destination',
                selectedItem: 'All',
                selectionToggle: () => {},
                subitems: ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America'],
              },
              {
                title: 'Destination',
                selectedItem: 'All',
                selectionToggle: () => {},
                subitems: ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America'],
              },
              {
                title: 'Destination',
                selectedItem: 'All',
                selectionToggle: () => {},
                subitems: ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America'],
              },
              {
                title: 'Destination',
                selectedItem: 'All',
                selectionToggle: () => {},
                subitems: ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America'],
              },
            ]}
            selectedItemToggle={() => {}}
          />
        </div>
        <BestTours
          className="col-span-3"
          numberOfTours={50}
          destination="Egypt"
          tags={[
            'Classic Tours',
            'Christmas Tours',
            'Classic Tours',
            'Christmas Tours',
            'Classic Tours',
            'Christmas Tours',
            'Classic Tours',
            'Christmas Tours',
            'Classic Tours',
            'Christmas Tours',
            'Clasasdfsic Tours',
            'Christmas Tours',
            'Classic Tours',
            'Christmas Tours',
            'Classic Tours',
            'Christmas Tours',
            'Classic Tours',
            'Christmas Tours',
            'Classic Tours',
            'Christmas Tours',
          ]}
          tagsToggle={() => {}}
          deals={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}
        />
      </div>
    </div>
  )
}

export default BestToursSection
