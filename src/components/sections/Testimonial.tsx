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
  } = props

  return (
    <div className="w-full bg-[#F2FAFF]  text-black py-[30px]  relative">
      <Container className={'lg:flex items-center gap-x-10'}>
        <div className="lg:max-w-xs shrink-0 w-full">
          {/* <h3 className='font-semibold text-4xl'>{title?.en}</h3> */}
          <h3 className=" text-[40px] leading-tight -tracking-[1.2px] font-bold">
            {localizedString(title, props.locale)}
          </h3>
          <h5 className="text-lg mt-3 opacity-60">{localizedString(subtitle, props.locale)}</h5>
          <Image
            src={image ? urlFor(image) : ''}
            width={260}
            height={73}
            alt=""
            style={{ borderRadius: '10px' }}
            className={'mt-[38px]'}
          />
        </div>
        <div className=" hidden lg:block">
          <Swiper scrollCount={2} className={'gap-12'} length={testimonials?.length}>
            {testimonials?.map((item, index: any) => {
              return (
                <div key={index} className={'w-[284px]'}>
                  <div className="flex gap-x-0.5 mb-1.5">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <h3 className=" mb-1 font-bold">{localizedString(item.title, props.locale)}</h3>
                  <h5 className="text-sm font-medium opacity-60 leading-[22px] max-w-[273px]">
                    {localizedString(item.text, props.locale)}
                  </h5>
                  <div className="flex gap-x-3 mt-4">
                    <div>
                      <Image alt={''} width={38} height={38} src={urlFor((item as any)?.avatar)} />
                    </div>
                    <div className="">
                      <h6 className="font-bold text-sm leading-[22px]">
                        {localizedString(item.name, props.locale)}
                      </h6>
                      <h6 className="text-xs leading-[20px] text-gray">
                        {localizedString(item.time, props.locale)}
                      </h6>
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
          className="absolute left-0 -bottom-[250px]"
          alt=""
        ></Image>
      </Container>
    </div>
  )
}

export default Testimonial
