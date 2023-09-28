import React from 'react'
import Image from 'next/image'

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
        <h3 className="text-3xl font-[500] text-center">{title?.en}</h3>
        <h4 className="text-lg my-2 opacity-60 font-[500] text-center">{subtitle?.en}</h4>

        <Swiper className="gap-x-2.5 my-10">
          {imgs?.map((image, i) =>
            i % 2 == 0 ? (
              <div className={'min-w-[320px] h-[320px] overflow-hidden rounded-lg'}>
                <Image
                  src={urlFor(image[0])}
                  width={320}
                  height={320}
                  alt={'image'}
                  className={'w-full h-full flex-shrink-0 object-cover'}
                />
              </div>
            ) : (
              <div className={'min-w-[160px] h-[320px] flex flex-col gap-2.5'}>
                <div className={'h-[160px] w-[160px] overflow-hidden rounded-lg'}>
                  <Image
                    src={urlFor(image[0])}
                    width={160}
                    height={160}
                    alt={'image'}
                    className={'object-cover'}
                  />
                </div>
                {image[1] && (
                  <div className={'h-[160px] w-[160px] overflow-hidden rounded-lg'}>
                    <Image
                      src={urlFor(image[1])}
                      width={160}
                      height={160}
                      alt={'image'}
                      className={'object-cover'}
                    />
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
