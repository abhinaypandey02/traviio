import React from 'react'

import { LocaleContextType, localizedNumber, localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityTag, SanityTourPage } from '@/sanity/types'

import { TourCard } from '@/components/sections/DealsSection'
import { Pagination } from '@/components/sections/ReviewSection'

interface BestToursProps {
  numberOfTours: number
  destination: string
  tags: SanityTag[]
  selectedTags: string[]
  setSelectedTags: (tag: string[]) => void
  deals: (SanityTourPage['overview_card'] & SanityTourPage['hero_section'])[]
  className?: string
  pageSize: number
  pageNumber: number
  setPageNumber: (pageNumber: number) => void
  locale?: LocaleContextType['locale']
}

function BestTours({
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
  locale,
}: BestToursProps) {
  return (
    <div className={`flex flex-col m-3 gap-3 ${className}`}>
      <p className="text-xl text-gray font-medium">
        Found {numberOfTours} Tours - {destination}{' '}
      </p>
      <div className="flex flex-nowrap overflow-x-auto gap-2">
        {selectedTags?.map((tag, index) => {
          return (
            <div
              className="border cursor-pointer border-blue whitespace-nowrap text-blue border-opacity-50 rounded-full p-2"
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
                className="border cursor-pointer border-gray whitespace-nowrap text-gray border-opacity-50 rounded-full p-2"
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
        {deals?.map((deal: any, index: number) => {
          return (
            <TourCard
              title={localizedString(deal?.about, locale)}
              image={{
                src: (deal?.image && urlFor(deal.image)) || '',
                alt: '',
              }}
              href={deal.href}
              duration={localizedString(deal?.duration, locale)}
              currency={localizedString(deal?.price?.currency_symbol, locale)}
              cities={deal?.cities}
              old_price={localizedNumber(deal?.price?.initial_price, locale)}
              new_price={localizedNumber(deal?.price?.discounted_price, locale)}
              key={index}
            />
          )
        })}
      </div>
      <Pagination
        currentPage={pageNumber}
        pageSize={pageSize}
        onChange={setPageNumber}
        total={numberOfTours}
      />
    </div>
  )
}

export default BestTours
