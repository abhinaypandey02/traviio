import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
// import { FreeMode, Navigation } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
import { urlFor } from '@/sanity/client'
import { SanityArticle, SanityFeaturedBlogsSection } from '@/sanity/types'
import DateFormat from '@/utils/utils'

import Container from '@/components/Container'
import Swiper from '@/components/Swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import BlogDetailCard from '../molecule/BlogDetailCard'

export type BlogSectionProps = {
  data: SanityFeaturedBlogsSection
}

export type BlogCardProps = {
  blog: SanityArticle
}

const BlogCard = ({ blog, locale }: PropsWithLocale<BlogCardProps>) => {
  return (
    blog && (
      <Link className={'flex-shrink-0 w-[410px]'} href={blog?.slug ? blog?.slug.current : ''}>
        <div className=" w-full ">
          <div className={' h-[460px] w-full relative rounded-3xl overflow-hidden'}>
            {blog?.cover_image && (
              <Image
                width={410}
                height={460}
                className=" absolute h-full  object-cover w-full "
                src={urlFor(blog?.cover_image)}
                alt="w"
              />
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-xl max-w-sm leading-[1.6] font-medium ">
              {process.env.NEXT_PUBLIC_DEVELOPMENT
                ? '10 Indonesian Destinations you should visit in this year'
                : localizedString(blog?.title, locale)}
            </h3>
            <h4 className="mt-2 text-xs leading-[20px] text-gray ">{`By ${localizedString(
              blog?.author,
              locale
            )} ${blog?._updatedAt ? 'on ' + DateFormat(new Date(blog?._updatedAt)) : ''}`}</h4>
          </div>
        </div>
      </Link>
    )
  )
}

const BlogSection = (props: PropsWithLocale<BlogSectionProps>) => {
  const {
    data: { tagline, title, featured_blogs },
  } = props
  return (
    <Container className="pb-20 pt-[84px]  bg-white text-darkblue">
      <h2 className="text-blue font-medium text-center">
        {localizedString(tagline, props.locale)}
      </h2>
      <h4 className="text-2xl mt-3 -tracking-[1.2px] mb-12 w-fit mx-auto md:text-[40px] font-bold md:leading-tight  text-center">
        {localizedString(title, props.locale)}
        <hr className="w-full mt-[9px] text-yellow bg-yellow  rounded-full border-t border-b-2 " />
      </h4>
      <div className=" lg:block hidden ">
        <Swiper className={'gap-6'} length={featured_blogs?.length} scrollCount={2}>
          {featured_blogs?.map((blog: any) => (
            <>
              {/* {JSON.stringify({blog})} */}
              {/* <BlogDetailCard
                country={localizedString(blog.destination?.name)}
                title={localizedString(blog.title)}
                date={localizedString(blog.time)}
                image={urlFor(blog.cover_image)}
                excerpt={localizedString(blog.introduction)}
                link={blog.slug ? blog.slug.current : ''}
                author={localizedString(blog.author)}
              /> */}
              <BlogCard blog={blog} locale={props?.locale} />
            </>
          ))}
        </Swiper>
      </div>
    </Container>
  )
}

export default BlogSection
