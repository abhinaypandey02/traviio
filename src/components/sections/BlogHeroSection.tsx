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
const BlogHeroSection = (props: ImageHeaderSectionProps) => {
  const {
    data: { header, image, content },
  } = props
  return (
    <div className=" lg:h-[480px]  relative h-[200px]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Image
          src={image ? urlFor(image) : ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          width={700}
          height={73}
          alt=""
        />
        <h2 className="lg:text-[56px] text-[28px] absolute  bottom-5 text-white   font-extrabold text-center ">
          {header?.en}
        </h2>
      </div>
      <Container className="px-10 px-5 md:px-20 text-[16px] -translate-y-9  font-[400] opacity-80 leading-6 ">
        {/* {content?content} */} <LocalizedString text={content} />
      </Container>
    </div>
  )
}

export default BlogHeroSection
