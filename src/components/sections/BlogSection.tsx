import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { SanityFeaturedBlogsSection } from '@/sanity/types'
import { Navigation, FreeMode } from 'swiper/modules';




export type BlogSectionProps = {
  data: SanityFeaturedBlogsSection
}

const BlogCard = () => {
  return (
    <div className=' h-fit  w-full'>
      <img 
       className='  w-full rounded-lg'
       src="https://media.istockphoto.com/id/903877840/photo/the-crowd-and-vehicles-in-front-of-hawa-mahal.jpg?s=612x612&w=0&k=20&c=OB7q3UQsf0vpcno_6-6WLFhp3Ugota3B5IH3WdFYhUY=" alt="" />
       <h3 className='mt-2 font-medium'>The most interesting historical monuments in Jaipur</h3>
       <h4 className='opacity-60 my-1 text-sm '>By deep on 16 August</h4>
    </div>
  )
}




const BlogSection = (props:BlogSectionProps) => {
  const { data: {tagline, title} } = props;
  return (
    <div className='lg:px-20 px-10 py-10  bg-white text-black'>
    <h2 className='text-blue text-base font-medium text-center'>{tagline?.en}</h2>
    <h4 className='text-3xl font-medium text-center'>{title?.en}</h4>
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
