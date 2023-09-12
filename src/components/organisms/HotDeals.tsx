import React from 'react'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import TravelCard from '../molecule/TravelCard'

import 'swiper/css'
import 'swiper/css/navigation'

const HotDeals = () => {
  return (
    <div className="px-10 py-10 ">
      <h2 className="text-blue text-base font-medium">CHEAP TRIPS</h2>
      <h4 className="text-3xl font-medium ">Hot Travel Deals</h4>
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
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
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
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
          <SwiperSlide>
            <TravelCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default HotDeals
