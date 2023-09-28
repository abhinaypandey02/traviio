import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// import { FreeMode, Navigation } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
import { urlFor } from '@/sanity/client'
import { SanityArticle, SanityFeaturedBlogsSection } from '@/sanity/types'
import DateFormat from '@/utils/utils'

import Container from '@/components/Container'
import Swiper from '@/components/Swiper'

import 'swiper/css'
import 'swiper/css/navigation'

export type BlogSectionProps = {
  data: SanityFeaturedBlogsSection
}

export type BlogCardProps = {
  blog: SanityArticle
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    blog && (
      <Link className={'flex-shrink-0'} href={blog?.slug ? blog?.slug.current : ''}>
        <div className=" h-fit w-full">
          {blog?.cover_image && (
            <Image
              width={410}
              height={460}
              className=" h-[460px] rounded-3xl overflow-hidden object-cover w-full "
              src={urlFor(blog?.cover_image)}
              alt="w"
            />
          )}
          <div className="my-[18px]">
            <h3 className="mt-2 font-medium ">{blog?.title?.en}</h3>
            <h4 className="opacity-60 my-1 text-sm ">{`By ${blog?.author} ${
              blog?._updatedAt ? 'on ' + DateFormat(new Date(blog?._updatedAt)) : ''
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
  return (
    <Container className=" py-10  bg-white text-black">
      <div className="my-[48px]">
        <h2 className="text-blue text-base font-medium text-center">{tagline?.en}</h2>
        <h4 className="text-darkblue text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[50px]  text-center">
          {title?.en}
        </h4>
        <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2 " />
      </div>
      <div className="py-4 lg:block hidden ">
        <Swiper className={'gap-6'} length={featured_blogs?.length} scrollCount={2}>
          {featured_blogs?.map((blog) => <BlogCard blog={blog} />)}
        </Swiper>
      </div>
    </Container>
  )
}

export default BlogSection
