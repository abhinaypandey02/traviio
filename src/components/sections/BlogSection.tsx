import React from 'react'
import Link from 'next/link'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { urlFor } from '@/sanity/client'
import { SanityArticle, SanityFeaturedBlogsSection } from '@/sanity/types'
import DateFormat from '@/utils/utils'

import 'swiper/css'
import 'swiper/css/navigation'

export type BlogSectionProps = {
  data: SanityFeaturedBlogsSection
}

export type BlogCardProps = {
  props: SanityArticle
}

const BlogCard = (props: BlogCardProps) => {
  return (
    props?.props && (
      <Link href={props?.props?.slug ? props?.props?.slug.current : ''}>
        <div className=" h-fit w-full">
          {props?.props?.cover_image && (
            <img className="  w-full rounded-lg" src={urlFor(props?.props?.cover_image)} alt="" />
          )}
          <div className="my-[18px]">
            <h3 className="mt-2 font-medium ">{props?.props?.title?.en}</h3>
            <h4 className="opacity-60 my-1 text-sm ">{`By ${props?.props?.author} ${
              props?.props?._updatedAt ? 'on ' + DateFormat(new Date(props?.props?._updatedAt)) : ''
            }`}</h4>
          </div>
        </div>
      </Link>
    )
  )
}

const BlogSection = (props: BlogSectionProps) => {
  const {
    data: { tagline, title, featured_blogs },
  } = props
  const slides = featured_blogs?.map((props) => {
    //@ts-ignore
    return <BlogCard props={props} />
  })
  return (
    <div className="lg:px-20 px-10 py-10  bg-white text-black">
      <div className="my-[48px]">
        <h2 className="text-blue text-base font-medium text-center">{tagline?.en}</h2>
        <h4 className="text-darkblue text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[50px]  text-center">
          {title?.en}
        </h4>
        <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2 " />
      </div>
      <div className="py-4 lg:block hidden ">
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

export default BlogSection
