import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/sanity/client'
import { SanityFeaturedToursSection, SanityLocaleString, SanityTourPage } from '@/sanity/types'

import Button from '@/components/buttons/Button'

interface TypeTourCardContent extends SanityTourPage {
  //   _type: 'reference'
  _id: string
  _ref: string
}
interface TypeTourCard {
  badge_content?: SanityLocaleString
  content?: TypeTourCardContent
}

const TravelCard = ({
  data,
}: {
  data: TypeTourCard
  //   data: Exclude<SanityFeaturedToursSection['tour_cards'], undefined>[0]
}) => {
  return (
    <Link href={data?.content?.slug ? '/destinations' + data.content.slug.current : ''}>
      <div className="bg-white h-fit my-5 shadow-md hover:shadow-sm transition-all rounded-2xl cursor-pointer relative">
        {data.badge_content?.en && (
          <span className="bg-red absolute my-2 mx-2 right-0 px-2 py-1 text-white font-bold text-sm rounded-full">
            {data.badge_content?.en}
          </span>
        )}
        <img
          className="rounded-t-2xl"
          src={
            (data?.content?.hero_section?.image && urlFor(data?.content?.hero_section?.image)) ?? ''
          }
        />
        <div className="px-4 py-2">
          <h3 className="text-xl font-medium">{data?.content?.hero_section?.title?.en}</h3>
          <div className="flex px-1 py-2 justify-between">
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/calendar.svg"></Image>
              <p>{data?.content?.overview_card?.duration?.en}</p>
            </div>
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/map_plain.svg"></Image>
              <p>{data?.content?.overview_card?.cities} Cities</p>
            </div>
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/globe.svg"></Image>
              <p>{data?.content?.overview_card?.countries} Countries </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="line-through opacity-50 font-bold text-xl">
              {data.content?.overview_card?.price?.currency_symbol?.en}{' '}
              {data.content?.overview_card?.price?.initial_price?.en}
            </span>
            <span className="text-right">
              <span className="text-xl font-bold">
                From {data.content?.overview_card?.price?.currency_symbol?.en}
                {data.content?.overview_card?.price?.discounted_price?.en}
              </span>{' '}
              <br />
              {data.content?.overview_card?.price?.initial_price?.en &&
                data.content?.overview_card?.price?.discounted_price?.en && (
                  <span className="text-md text-red font-bold">
                    You Save {data.content?.overview_card?.price?.currency_symbol?.en}
                    {data.content?.overview_card?.price?.initial_price?.en -
                      data?.content?.overview_card?.price?.discounted_price?.en}
                  </span>
                )}
            </span>
          </div>
          <Button text="View Trip" varient="primary" />
        </div>
      </div>
    </Link>
  )
}

export default function FeaturedToursSection({ data }: { data: SanityFeaturedToursSection }) {
  console.log('FeaturedToursSection ->', data)
  return (
    <div className="bg-white flex flex-col py-20 gap-12 max-w-[1280px] w-[90%] mx-auto">
      <div className="flex gap-3 flex-col justify-center w-fit mx-auto items-center">
        <h1 className="text-blue text-base font-medium">{data?.tagline?.en}</h1>
        <div>
          <h2 className="text-black font-bold text-4xl">{data?.title?.en}</h2>
          <hr className="lg:w-1/3 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
        </div>
      </div>
      <div className="gap-7 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.tour_cards?.map((map, index) => <TravelCard key={index} data={map} />)}
      </div>
    </div>
  )
}
