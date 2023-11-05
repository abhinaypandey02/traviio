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
    <Link className={'flex-shrink-0 max-w-[250px] md:max-w-[302px]'} href={href}>
      <div className="bg-white relative h-min shadow-md hover:shadow-sm transition-all rounded-2xl cursor-pointer">
        <span className="bg-red absolute m-3 right-0 px-3 py-1 leading-[20px] text-white font-bold text-[10px] md:text-xs rounded-full">
          Hot Deal
        </span>
        <Image
          width={302}
          height={100}
          alt={image.alt}
          className="rounded-t-2xl h-[180px] md:h-[220px]"
          src={image.src}
        />
        <div className="p-4">
          <h3 className="text-base md:text-xl font-bold leading-[24px] md:leading-[28px]">
            {process.env.NEXT_PUBLIC_DEVELOPMENT ? "Safari Falls: Cape's Exotic Adventure" : title}
          </h3>
          <div className="flex mt-3 justify-between">
            <div className="text-xs md:text-sm  items-center font-medium md:font-bold leading-none md:leading-[22px] flex gap-1.5">
              <Image
                height={100}
                width={100}
                alt=""
                src="/calendar.svg"
                className="h-4 w-4 md:h-[18px] md:w-[18px]"
              ></Image>
              <p>{duration}</p>
            </div>
            <div className="text-xs md:text-sm  items-center font-medium md:font-bold leading-none md:leading-[22px] flex gap-1.5">
              <Image
                height={100}
                width={100}
                alt=""
                src="/map_plain.svg"
                className="h-4 w-4 md:h-[18px] md:w-[18px]"
              ></Image>
              <p>{cities} Cities</p>
            </div>
            <div className="text-xs md:text-sm  items-center font-medium md:font-bold leading-none md:leading-[22px] flex gap-1.5">
              <Image
                height={100}
                width={100}
                alt=""
                src="/globe.svg"
                className="h-4 w-4 md:h-[18px] md:w-[18px]"
              ></Image>
              <p>{countries} Countries </p>
            </div>
          </div>
          <div className="mt-6  flex justify-between items-start">
            <div className="line-through opacity-50 font-bold  text-sm md:text-xl leading-[20px] md:leading-[28px]">
              {currency}
              {old_price}
            </div>

            <div className="text-right">
              <div className="text-base md:text-lg font-bold md:font-black leading-[20px] md:leading-[28px]">
                From {currency}
                {new_price}
              </div>
              <div className="text-[10px] md:text-xs text-red font-bold leading-[20px] md:leading-[28px]">
                You Save {currency}
                {old_price - new_price}
              </div>
            </div>
          </div>
          <Button
            className={'!mt-3 !mb-0 !py-2.5 !px-7 !leading-[22px]'}
            text="View Tour"
            varient="primary"
          />
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
    <Container className="pt-[68px] pb-[72px]  text-black bg-white smd:mr-0 md:pxs-0 ws-[100vw] max-ws-[1440px]">
      <div
        className={_type === ('featured_tours_section' as any) ? 'flex flex-col items-center' : ''}
      >
        <h2 className="text-blue text-xs md:text-base  font-medium uppercase leading-tight md:leading-normal">
          {tagline?.en}
        </h2>

        <h4 className="text-[24px] md:text-[40px] leading-[32px] md:leading-tight  -tracking-[1.2px] mt-3 w-fit  font-bold">
          {title?.en}
          <hr className="w-1/2 text-yellow  bg-yellow  rounded-full mt-2.5 border-t-2 border-b" />
        </h4>
      </div>
      <div className=" h-fit  mt-12  ">
        {/* <div className="absolute hidden md:block h-full bg-white opacity-70  right-0 z-30  w-[4.5%] "></div> */}
        <Swiper className={'gap-6 pb-3 '} length={deals?.length} scrollCount={4}>
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
      </div>
    </Container>
  )
}

export default DealsSection
