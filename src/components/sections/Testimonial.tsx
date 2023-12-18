import React from 'react'
import Image from 'next/image'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
// import { FreeMode, Navigation } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
import { urlFor } from '@/sanity/client'
import { SanityTestimonialSection } from '@/sanity/types'

import Container from '@/components/Container'
import Star from '@/components/Star'
import Swiper from '@/components/Swiper'

import Schema from '@/components/atoms/Schema'

import plane from '../../../public/plane.svg'

import 'swiper/css'
import 'swiper/css/navigation'
// import ReactStars from 'react-stars'

export type TestimonialSectionProps = {
  data: SanityTestimonialSection
}

const Testimonial = (props: PropsWithLocale<TestimonialSectionProps>) => {
  const {
    data: { title, subtitle, image, testimonials },
    locale,
  } = props

  return (
    <div className="w-full bg-[#F2FAFF] !mt-[84px]   text-black py-[30px]  md:h-full relative">
      <Container
        className={'lg:flex pl-5 md:pr-0 items-center gap-x-10 '}
      >
        <div className="lg:max-w-xs shrink-0 w-full text-center md:text-start">
          {/* <h3 className='font-semibold text-4xl'>{title?.en}</h3> */}
          {/* <div class="w-[335px] text-center text-sky-400 text-xl font-bold font-['Satoshi Variable'] leading-[30px]">Hear it from our Happy travelers</div> */}
          <h2 className="text-xl md:text-[40px] leading-[30px] md:leading-tight -tracking-[1.2px] font-bold">
            {/* <div class="w-[335px] text-center text-gray-500 text-sm font-medium font-['Satoshi Variable'] leading-tight">Adored by Countless Explorers of Egypt, Dubai, Saudi Arabia, Turkey, and Israel</div> */}
            {/* .. */}
            {/* <div class="w-80 text-gray-500 text-lg font-normal font-['Satoshi Variable'] leading-7">Adored by Countless Explorers of Egypt, Dubai, Saudi Arabia, Turkey, and Israel</div> */}
            <span className="text-blue md:text-black">{localizedString(title, locale).substring(0, 16)}</span>
            <span className="text-blue">{localizedString(title, locale).substring(16)}</span>
          </h2>
          <p className="text-sm font-medium lg:font-normal md:text-lg md:leading-[28px] mt-2.5 md:mt-3 text-gray ">
            {localizedString(subtitle, props.locale)}
          </p>
          <Image
            src={image ? urlFor(image) : ''}
            width={260}
            height={73}
            alt=""
            style={{ borderRadius: '10px' }}
            className={
              'my-[30px] md:mt-[38px] h-[160px] md:h-full md:w-[260px] w-full '
            }
          />
        </div>
        <div className="overflow-x-none md:overflow-hidden pr-5    lg:block h-full  pb-11 md:pb-0 ">
          <Swiper
            scrollCount={2}
            className={'gap-[40px] md:gap-[48px] md:!mr-10  '}
            length={testimonials?.length}
          >
            {testimonials?.map((item, index: any) => {
              return (
                <div key={index} className={'w-[284px] shrink-0 '}>
                  <Schema
                    data={{
                      '@context': 'https://schema.org/',
                      '@type': 'Review',
                      itemReviewed: {
                        '@type': 'TravelAgency',
                        name: 'Traviio',
                      },
                      reviewRating: {
                        '@type': 'Rating',
                        ratingValue: '5',
                      },
                      name: localizedString(item.title, props.locale),
                      author: {
                        '@type': 'Person',
                        name: localizedString(item?.name, props.locale),
                      },
                      publisher: {
                        '@type': 'Organization',
                        name: 'Traviio',
                      },
                    }}
                  />
                  <div className="flex gap-x-0.5 mb-1.5">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>

                  <h3 className="mb-1 font-bold text-base">
                    {localizedString(item.title, props.locale)}
                  </h3>
                  {/* <div class="w-[280px] text-gray-500 text-xs font-normal font-['Satoshi Variable'] leading-tight">We had an unforgettable stay with Michelle & Michael. Everything was perfect and even better than the pictures, better than the pictures.</div> */}
                  <p className="text-xs md:text-sm font-normal text-darkblue md:font-medium  leading-[20px] md:leading-[22px] max-w-[273px]">
                    {localizedString(item.text, props.locale)}
                  </p>
                  <div className="flex gap-x-3 mt-4 items-center">
                    <div>
                      <Image alt={''} width={38} height={38} src={urlFor((item as any)?.avatar)} />
                    </div>
                    <div className="gap-1 md:gap-0">
                      {/* <div class="text-slate-900 text-xs font-bold font-['Satoshi Variable'] leading-tight">Andrzej Przybylski</div> */}
                      <div className="font-bold text-darkblue text-xs md:text-sm leading-[20px] md:leading-[22px]">
                        {localizedString(item?.name, props.locale)}
                      </div>

                      <time className="text-[10px] md:text-xs leading-3 md:leading-[20px] text-gray">
                        {localizedString(item.time, props.locale)}
                      </time>
                    </div>
                  </div>
                </div>
              )
            })}
          </Swiper>
        </div>
        <Image
          src="/plane.svg"
          height={200}
          width={200}
          className="absolute -left-0 md:-left-5 h-[200px] border w-[300px] md:h-[300px] md:w-[400px] -bottom-[90px] md:-bottom-[250px]"
          alt=""
        ></Image>
      </Container>
    </div>
  )
}

export default Testimonial
