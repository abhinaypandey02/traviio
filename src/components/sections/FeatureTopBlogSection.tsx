import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityFeaturedPlaceBlogsSection } from '@/sanity/types'

import Container from '../Container'

export type SanityFeaturedBlogs = {
  data: SanityFeaturedPlaceBlogsSection
}

const FeatureTopBlogSection = (props: PropsWithLocale<SanityFeaturedBlogs>) => {
  const {
    data: { cards },
  } = props
  return (
    <Container>
      <div className="  md:py-10 py-5">
        <div className="mb-[30px] my-10 md:mb-12 flex flex-col lg:items-center items-start">
          <p className="text-blue text-xs md:text-base  font-medium uppercase leading-tight md:leading-normal">
            EXPLORE COUNTRIES
          </p>

          <h2 className="text-[24px] flex flex-col relative justify-start items-start md:text-[40px] leading-[32px] md:leading-tight  -tracking-[1.2px] mt-2 md:mt-3  w-fit  font-bold">
            Travel Inspiration by Destination
            <hr className="w-1/3 mx-auto lg:relative absolute left-0 -bottom-2 text-yellow  bg-yellow  rounded-full mt-2.5 border-b-2" />
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 lg:gap-7">
          {cards?.map((card, i) => (
            <Link
              href={'/blogs' + card.slug?.current}
              className={
                'bg-red h-[150px] lg:h-[224px] relative rounded-2xl overflow-hidden lg:' +
                ((i + 1) % 3 === Math.floor(i / 3) ? 'col-span-2' : '')
              }
            >
              <div
                className={
                  'absolute bottom-2.5 font-bold lg:text-base text-xs text-white left-3 bg-blue rounded-2xl px-4 py-1.5'
                }
              >
                {localizedString(card?.name, props.locale)}
              </div>
              {card.meta_data?.meta_image && (
                <Image
                  src={urlFor(card.meta_data?.meta_image)}
                  className={'w-full h-full object-cover'}
                  height={224}
                  width={300}
                  alt={localizedString(card.meta_data?.meta_title, props.locale)}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default FeatureTopBlogSection
