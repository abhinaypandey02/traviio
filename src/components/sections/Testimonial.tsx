import React from 'react'
import Image from 'next/image'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { urlFor } from '@/sanity/client'
import { SanityTestimonialSection } from '@/sanity/types'

import plane from '../../../public/plane.svg'

import 'swiper/css'
import 'swiper/css/navigation'
// import ReactStars from 'react-stars'

export type TestimonialSectionProps = {
  data: SanityTestimonialSection
}

const Testimonial = (props: TestimonialSectionProps) => {
  const {
    data: { title, subtitle, image, testimonials },
  } = props

  return (
    <div className="w-full bg-[#F2FAFF]  text-black px-10 py-10 lg:flex items-center gap-x-10 relative">
      <div className="lg:w-1/5 w-full">
        {/* <h3 className='font-semibold text-4xl'>{title?.en}</h3> */}
        <h3 className=" text-[36px] font-[700]">{title?.en?.substring(0, 17)}</h3>
        <h3 className=" text-[36px]  font-[700] text-blue">{title?.en?.substring(17)}</h3>
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
                      <h3 className="text-lg font-[700]">{item?.title?.en}</h3>
                      <h5 className="text-base font-[500] my-2 opacity-60">{item?.text?.en}</h5>
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
      <Image
        src="/plane.svg"
        height={200}
        width={200}
        className="absolute left-0 -bottom-[250px]"
        alt=""
      ></Image>
    </div>
  )
}

export default Testimonial
