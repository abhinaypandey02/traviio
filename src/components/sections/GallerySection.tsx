import React from 'react'
import Image from 'next/image'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { urlFor } from '@/sanity/client'

import { SanityGallerySection, SanityImage } from '../../sanity/types'

import 'swiper/css'
import 'swiper/css/navigation'

export type GallerySectionProps = {
  data: SanityGallerySection
}
const GallerySection = (props: GallerySectionProps) => {
  const {
    data: { title, subtitle, images },
  } = props

  return (
    <div className="pt-10 bg-[#F2FAFF] text-black">
      <h3 className="text-3xl font-[500] text-center">{title?.en}</h3>
      <h4 className="text-lg my-2 opacity-60 font-[500] text-center">{subtitle?.en}</h4>

      <div className="mx-3 hidden lg:block">
        <Swiper
          navigation={true}
          slidesPerView={3}
          spaceBetween={0}
          modules={[FreeMode, Navigation]}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex gap-x-5">
              <Image
                src={images ? (images[0] ? urlFor(images[0]) : '') : ''}
                width={320}
                height={80}
                alt=""
                style={{ borderRadius: '10px' }}
              />
              <div className="flex flex-col justify-between gap-y-2">
                <Image
                  src={images ? (images[1] ? urlFor(images[1]) : '') : ''}
                  width={160}
                  height={50}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
                <Image
                  src={images ? (images[2] ? urlFor(images[2]) : '') : ''}
                  width={160}
                  height={60}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex gap-x-5">
              <Image
                src={images ? (images[4] ? urlFor(images[4]) : '') : ''}
                width={300}
                height={70}
                alt=""
                style={{ borderRadius: '10px' }}
              />
              <Image
                src={images ? (images[5] ? urlFor(images[5]) : '') : ''}
                width={200}
                height={60}
                alt=""
                style={{ borderRadius: '10px' }}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex gap-x-5">
              <div className="flex flex-col justify-between gap-y-2">
                <Image
                  src={images ? (images[3] ? urlFor(images[3]) : '') : ''}
                  width={160}
                  height={40}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
                <Image
                  src={images ? (images[6] ? urlFor(images[6]) : '') : ''}
                  width={160}
                  height={40}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="flex flex-col justify-between gap-y-2">
                <Image
                  src={images ? (images[7] ? urlFor(images[7]) : '') : ''}
                  width={160}
                  height={40}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="mx-3 lg:hidden block ">
        <Swiper
          navigation={true}
          slidesPerView={1}
          spaceBetween={0}
          modules={[FreeMode, Navigation]}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex gap-x-5">
              <Image
                src={images ? (images[0] ? urlFor(images[0]) : '') : ''}
                width={320}
                height={80}
                alt=""
                style={{ borderRadius: '10px' }}
              />
              <div className="flex flex-col justify-between gap-y-2">
                <Image
                  src={images ? (images[1] ? urlFor(images[1]) : '') : ''}
                  width={160}
                  height={50}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
                <Image
                  src={images ? (images[2] ? urlFor(images[2]) : '') : ''}
                  width={160}
                  height={60}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex gap-x-5">
              <Image
                src={images ? (images[4] ? urlFor(images[4]) : '') : ''}
                width={200}
                height={60}
                alt=""
                style={{ borderRadius: '10px' }}
              />
              <Image
                src={images ? (images[5] ? urlFor(images[5]) : '') : ''}
                width={200}
                height={60}
                alt=""
                style={{ borderRadius: '10px' }}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex gap-x-5">
              <div className="flex flex-col justify-between gap-y-2">
                <Image
                  src={images ? (images[3] ? urlFor(images[3]) : '') : ''}
                  width={160}
                  height={40}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
                <Image
                  src={images ? (images[6] ? urlFor(images[6]) : '') : ''}
                  width={160}
                  height={40}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="flex flex-col justify-between gap-y-2">
                <Image
                  src={images ? (images[7] ? urlFor(images[7]) : '') : ''}
                  width={160}
                  height={40}
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default GallerySection
