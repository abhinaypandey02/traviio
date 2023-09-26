import React from 'react'
import Image from 'next/image'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { urlFor } from '@/sanity/client'
import { SanityImageShowcase } from '@/sanity/types'

import 'swiper/css'
import 'swiper/css/navigation'

export type ImageShowCaseSectionProps = {
  data: SanityImageShowcase
}
const ImageShowCaseSection = (props: ImageShowCaseSectionProps) => {
  const {
    data: { title, images_data },
  } = props

  return (
    <div className="pt-10 text-black">
      <div className="max-w-[1280px] mx-auto">
        <div>
          <h2 className="text-black font-bold text-2xl text-c">{title?.en}</h2>
          <hr className=" w-28 my-2 text-yellow bg-yellow  rounded-full border-2" />
        </div>
        <h4 className="text-lg my-2 opacity-60 font-[500]">
          Over 200,000 satisfied travelers in 20 years of travel excellence with our local tour
          operator Promo Travel`
        </h4>
      </div>
      <div className="mx-3 hidden lg:flex gap-x-10 my-10">
        <div className="flex gap-x-10">
          <Image
            src={images_data ? (images_data[0].image ? urlFor(images_data[0].image) : '') : ''}
            width={images_data ? images_data[0]?.image_size?.width ?? 0 : 0}
            height={images_data ? images_data[0]?.image_size?.height ?? 0 : 0}
            className="object-center object-cover"
            alt=""
            style={{ borderRadius: '10px' }}
          />
          <div className="flex flex-col justify-between gap-y-2">
            <Image
              src={images_data ? (images_data[1].image ? urlFor(images_data[1].image) : '') : ''}
              width={images_data ? images_data[1]?.image_size?.width ?? 0 : 0}
              height={images_data ? images_data[1]?.image_size?.height ?? 0 : 0}
              className="object-center object-cover"
              alt=""
              style={{ borderRadius: '10px' }}
            />
            <Image
              src={images_data ? (images_data[2].image ? urlFor(images_data[2].image) : '') : ''}
              width={images_data ? images_data[2]?.image_size?.width ?? 0 : 0}
              height={images_data ? images_data[2]?.image_size?.height ?? 0 : 0}
              className="object-center object-cover"
              alt=""
              style={{ borderRadius: '10px' }}
            />
          </div>
        </div>

        <div className="flex gap-x-10">
          <Image
            src={images_data ? (images_data[4].image ? urlFor(images_data[4].image) : '') : ''}
            width={images_data ? images_data[4]?.image_size?.width ?? 0 : 0}
            height={images_data ? images_data[4]?.image_size?.height ?? 0 : 0}
            className="object-center object-cover"
            alt=""
            style={{ borderRadius: '10px' }}
          />
          <Image
            src={images_data ? (images_data[5].image ? urlFor(images_data[5].image) : '') : ''}
            width={images_data ? images_data[5]?.image_size?.width ?? 0 : 0}
            height={images_data ? images_data[5]?.image_size?.height ?? 0 : 0}
            className="object-center object-cover"
            alt=""
            style={{ borderRadius: '10px' }}
          />
        </div>

        <div className="flex gap-x-10">
          <div className="flex flex-col justify-between gap-y-2">
            <Image
              src={images_data ? (images_data[3].image ? urlFor(images_data[3].image) : '') : ''}
              width={images_data ? images_data[3]?.image_size?.width ?? 0 : 0}
              height={images_data ? images_data[3]?.image_size?.height ?? 0 : 0}
              className="object-center object-cover"
              alt=""
              style={{ borderRadius: '10px' }}
            />
            <Image
              src={images_data ? (images_data[6].image ? urlFor(images_data[6].image) : '') : ''}
              width={images_data ? images_data[6]?.image_size?.width ?? 0 : 0}
              height={images_data ? images_data[6]?.image_size?.height ?? 0 : 0}
              className="object-center object-cover"
              alt=""
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="flex flex-col justify-between gap-y-2">
            <Image
              src={images_data ? (images_data[7].image ? urlFor(images_data[7].image) : '') : ''}
              width={images_data ? images_data[7]?.image_size?.width ?? 0 : 0}
              height={images_data ? images_data[7]?.image_size?.height ?? 0 : 0}
              className="object-center object-cover"
              alt=""
              style={{ borderRadius: '10px' }}
            />
          </div>
        </div>
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
                src={images_data ? (images_data[0].image ? urlFor(images_data[0].image) : '') : ''}
                width={images_data ? images_data[0]?.image_size?.width ?? 0 : 0}
                height={images_data ? images_data[0]?.image_size?.height ?? 0 : 0}
                className="object-center object-cover"
                alt=""
                style={{ borderRadius: '10px' }}
              />
              <div className="flex flex-col justify-between gap-y-2">
                <Image
                  src={
                    images_data ? (images_data[1].image ? urlFor(images_data[1].image) : '') : ''
                  }
                  width={images_data ? images_data[1]?.image_size?.width ?? 0 : 0}
                  height={images_data ? images_data[1]?.image_size?.height ?? 0 : 0}
                  className="object-center object-cover"
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
                <Image
                  src={
                    images_data ? (images_data[2].image ? urlFor(images_data[2].image) : '') : ''
                  }
                  width={images_data ? images_data[2]?.image_size?.width ?? 0 : 0}
                  height={images_data ? images_data[2]?.image_size?.height ?? 0 : 0}
                  className="object-center object-cover"
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex gap-x-5">
              <Image
                src={images_data ? (images_data[4].image ? urlFor(images_data[4].image) : '') : ''}
                width={images_data ? images_data[4]?.image_size?.width ?? 0 : 0}
                height={images_data ? images_data[4]?.image_size?.height ?? 0 : 0}
                className="object-center object-cover"
                alt=""
                style={{ borderRadius: '10px' }}
              />
              <Image
                src={images_data ? (images_data[5].image ? urlFor(images_data[5].image) : '') : ''}
                width={images_data ? images_data[5]?.image_size?.width ?? 0 : 0}
                height={images_data ? images_data[5]?.image_size?.height ?? 0 : 0}
                className="object-center object-cover"
                alt=""
                style={{ borderRadius: '10px' }}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex gap-x-5">
              <div className="flex flex-col justify-between gap-y-2">
                <Image
                  src={
                    images_data ? (images_data[3].image ? urlFor(images_data[3].image) : '') : ''
                  }
                  width={images_data ? images_data[3]?.image_size?.width ?? 0 : 0}
                  height={images_data ? images_data[3]?.image_size?.height ?? 0 : 0}
                  className="object-center object-cover"
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
                <Image
                  src={
                    images_data ? (images_data[6].image ? urlFor(images_data[6].image) : '') : ''
                  }
                  width={images_data ? images_data[6]?.image_size?.width ?? 0 : 0}
                  height={images_data ? images_data[6]?.image_size?.height ?? 0 : 0}
                  className="object-center object-cover"
                  alt=""
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="flex flex-col justify-between gap-y-2">
                <Image
                  src={
                    images_data ? (images_data[7].image ? urlFor(images_data[7].image) : '') : ''
                  }
                  width={images_data ? images_data[7]?.image_size?.width ?? 0 : 0}
                  height={images_data ? images_data[7]?.image_size?.height ?? 0 : 0}
                  className="object-center object-cover"
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

export default ImageShowCaseSection
