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
    <div>
      <div>
        <Image
          src={image ? urlFor(image) : ''}
          style={{ width: '100%', height: '420px', objectFit: 'cover' }}
          width={700}
          height={73}
          alt=""
        />
        {/* <img className='w-full  max-h-[500px]' src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000" alt="" /> */}
        <h2 className="text-[56px]  text-white translate-x-[-10px] -translate-y-[125px]  font-extrabold text-center ">
          {header?.en}
        </h2>
      </div>
      <Container className="px-10 text-[16px] -translate-y-9  font-[400] opacity-80 leading-6 ">
        {/* {content?content} */} <LocalizedString text={content} />
      </Container>
    </div>
  )
}

export default BlogHeroSection
