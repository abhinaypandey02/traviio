import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { urlFor } from '@/sanity/client'
import Container from '@/components/Container'
import Swiper from '@/components/Swiper'
import { SanityGallerySection, SanityImage } from '../../sanity/types'
import 'swiper/css'
import 'swiper/css/navigation'
export type GallerySectionProps = {
  data: SanityGallerySection
}
const GallerySection = (props: GallerySectionProps) => {
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
    <div className="pt-10 bg-[#F2FAFF] text-black">
      <Container>
        <h3 className="text-[40px] leading-tight -tracking-[1.2px] font-bold text-center">
          {title?.en}
        </h3>
        <div className="text-lg mt-1.5 text-gray text-center leading-[28px]">
          {subtitle?.en.substring(0, 5)}
          <span className='text-blue opacity-100'>
            {subtitle?.en.substring(5, 32)}
          </span>
          {subtitle?.en.substring(32)}
        </div>
        <div className={'mt-2 mb-[30px]'}>
          <Image
            width={80}
            height={40}
            src={'/small-logo.svg'}
            alt={'small logo'}
            className={'mx-auto'}
          />
        </div>
        <Swiper className="gap-x-2.5 !pb-0">
          {imgs?.map((image, i) =>
            i % 2 == 0 ? (
              <div className={'min-w-[320px] h-[320px] overflow-hidden rounded-lg'}>
                <PhotoProvider>
                <PhotoView key={i} src={urlFor(image[0])}>

                <Image
                  src={urlFor(image[0])}
                  width={320}
                  height={320}
                  alt={'image'}
                  className={'w-full h-full flex-shrink-0 object-cover'}
                  />
                </PhotoView>
                </PhotoProvider>
              </div>

            ) : (
              <div className={'min-w-[160px] h-[320px] flex flex-col gap-2.5'}>
                <div className={'h-[160px] w-[160px] overflow-hidden rounded-lg'}>
                <PhotoProvider>
                  <PhotoView key={i} src={urlFor(image[0])}>
                  <Image
                    src={urlFor(image[0])}
                    width={160}
                    height={160}
                    alt={'image'}
                    className={'object-cover'}
                    />
                  </PhotoView> 
                 </PhotoProvider>
                </div>
                {image[1] && (
                  <div className={'h-[160px] w-[160px] overflow-hidden rounded-lg'}>
                       <PhotoProvider>
                       <PhotoView key={i} src={urlFor(image[1])}>
                    <Image
                      src={urlFor(image[1])}
                      width={160}
                      height={160}
                      alt={'image'}
                      className={'object-cover'}
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

export default GallerySection
