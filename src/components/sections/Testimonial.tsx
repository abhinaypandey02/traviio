import React from 'react'
import Image from 'next/image'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { urlFor } from '@/sanity/client'
import { SanityTestimonialSection } from '@/sanity/types'

import 'swiper/css'
import 'swiper/css/navigation'
// import ReactStars from 'react-stars'

export type TestimonialSectionProps = {
  data: SanityTestimonialSection
}

const RatingCard = ({ title, review, country, name, date, star, varient }: any) => {
  return (
    <div
      className={varient == 1 ? 'w-full' : 'w-full rounded-2xl  border-gray  px-5 py-2 shadow-xl'}
    >
      <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
      <h5 className="text-base font-medium my-2 opacity-60">
        {
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        }
        ...
      </h5>
      <div className="flex gap-x-3 my-4">
        <div>
          <img
            src={
              'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
            }
            alt=""
            className="rounded-full w-12 h-12"
          />
        </div>
        <div className="ml-2 ">
          <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
          <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
        </div>
      </div>
    </div>
  )
}

const Testimonial = (props: TestimonialSectionProps) => {
  const {
    data: { title, subtitle, image, testimonials },
  } = props

  return (
    <div className="w-full bg-[#F2FAFF]  text-black px-10 py-10 lg:flex items-center gap-x-10 ">
      <div className="lg:w-1/5 w-full">
        {/* <h3 className='font-semibold text-4xl'>{title?.en}</h3> */}
        <h3 className="font-semibold text-4xl">{'Hear it from our'}</h3>
        <h3 className="font-semibold text-4xl my-1 text-blue">{'Happy Travelers'}</h3>
        <h5 className="text-lg my-5 opacity-60">{subtitle?.en}</h5>
        <Image
          src={image ? urlFor(image) : ''}
          width={260}
          height={73}
          alt=""
          style={{ borderRadius: '10px' }}
        />
      </div>

      <div className="w-3/4 hidden lg:block">
        <Swiper
          navigation={true}
          slidesPerView={3}
          spaceBetween={30}
          modules={[FreeMode, Navigation]}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {testimonials
            ? testimonials.map((item: any, index: any) => {
                return (
                  <SwiperSlide>
                    <div key={index} className={'w-full'}>
                      <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
                      <h3 className="text-lg font-medium">{item?.title?.en}</h3>
                      <h5 className="text-base font-medium my-2 opacity-60">{item?.text?.en}</h5>
                      <div className="flex gap-x-3 my-4">
                        <div>
                          <Image alt={''} width={40} height={40} src={urlFor(item?.avatar)} />
                        </div>
                        <div className="ml-2 ">
                          <h6 className="font-semibold"> {item?.name?.en}</h6>
                          <h6 className="text-sm opacity-60"> {item?.time?.en}</h6>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            : null}
        </Swiper>
      </div>
      <div className="w-full lg:hidden block">
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
          {testimonials
            ? testimonials.map((item: any, index: any) => {
                return (
                  <SwiperSlide>
                    <div key={index} className={'w-full'}>
                      <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
                      <h3 className="text-lg font-medium">{item?.title?.en}</h3>
                      <h5 className="text-base font-medium my-2 opacity-60">{item?.text?.en}</h5>
                      <div className="flex gap-x-3 my-4">
                        <div>
                          <Image alt="" width={40} height={40} src={urlFor(item?.avatar)} />
                        </div>
                        <div className="ml-2 ">
                          <h6 className="font-semibold"> {item?.name?.en}</h6>
                          <h6 className="text-sm opacity-60"> {item?.time?.en}</h6>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            : null}
        </Swiper>
      </div>
    </div>
  )
}

export default Testimonial
