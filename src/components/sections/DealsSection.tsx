import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { urlFor } from '@/sanity/client'
import { SanityDeal, SanityDealsSection, SanityLocaleString, SanityTourPage } from '@/sanity/types'

import Button from '../buttons/Button'

import 'swiper/css'
import 'swiper/css/navigation'

export type DealSectionProps = {
  data: SanityDealsSection
}

const TravelCard = (props: { props: SanityDeal }) => {

  let data = props?.props
  return (
    <Link href={data?.tour?.slug ? '/destinations' + data.tour.slug.current : ''}>
      <div className="bg-white h-fit my-5 shadow-md hover:shadow-sm transition-all rounded-2xl cursor-pointer">
        <span className="bg-red absolute my-2 mx-2 right-0 px-2 py-1 text-white font-bold text-sm rounded-full">
          Hot Deal
        </span>
        <img className="rounded-t-2xl" src={urlFor(data?.tour?.hero_section?.image)} />
        <div className="px-4 py-2">
          <h3 className="text-xl font-medium">{data?.tour?.hero_section?.title?.en}</h3>
          <div className="flex px-1 py-2 justify-between">
            <div className="text-sm flex gap-2">
              <Image height={18} width={18} alt="" src="/calendar.svg"></Image>
              <p>{data?.tour?.overview_card?.duration}</p>
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

const DealsSection = (props: DealSectionProps) => {
  const {
    data: { tagline, title, deals },
  } = props
  const slides = deals?.map((props) => {
    console.log(props)
    //@ts-ignore
    return <TravelCard props={props} />
  })
  return (
    <div className="px-10 py-10  text-black bg-white">
      <h2 className="text-blue text-base font-medium">{tagline?.en}</h2>
      <h4 className="text-3xl font-medium ">{title?.en}</h4>
      <hr className="lg:w-1/12 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2" />
      <div className="py-4 lg:block hidden ">
        <Swiper
          navigation={true}
          slidesPerView={4}
          spaceBetween={30}
          modules={[FreeMode, Navigation]}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {slides?.map((slide, index) => {
            return <SwiperSlide key={index}>{slide}</SwiperSlide>
          })}
        </Swiper>
      </div>

      <div className="py-4 lg:hidden block ">
        <Swiper
          navigation={true}
          slidesPerView={1}
          spaceBetween={30}
          modules={[FreeMode, Navigation]}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {slides?.map((slide, index) => {
            return <SwiperSlide key={index}>{slide}</SwiperSlide>
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default DealsSection
