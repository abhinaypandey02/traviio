import { SanityDeal } from '@/sanity/types'
import React from 'react'
import Pagination from 'rc-pagination'

import TravelCard from '../molecule/TravelCard'

interface BestToursProps {
  numberOfTours: number
  destination: string
  tags: string[]
  tagsToggle: (tag: string) => void
  deals: SanityDeal[]
  className?: string
}

function BestTours(props: BestToursProps) {
  const { numberOfTours, destination, tags, tagsToggle, deals, className } = props
  const buttonItemRender = (current: any, type: String, element: any) => {
    if (type === 'prev') {
      return (
        <button className="opacity-50 border-[1px] rounded-full px-6 py-2" type="button">
          Prev
        </button>
      )
    }
    if (type === 'next') {
      return (
        <button className="bg-black text-white rounded-full px-6 py-2" type="button">
          Next
        </button>
      )
    }
    // if(type==='cuurent')return <button>{current}</button>
    return null
  }
  const [pageNumber, setPageNumber] = React.useState(1)
  return (
    <div className={`flex flex-col m-3 gap-3 ${className}`}>
      <p className="text-xl text-gray font-medium">
        Found {numberOfTours} Tours - {destination}{' '}
      </p>
      <div className="flex flex-nowrap overflow-x-auto gap-2">
        {tags?.map((tag, index) => {
          return (
            <div
              className="border border-gray whitespace-nowrap text-gray border-opacity-50 rounded-full p-2"
              onClick={() => {
                tagsToggle(tag)
              }}
              key={index}
            >
              {tag}
            </div>
          )
        })}
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {deals?.map((deal, index) => {
          return <TravelCard key={index} />
        })}
        <Pagination
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '15px',
            gridColumn: '1/-1'
          }}
          pageSize={9}
          onChange={(current: any, pageSize: any) => {
            setPageNumber(current)
          }}
          total={numberOfTours}
          itemRender={buttonItemRender}
        />
      </div>
    </div>
  )
}

export default BestTours
