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
  const handleSelectedTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]

    setSelectedTags(updatedTags)
  }

  return (
    <div className={`flex flex-col justify-center m-3 w-full gap-3 ${className}`}>
      <p className="text-base md:text-[20px] font-normal  text-[#726E83] md:font-medium tracking-wide  leading-normal ">
        Found {numberOfTours} Tours - {destination}{' '}
      </p>
      <div className="flex  flex-nowrap overflow-x-auto gap-2">
        {tags?.map((tag, index) => {
          return (
            <div
              className={`border cursor-pointer  text-xs ${
                tag?.name?.en && selectedTags?.includes(tag?.name?.en)
                  ? ' text-blue border-blue'
                  : ' border-gray text-gray'
              }  md:text-sm font-normal md:font-[500] whitespace-nowrap  border-opacity-50 rounded-full p-2 px-3 leading-tight`}
              onClick={() => handleSelectedTag(tag?.name?.en || '')}
              key={index}
            >
              {tag?.name?.en}
            </div>
          )
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
