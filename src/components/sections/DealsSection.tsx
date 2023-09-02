import { SanityDealsSection } from '@/sanity/types'
import React from 'react'
import Button from '../buttons/Button'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';


export type DealSectionProps = {
  data: SanityDealsSection
}

const TravelCard = () => {
    
    return (
      <div className='bg-white h-fit  shadow-2xl rounded-2xl cursor-pointer'>
          <span className='bg-red absolute my-2 mx-2 right-0 px-2 py-1 text-white font-bold text-sm rounded-full'>Hot Deal</span>
        <img 
        
        className="rounded-t-2xl"
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww&w=1000&q=80"
        />
      <div className='px-4 py-2'>
         <h3 className='text-xl font-medium'>Safari Falls: Cape's Exoctic Adventure</h3>
         <div className='flex px-1 py-2 justify-between'> 
            <span className='text-sm'>11 Days</span>
            <span className='text-sm'>5 Cities</span>
            <span className='text-sm'>2 Countries</span>
         </div>
         <div className='mt-4 flex justify-between'>
              <span className='line-through opacity-50 font-bold text-lg'>&#x24;3,715</span>
              <span className='text-right'>
                  <span className='text-lg font-bold'>From &#x24;3,394</span> <br />
                  <span className='text-sm text-red font-bold'>You Save &#x24;321</span>
              </span>
         </div>
          <Button text="View Trip"  varient="primary"/>
      </div>
      </div>
    )
  }

  
const DealsSection = (props:DealSectionProps) => {
  const { data: {tagline, title} } = props;
  return (
    <div className='px-10 py-10  text-black bg-white'>
    <h2 className='text-blue text-base font-medium'>{tagline?.en}</h2>
    <h4 className='text-3xl font-medium '>{title?.en}</h4>
    <hr className='lg:w-1/12 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2' />
    <div className='py-4 lg:block hidden '>
        <Swiper navigation={true}
            slidesPerView={4}
            spaceBetween={30}
            modules={[FreeMode, Navigation]} freeMode={true} pagination={{
                clickable: true,
            }} className="mySwiper">
        <SwiperSlide><TravelCard/></SwiperSlide>
        <SwiperSlide><TravelCard/></SwiperSlide>
        <SwiperSlide><TravelCard/></SwiperSlide>
        <SwiperSlide><TravelCard/></SwiperSlide>
        <SwiperSlide><TravelCard/></SwiperSlide>
        </Swiper>
 </div>


    <div className='py-4 lg:hidden block '>
        <Swiper navigation={true}
            slidesPerView={1}
            spaceBetween={30}
            modules={[FreeMode, Navigation]} freeMode={true} pagination={{
                clickable: true,
            }} className="mySwiper">
                          <SwiperSlide><TravelCard/></SwiperSlide>
                          <SwiperSlide><TravelCard/></SwiperSlide>
                          <SwiperSlide><TravelCard/></SwiperSlide>
                          <SwiperSlide><TravelCard/></SwiperSlide>
                          <SwiperSlide><TravelCard/></SwiperSlide>
                          <SwiperSlide><TravelCard/></SwiperSlide>

        </Swiper>
    </div>
</div>
  )
}

export default DealsSection
