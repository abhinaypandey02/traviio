import React from 'react'
import Image from 'next/image'

import { LocalizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityImageHeaderSection } from '@/sanity/types'

import Container from '@/components/Container'

import Breadcrumbs from '../atoms/Breadcrumbs'

export type ImageHeaderSectionProps = {
  data: SanityImageHeaderSection
}
const ImageHeaderSection = (props: ImageHeaderSectionProps) => {
  const {
    data: { header, image, content },
  } = props
  return (
    <div>
      <div>
        <Image
          src={image ? urlFor(image) : ''}
          // style={{ width: '100%', height: '480px', objectFit: 'cover' }}
          className="h-[200px] md:h-[480px] w-full "
          width={700}
          height={73}
          objectFit="cover"
          alt=""
        />

        <h2 className="hidden md:block text-xl md:text-[56px]  text-white -translate-y-32  font-bold md:font-black text-center leading-[30px] md:leading-[72px]">
          <LocalizedString text={header} />
        </h2>
      </div>

      <Container className="px-10 text-sm md:text-[16px] translate-y-[18px]  md:-translate-y-9  font-normal opacity-80 leading-normal md:leading-6 text-center md:text-start ">
        <div className="md:hidden text-xl  -tracking-[1.2px] mb-[30px] font-bold w-full leading-[30px]  flex justify-center">
          <div className="w-fit">
            <LocalizedString text={header} />
            <hr className="ww-full mt-[4px] md:mt-[12px] text-yellow bg-yellow  rounded-full border-t border-b-2 " />
          </div>
        </div>
        <LocalizedString text={content} />
      </Container>
    </div>
  )
}

export default ImageHeaderSection
