import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { PhotoProvider, PhotoView } from 'react-photo-view'

import { urlFor } from '@/sanity/client'

import Container from '@/components/Container'
import Swiper from '@/components/Swiper'

import { SanityGallerySection, SanityImage } from '../../sanity/types'

import 'react-photo-view/dist/react-photo-view.css'

import 'swiper/css'
import 'swiper/css/navigation'
export type GallerySectionProps = {
  data: SanityGallerySection
}
const TourGallerySection = (props: GallerySectionProps) => {
  const {
    data: { title, subtitle, images },
  } = props
  const imgs: any[][] = []
  if (images) {
    let single = true
    for (let i = 0; i < images.length; i++) {
      if (single) {
        imgs.push([images[i]])
      } else {
        imgs.push(images.slice(i, i + 2))
        i++
      }
      single = !single
    }
  }

  return (
    <div className="pt-5 md:pt-10 bg-[#F2FAFF] min-h-[482px] md:min-h-[522px] text-black">
      <Container>
        {/* <div className="w-[335px] text-center text-slate-900 text-2xl font-bold font-['Satoshi Variable'] leading-loose">Small Group Travel & Authentic Local Experiences</div> */}
        <h3 className="text-[24px] md:text-[40px] leading-[32px]  md:leading-tight -tracking-[1.2px] font-bold text-center">
          {title?.en}
        </h3>
        {/* <div className="w-[335px] text-center"><span style="text-gray-500 text-sm font-medium font-['Satoshi Variable'] leading-normal">Over </span><span style="text-sky-400 text-sm font-medium font-['Satoshi Variable'] leading-normal">200,000 Satisfied Travelers</span><span style="text-gray-500 text-sm font-medium font-['Satoshi Variable'] leading-normal"> in 20 years of travel excellence with our local tour operator</span></div> */}
        <div className="text-sm md:text-lg mt-[10px] md:mt-1.5  text-gray text-center md:leading-[28px] leading-[24px]">
          {subtitle?.en?.substring(0, 5)}
          <span className="text-blue opacity-100">{subtitle?.en?.substring(5, 32)}</span>
          {subtitle?.en?.substring(32)}
        </div>
        <div className={'mt-[10px] md:mt-2 mb-[30px]'}>
          <Image
            width={80}
            height={40}
            src={'/small-logo.svg'}
            alt={'small logo'}
            className={'mx-auto'}
          />
        </div>
        <Swiper className="gap-x-2.5 !pb-0 ">
          {imgs?.map((image, i) =>
            i % 2 == 0 ? (
              <div
                className={
                  'min-w-[233px] w-full h-[190px]  md:h-[320px]   md:min-w-[310px] md:max-w-[400px]  overflow-hidden rounded-lg'
                }
                // className={
                //   'min-h-[190px] md:min-h-[320px]   md:sh-[320px] overflow-hidden rounded-lg'
                // }
              >
                <PhotoProvider>
                  <PhotoView key={i} src={urlFor(image[0])}>
                    <Image
                      src={urlFor(image[0])}
                      width={320}
                      height={320}
                      alt={'image'}
                      className={'w-full h-full flex-shrink-0 object-fill '}
                    />
                  </PhotoView>
                </PhotoProvider>
              </div>
            ) : (
              <div className={'w-full  h-[190px]  md:h-[320px] flex flex-col gap-2.5 '}>
                <div
                  className={
                    'w-[94px] h-[91px] md:h-[160px] md:w-[160px] overflow-hidden rounded-lg '
                  }
                >
                  <PhotoProvider>
                    <PhotoView key={i} src={urlFor(image[0])}>
                      <Image
                        src={urlFor(image[0])}
                        width={160}
                        height={160}
                        alt={'image'}
                        className={'object-fill w-full h-full'}
                      />
                    </PhotoView>
                  </PhotoProvider>
                </div>
                {image[1] && (
                  <div
                    className={
                      'w-[94px] h-[91px] md:h-[160px] md:w-[160px] overflow-hidden rounded-lg '
                    }
                  >
                    <PhotoProvider>
                      <PhotoView key={i} src={urlFor(image[1])}>
                        <Image
                          src={urlFor(image[1])}
                          width={160}
                          height={160}
                          alt={'image'}
                          className={'object-fill w-full h-full'}
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                )}
              </div>
            )
          )}
        </Swiper>
      </Container>
    </div>
  )
}

export default TourGallerySection
