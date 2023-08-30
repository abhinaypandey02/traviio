import React from 'react'
import BlogCard from '../molecule/BlogCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';
const BlogSection = () => {
  return (
    <div className='lg:px-20 px-10 py-10 '>
      <h2 className='text-blue text-base font-medium text-center'>CHEAP TRIPS</h2>
      <h4 className='text-3xl font-medium text-center'>Hot Travel Deals</h4>
      <hr className='lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2' />
      <div className='py-4 lg:block hidden '>
        <Swiper navigation={true}
          slidesPerView={3}
          spaceBetween={30}
          modules={[FreeMode, Navigation]} freeMode={true} pagination={{
            clickable: true,
          }} className="mySwiper">
          <SwiperSlide><BlogCard /></SwiperSlide>
          <SwiperSlide><BlogCard /></SwiperSlide>
          <SwiperSlide><BlogCard /></SwiperSlide>
          <SwiperSlide><BlogCard /></SwiperSlide>
          <SwiperSlide><BlogCard /></SwiperSlide>
        </Swiper>
      </div>


      <div className='py-4 lg:hidden block '>
        <Swiper navigation={true}
          slidesPerView={1}
          spaceBetween={30}
          modules={[FreeMode, Navigation]} freeMode={true} pagination={{
            clickable: true,
          }} className="mySwiper">
          <SwiperSlide><BlogCard /></SwiperSlide>
          <SwiperSlide><BlogCard /></SwiperSlide>
          <SwiperSlide><BlogCard /></SwiperSlide>
          <SwiperSlide><BlogCard /></SwiperSlide>
          <SwiperSlide><BlogCard /></SwiperSlide>

        </Swiper>
      </div>
    </div>
  )
}

export default BlogSection
