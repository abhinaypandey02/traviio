import React, { useEffect } from 'react'

import { LocaleContextType, localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import client from '@/sanity/client'
import { SanityTag, SanityTourPage, SanityTourSelectionSection } from '@/sanity/types'

import Container from '@/components/Container'

import BestTours from '../organisms/BestTours'
import FilterDropdown from '../organisms/FilterDropdown'

interface BestToursSectionProps {
  data: SanityTourSelectionSection
}

function BestToursSection({
  data: { tags, title, tagline, filters },
  locale,
}: PropsWithLocale<BestToursSectionProps>) {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pageNumber, setPageNumber] = React.useState<number>(0)
  const lastIds = React.useRef<(string | null)[]>([''])
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [pageData, setPageData] = React.useState<
    (SanityTourPage['overview_card'] & SanityTourPage['hero_section'])[]
  >([])
  const pageSize = 9

  const refetchData = (selectedTags: string[], ids: (string | null)[], pageNumber: number) => {
    setLoading(true)
    client
      .fetch(
        `
      *[_type == "tour_page" ${
        selectedTags.length > 0 ? '&& count((tags[]->name.en)[@ in $selectedTags]) > 0' : ''
      } && _id > $lastId] | order(_id) [0...$pageSize] {
        _id, overview_card, hero_section, slug
      }
    `,
        {
          lastId: ids[pageNumber],
          pageSize,
          selectedTags,
        }
      )
      .then((data: { _id: string; overview_card: SanityTourPage['overview_card'] }[]) => {
        if (data.length > 0) {
          lastIds.current[pageNumber] = data[data.length - 1]._id
          setPageData(
            data.map((item: any) => ({
              ...item.overview_card,
              ...item.hero_section,
              href: '/tours/' + item.slug.current,
            }))
          )
        } else {
          setPageData([])
          lastIds.current.push(null)
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    lastIds.current = ['']
    setPageNumber(0)
    refetchData(selectedTags, lastIds.current, 0)
  }, [selectedTags])

  useEffect(() => {
    if (lastIds.current?.[pageNumber - 1] === undefined || lastIds.current[pageNumber - 1] === null)
      return
    refetchData(selectedTags, lastIds.current, pageNumber)
  }, [pageNumber])

  // Initial data
  useEffect(() => {
    refetchData(selectedTags, lastIds.current, 0)
  }, [])
  return (
    <Container className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center">
        <h2 className="text-blue text-[16px] font-[500]">{localizedString(tagline, locale)}</h2>
        <h4 className="text-[40px] font-[700] ">{localizedString(title, locale)}</h4>
        <hr className="lg:w-1/2 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2" />
      </div>
      <div className=" grid md:grid-cols-4 grid-cols-1 gap-5">
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
          numberOfTours={pageData.length}
          destination="Egypt"
          tags={tags as SanityTag[]}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          deals={pageData}
          pageSize={pageSize}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          locale={locale}
        />
      </div>
    </Container>
  )
}

export default BestToursSection
