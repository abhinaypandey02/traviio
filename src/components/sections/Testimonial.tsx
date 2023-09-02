import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';
import { urlFor } from '@/sanity/client'
import Image from 'next/image'
import ReactStars from 'react-stars'

export type TestimonialSectionProps = {
    data: TestimonialSectionProps
}


const RatingCard = (
    {title,review,country,name,date,star,varient}:any
  ) => {
   
    return (
      <div className={varient==1?'w-full':'w-full rounded-2xl  border-gray  px-5 py-2 shadow-xl'}>
         <ReactStars
          count={5} onChange={()=>{}} value={star} size={24} color2={'#ffd700'} />
          <h3 className='text-lg font-medium'>{title.substring(0, 33)}...</h3>
          <h5 className='text-base font-medium my-2 opacity-60'>
            {review.substring(0, 190)}...
          </h5>
          <div className='flex gap-x-3 my-4'>
            <div>
              <Image src={urlFor(country)} 
                  width={40}  height={40} alt="" style={{borderRadius:"10px"}} />
              </div>
            <div className='ml-2 '>
              <h6 className='font-semibold'>{name}</h6>
              <h6 className='text-sm opacity-60'>{date}</h6>
            </div>
          </div>
      </div>
    )
  }

const Testimonial = (props:TestimonialSectionProps) => {
   
  const dataa  = props.data;
  console.log(dataa)

  return (
    <div className='w-full bg-[#F2FAFF]  text-black px-10 py-10 lg:flex items-center gap-x-10 bg-primary'>
            <div className='lg:w-1/5 w-full'>
                <h3 className='font-semibold text-4xl'>{dataa?.title?.en.substring(0, 17)}</h3>
                <h3 className='font-semibold text-4xl my-1 text-blue'>{dataa?.title?.en.substring(17)}</h3>
                <h5 className='text-lg my-5 opacity-60'>{dataa?.subtitle?.en}</h5>
                <Image src={urlFor(dataa?.image)} 
                  width={240}  height={73} alt="" style={{borderRadius:"10px"}} />
            </div>
            
            <div className='w-3/4 hidden lg:block'>
                <Swiper navigation={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    modules={[FreeMode, Navigation]} freeMode={true} pagination={{
                        clickable: true,
                    }} className="mySwiper">
                   

                    {
                        dataa?.testimonials?.map((item,index)=>{
                            return (
                                <SwiperSlide>
                                <RatingCard
                                    title={item?.title?.en}
                                    name={item?.name?.en}
                                    star={item?.rating}
                                    review={item?.text?.en}
                                    country={item?.avatar}
                                    date={item?.time?.en}
                                    varient={1}
                                />
                                 </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
            <div className='w-full lg:hidden block'>
                <Swiper navigation={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    modules={[FreeMode, Navigation]} freeMode={true} pagination={{
                        clickable: true,
                    }} className="mySwiper">
                    {
                        dataa?.testimonials?.map((item,index)=>{
                            return (
                                <SwiperSlide>
                                <RatingCard
                                    title={item?.title?.en}
                                    name={item?.name?.en}
                                    star={item?.rating}
                                    review={item?.text?.en}
                                    country={item?.avatar}
                                    date={item?.time?.en}
                                    varient={1}
                                />
                                 </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
  )
}

export default Testimonial
