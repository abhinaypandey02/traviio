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

import BlogDetailCard from '../molecule/BlogDetailCard'

import 'swiper/css'
import 'swiper/css/navigation'

export type BlogSectionProps = {
  data: SanityFeaturedBlogsSection
}

export type BlogCardProps = {
  blog: SanityArticle
}

const BlogCard = ({ blog, locale }: PropsWithLocale<BlogCardProps>) => {
  return (
    blog && (
      <Link className={'flex-shrink-0 '} href={blog?.slug ? blog?.slug.current : ''}>
        <div className=" w-full ">
          <div
            className={
              '  relative rounded-3xl overflow-hidden  w-[250px] h-[280px] md:w-[410px] md:h-[460px]'
            }
          >
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
            <h3 className="text-base  md:text-xl max-w-[250px] md:max-w-[380px] font-bold  md:font-medium  leading-normal md:leading-loose ">
              {process.env.NEXT_PUBLIC_DEVELOPMENT
                ? '10 Indonesian Destinations you should visit in this year'
                : localizedString(blog?.title, locale)}
            </h3>

            <h4 className="mt-[6px] md:mt-2 text-[10px] md:text-xs font-normal leading-3 md:leading-tight  text-gray ">{`By ${localizedString(
              blog?.author?.name,
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
    <Container className="pt-[50px] pb-[100px] md:pt-[84px] mb:pb-20   bg-white text-darkblue">
      <h2 className="text-blue text-xs md:text-base font-medium text-center uppercase leading-tight md:leading-normal">
        {localizedString(tagline, props.locale)}
      </h2>

      <h4 className="text-2xl mt-2 md:mt-3 -tracking-[1.2px] mb-[30px] md:mb-12 w-fit mx-auto md:text-[40px] font-bold  leading-loose md:leading-[50px]  text-center">
        {localizedString(title, props.locale)}
        <hr className="w-full mt-[4px] md:mt-[12px] text-yellow bg-yellow  rounded-full border-t border-b-2 " />
      </h4>

      <div>
        <Swiper
          className={'gap-3 md:gap-6 w-screen  overflow-hidden '}
          length={featured_blogs?.length}
          scrollCount={2}
        >
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
              <BlogCard blog={blog} locale={props?.locale} />
            </>
          ))}
        </Swiper>
      </div>
    </Container>
  )
}

export default BlogSection
