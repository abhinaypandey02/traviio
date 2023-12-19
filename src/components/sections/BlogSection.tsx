import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityArticle, SanityFeaturedBlogsSection } from '@/sanity/types'
import DateFormat from '@/utils/utils'

import Container from '@/components/Container'
import Swiper from '@/components/Swiper'

import Schema from '@/components/atoms/Schema'

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
      <Link className={'flex-shrink-0 '} href={ '/blog'+blog?.slug?.current}>
        <Schema
          data={{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: localizedString(blog?.title, locale),
            image: blog?.cover_image && [urlFor(blog?.cover_image)],
            datePublished: blog?._updatedAt && new Date(blog?._updatedAt).toISOString(),
            dateModified: blog?._updatedAt && new Date(blog?._updatedAt).toISOString(),
            author: [
              {
                '@type': 'Person',
                name: localizedString(blog?.author?.name, locale),
              },
            ],
          }}
        />
        <div className=" w-full ">
          <div
            className={
              '  relative rounded-3xl overflow-hidden w-[250px] h-[280px] md:w-[410px] md:h-[460px]'
            }
          >
            {blog?.cover_image && (
              <Image
                width={410}
                height={460}
                className=" absolute h-full w-full "
                src={urlFor(blog?.cover_image)}
                alt="w"
                sizes={`
              (max-width: 640px) 100vw, 410px
            `}
              />
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-base md:text-xl max-w-[250px] md:max-w-[380px] font-bold md:font-medium leading-normal md:leading-[32px] ">
              {process.env.NEXT_PUBLIC_DEVELOPMENT
                ? '10 Indonesian Destinations you should visit in this year'
                : localizedString(blog?.title, locale)}
            </h3>

            <p className="mt-[6px] md:mt-2 text-[10px] md:text-xs font-normal leading-3 md:leading-[20px]  text-gray ">{`By ${localizedString(
              blog?.author?.name,
              locale
            )} ${blog?._updatedAt ? 'on ' + DateFormat(new Date(blog?._updatedAt)) : ''}`}</p>
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
    <Container className="pt-20 pb-[80px] lg:pt-[84px] bg-white text-darkblue">
      <header className="pb-5">
        <p className="text-blue text-xs md:text-base font-medium text-center uppercase leading-tight md:leading-normal">
          {localizedString(tagline, props.locale)}
        </p>
        <div className="text-2xl mt-2 md:mt-3 -tracking-[1.2px] mb-[30px] md:mb-12 w-fit mx-auto md:text-[40px] font-bold leading-[32px] md:leading-[50px] text-center">
          <h2>{localizedString(title, props.locale)}</h2>
          <hr className=" mt-[4px] md:mt-[12px] w-2/3 md:w-[117px] mx-auto text-yellow  bg-yellow  rounded-full border-b-2" />
        </div>
      </header>
      <div className="relative">
        <Swiper
          className={'gap-3 md:gap-6 w-screen overflow-hidden '}
          length={featured_blogs?.length}
          scrollCount={2}
        >
          {featured_blogs?.map((blog: any) => <BlogCard blog={blog} locale={props?.locale} />)}
        </Swiper>

        <div className=" absolute hidden md:block w-40 top-0 p-3 h-full z-[300] bg-gradient-to-r from-transparent  via-[rgba(255,255,255,0.2)] to-white right-0" />
      </div>
    </Container>
  )
}

export default BlogSection
