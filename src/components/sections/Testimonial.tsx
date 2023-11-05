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
    <div className="w-full bg-[#F2FAFF]  text-black py-[30px]  md:h-full relative">
      <Container className={'lg:flex items-center gap-x-10 '}>
        <div className="lg:max-w-xs shrink-0 w-full text-center md:text-start">
          {/* <h3 className='font-semibold text-4xl'>{title?.en}</h3> */}
          {/* <div class="w-[335px] text-center text-sky-400 text-xl font-bold font-['Satoshi Variable'] leading-[30px]">Hear it from our Happy travelers</div> */}
          <h3 className=" text-xl  md:text-[40px] leading-[30px] md:leading-tight -tracking-[1.2px] font-bold">
            {/* <div class="w-[335px] text-center text-gray-500 text-sm font-medium font-['Satoshi Variable'] leading-tight">Adored by Countless Explorers of Egypt, Dubai, Saudi Arabia, Turkey, and Israel</div> */}
            {/* .. */}
            {/* <div class="w-80 text-gray-500 text-lg font-normal font-['Satoshi Variable'] leading-7">Adored by Countless Explorers of Egypt, Dubai, Saudi Arabia, Turkey, and Israel</div> */}
            <span className="text-blue">{title?.en?.substring(0, 16)}</span>
            {title?.en?.substring(16)}
          </h3>
          <h5 className="text-sm md:text-lg mt-3 opacity-60">
            {localizedString(subtitle, props.locale)}
          </h5>
          <Image
            src={image ? urlFor(image) : ''}
            width={260}
            height={73}
            alt=""
            style={{ borderRadius: '10px' }}
            className={'my-[30px] md:mt-[38px] md:p h-[160px] md:h-full w-full '}
          />
        </div>
        <div className="overflow-x-none md:overflow-hidden nlg:block h-full  pb-11 md:pb-0 ">
          <Swiper
            scrollCount={2}
            className={'gap-[40px] md:gap-[48px]  '}
            length={testimonials?.length}
          >
            {testimonials?.map((item, index: any) => {
              return (
                <div key={index} className={'w-[284px] shrink-0 '}>
                  <div className="flex gap-x-0.5 mb-1.5">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>

                  <h3 className=" mb-1 font-bold text-base leading-normal">
                    {localizedString(item.title, props.locale)}
                  </h3>
                  {/* <div class="w-[280px] text-gray-500 text-xs font-normal font-['Satoshi Variable'] leading-tight">We had an unforgettable stay with Michelle & Michael. Everything was perfect and even better than the pictures, better than the pictures.</div> */}
                  <h5 className="text-xs md:text-sm font-normal md:font-medium opacity-60 leading-tight md:leading-[22px] max-w-[273px]">
                    {localizedString(item.text, props.locale)}
                  </h5>
                  <div className="flex gap-x-3 mt-4  items-center">
                    <div>
                      <Image alt={''} width={38} height={38} src={urlFor((item as any)?.avatar)} />
                    </div>
                    <div className="gap-1 md:gap-0">
                      {/* <div class="text-slate-900 text-xs font-bold font-['Satoshi Variable'] leading-tight">Andrzej Przybylski</div> */}
                      <h6 className="font-bold text-xs md:text-sm  leading-tight md:leading-[22px]">
                        {localizedString(item?.name, props.locale)}
                      </h6>

                      <h6 className="text-[10px] md:text-xs font-normal leading-3 md:leading-[20px] text-gray">
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
          className="absolute -left-0 md:-left-5 h-[200px] border w-[300px] md:h-[300px] md:w-[400px] -bottom-[90px] md:-bottom-[250px]"
          alt=""
        ></Image>
      </Container>
    </div>
  )
}

export default Testimonial
