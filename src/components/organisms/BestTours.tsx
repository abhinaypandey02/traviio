import React from 'react'
import Pagination from 'rc-pagination'

import { SanityTourPage, SanityTag } from '@/sanity/types'

import TravelCard from '../molecule/TravelCard'

interface BestToursProps {
  numberOfTours: number
  destination: string
  tags: SanityTag[]
  selectedTags: string[]
  setSelectedTags: (tag: string[]) => void
  deals: SanityTourPage['overview_card'][]
  className?: string
  pageSize: number
  pageNumber: number
  setPageNumber: (pageNumber: number) => void
}

function BestTours(props: BestToursProps) {
  const {
    numberOfTours,
    destination,
    tags,
    selectedTags,
    setSelectedTags,
    deals,
    className,
    pageSize,
    pageNumber,
    setPageNumber,
  } = props
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
  return (
    <div className={`flex flex-col m-3 gap-3 ${className}`}>
      <p className="text-xl text-gray font-medium">
        Found {numberOfTours} Tours - {destination}{' '}
      </p>
      <div className="flex flex-nowrap overflow-x-auto gap-2">
        {selectedTags?.map((tag, index) => {
          return (
            <div
              className="border border-blue whitespace-nowrap text-blue border-opacity-50 rounded-full p-2"
              onClick={() => {
                setSelectedTags([...selectedTags.filter((t) => t !== tag)])
              }}
              key={index}
            >
              {tag}
            </div>
          )
        })}
        {tags?.map((tag, index) => {
          if (tag?.name?.en && !selectedTags?.includes(tag?.name?.en)) {
            return (
              <div
                className="border border-gray whitespace-nowrap text-gray border-opacity-50 rounded-full p-2"
                onClick={() => {
                  setSelectedTags([...selectedTags, tag?.name?.en || ''])
                }}
                key={index}
              >
                {tag?.name?.en}
              </div>
            )
          }
        })}
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {deals?.map((deal: SanityTourPage['overview_card'], index: number) => {
          return <TravelCard {...deal} key={index} />
        })}
        <Pagination
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '15px',
            gridColumn: '1/-1',
          }}
          pageSize={pageSize}
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
