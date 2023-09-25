import React, { useEffect } from 'react'

import client from '@/sanity/client'
import { SanityTag, SanityTourPage, SanityTourSelectionSection } from '@/sanity/types'

import BestTours from '../organisms/BestTours'
import FilterDropdown from '../organisms/FilterDropdown'

interface BestToursSectionProps {
  data: SanityTourSelectionSection
}

function BestToursSection(props: BestToursSectionProps) {
  const { tags } = props.data
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pageNumber, setPageNumber] = React.useState<number>(1)
  const lastIds = React.useRef<(string | null)[]>([''])
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [pageData, setPageData] = React.useState<SanityTourPage['overview_card'][]>([])
  const pageSize = 1

  const refetchData = (selectedTags: string[], ids: (string | null)[], pageNumber: number) => {
    setLoading(true)
    client
      .fetch(
        `
      *[_type == "tour_page" ${
        selectedTags.length > 0 ? '&& count((tags[]->name.en)[@ in $selectedTags]) > 0' : ''
      } && _id > $lastId] | order(_id) [0...$pageSize] {
        _id, overview_card
      }
    `,
        {
          lastId: ids[pageNumber - 1],
          pageSize,
          selectedTags,
        }
      )
      .then((data: { _id: string; overview_card: SanityTourPage['overview_card'] }[]) => {
        if (data.length > 0) {
          lastIds.current[pageNumber] = data[data.length - 1]._id
          setPageData(data.map((item) => item.overview_card))
        } else {
          setPageData([])
          lastIds.current.push(null)
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    lastIds.current = ['']
    setPageNumber(1)
    refetchData(selectedTags, lastIds.current, 1)
  }, [selectedTags])

  useEffect(() => {
    if (lastIds.current?.[pageNumber - 1] === undefined || lastIds.current[pageNumber - 1] === null)
      return
    refetchData(selectedTags, lastIds.current, pageNumber)
  }, [pageNumber])

  // Initial data
  useEffect(() => {
    refetchData(selectedTags, lastIds.current, 1)
  }, [])

  return (
    <div className="flex flex-col items-center gap-5">
      {JSON.stringify({ loading, pageNumber, selectedTags, pageData })}
      <div className="flex flex-col items-center">
        <h2 className="text-blue text-base font-medium">Tours and Trips</h2>
        <h4 className="text-3xl font-medium ">Best Tours of Egypt</h4>
        <hr className="lg:w-1/2 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2" />
      </div>
      <div className="mx-auto max-w-[90%] grid md:grid-cols-4 grid-cols-1 gap-5">
        <div className="h-full">
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
          tags={tags as SanityTag[]}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          deals={pageData}
          pageSize={pageSize}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  )
}

export default BestToursSection
