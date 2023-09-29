import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedNumber, localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
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

export const TourCard = ({
  href,
  image,
  title,
  duration,
  cities = 0,
  countries = 0,
  old_price,
  new_price,
  currency = '$',
}: {
  href: string
  image: { src: string; alt: string }
  title: string
  duration: string
  cities?: number
  countries?: number
  old_price: number
  new_price: number
  currency?: string
}) => {
  return (
    <Link className={'flex-shrink-0 max-w-[302px]'} href={href}>
      <div className="bg-white relative h-min my-5 shadow-md hover:shadow-sm transition-all rounded-2xl cursor-pointer">
        <span className="bg-red absolute my-2 mx-2 right-0 px-2 py-1 text-white font-bold text-sm rounded-full">
          Hot Deal
        </span>
        <Image
          width={302}
          height={220}
          alt={image.alt}
          className="rounded-t-2xl h-[220px]"
          src={image.src}
        />
        <div className="px-4 py-2">
          <h3 className="text-xl font-medium">{title}</h3>
          <div className="flex px-1 py-2 justify-between">
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/calendar.svg"></Image>
              <p>{duration}</p>
            </div>
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/map_plain.svg"></Image>
              <p>{cities} Cities</p>
            </div>
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/globe.svg"></Image>
              <p>{countries} Countries </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="line-through opacity-50 font-bold text-xl">
              {currency}
              {old_price}
            </span>
            <span className="text-right">
              <span className="text-xl font-bold">
                From {currency}
                {new_price}
              </span>{' '}
              <br />
              <span className="text-md text-red font-bold">
                You Save {currency}
                {old_price - new_price}
              </span>
            </span>
          </div>
          <Button text="View Tour" varient="primary" />
        </div>
      </div>
    </Link>
  )
}

const DealsSection = ({
  data: { tagline, title, deals, _type },
  locale,
}: PropsWithLocale<DealSectionProps>) => {
  return (
    <Container className="px-10 py-10  text-black bg-white">
      <div
        className={_type === ('featured_tours_section' as any) ? 'flex flex-col items-center' : ''}
      >
        <h2 className="text-blue text-base font-medium">{tagline?.en}</h2>
        <h4 className="text-3xl font-bold">{title?.en}</h4>
        <hr className="lg:w-1/12 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2" />
      </div>

      <Swiper className={'gap-4'} length={deals?.length} scrollCount={2}>
        {deals?.map((({ tour }: { tour: SanityTourPage }) => (
          <TourCard
            title={localizedString(tour?.hero_section?.title, locale)}
            image={{
              src: (tour?.hero_section?.image && urlFor(tour?.hero_section?.image)) || '',
              alt: localizedString(tour?.hero_section?.title, locale) || '',
            }}
            href={tour?.slug ? '/tours/' + tour.slug.current : ''}
            duration={localizedString(tour?.overview_card?.duration, locale)}
            currency={localizedString(tour?.overview_card?.price?.currency_symbol, locale)}
            cities={tour.overview_card?.cities}
            old_price={localizedNumber(tour.overview_card?.price?.initial_price, locale)}
            new_price={localizedNumber(tour.overview_card?.price?.discounted_price, locale)}
          />
        )) as any)}
      </Swiper>
    </Container>
  )
}

export default DealsSection
