import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/sanity/client'
import {
  SanityDeal,
  SanityDealsSection,
  SanityFeaturedToursSection,
  SanityLocaleString,
  SanityTourPage,
} from '@/sanity/types'

import Container from '@/components/Container'
import Swiper from '@/components/Swiper'

import Button from '../buttons/Button'

import 'swiper/css'
import 'swiper/css/navigation'

export type DealSectionProps = {
  data: SanityDealsSection
}

const TravelCard = ({ deal }: { deal: SanityDeal }) => {
  let data = deal as any
  console.log('TravelCard->', data)
  return (
    <Link
      className={'flex-shrink-0 max-w-[302px]'}
      href={data?.tour?.slug ? '/destinations' + data.tour.slug.current : ''}
    >
      <div className="bg-white relative h-min my-5 shadow-md hover:shadow-sm transition-all rounded-2xl cursor-pointer">
        <span className="bg-red absolute my-2 mx-2 right-0 px-2 py-1 text-white font-bold text-sm rounded-full">
          Hot Deal
        </span>
        <Image
          width={302}
          height={220}
          alt={data?.tour?.hero_section?.image.alt}
          className="rounded-t-2xl h-[220px]"
          src={urlFor(data?.tour?.hero_section?.image)}
        />
        <div className="px-4 py-2">
          <h3 className="text-xl font-medium">{data?.tour?.hero_section?.title?.en}</h3>
          <div className="flex px-1 py-2 justify-between">
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/calendar.svg"></Image>
              <p>{data?.tour?.overview_card?.duration?.en}</p>
            </div>
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/map_plain.svg"></Image>
              <p>{data?.tour?.overview_card?.cities} Cities</p>
            </div>
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/globe.svg"></Image>
              <p>{data?.tour?.overview_card?.countries} Countries </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="line-through opacity-50 font-bold text-xl">
              &#x24;{data?.old_price?.en}
            </span>
            <span className="text-right">
              <span className="text-xl font-bold">From &#x24;{data?.new_price?.en}</span> <br />
              <span className="text-md text-red font-bold">
                You Save &#x24;{data?.discount?.en}
              </span>
            </span>
          </div>
          <Button text="View Trip" varient="primary" />
        </div>
      </div>
    </Link>
  )
}

const DealsSection = ({ data: { tagline, title, deals, _type } }: DealSectionProps) => {
  return (
    <Container className="px-10 py-10  text-black bg-white">
      <div
        className={_type === ('featured_tours_section' as any) ? 'flex flex-col items-center' : ''}
      >
        <h2 className="text-blue text-base font-medium">{tagline?.en}</h2>
        <h4 className="text-3xl font-medium ">{title?.en}</h4>
        <hr className="lg:w-1/12 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2" />
      </div>

      <Swiper className={'gap-4'} length={deals?.length} scrollCount={2}>
        {deals?.map((deal) => <TravelCard deal={deal} />)}
      </Swiper>
    </Container>
  )
}

export default DealsSection
