import React from 'react'
import Image from 'next/image'
import PortableText from 'react-portable-text'

import { urlFor } from '@/sanity/client'
import { SanityContentSection } from '@/sanity/types'
export type ContentSectionProps = {
  data: SanityContentSection
}
const ContentSection = (props: ContentSectionProps) => {
  const {
    data: { title, tagline, content },
  } = props
  const PortableTextSerializer = {
    h3: (props: any) => {
      return (
        <div>
          <p className="font-bold text-2xl" {...props} />
          <hr className="w-20 my-2 text-yellow bg-yellow  rounded-full border-2" />
        </div>
      )
    },
    layout_group: (props: any) => {
      console.log('layout_group', props)
      return (
        <div className="flex w-full max-md:flex-col gap-4">
          {props.items.map((item: any) => (
            <PortableText className="flex-1" content={item} serializers={PortableTextSerializer} />
          ))}
        </div>
      )
    },
    layout_stack: (props: any) => {
      console.log('layout_stack', props)
      return (
        <div className="flex flex-col">
          <PortableText
            className="flex-1"
            content={props.items[0]}
            serializers={PortableTextSerializer}
          />
          <PortableText
            className="w-fit"
            content={props.items[1]}
            serializers={PortableTextSerializer}
          />
        </div>
      )
    },
    content_text: (props: any) => {
      return <p>{props.text}</p>
    },
    content_image: (props: any) => {
      return (
        <div className="w-full mx-auto h-[150px] sm:w-[200px] md:w-[300px] md:h-[230px] lg:w-[400px] lg:h-[310px] relative">
          <Image alt="" src={urlFor(props.image)} fill className="object-contain" />
        </div>
      )
    },
  }
  console.log('Content Section', content)
  return (
    <div className="lg:px-20 text-black bg-white flex flex-col py-20 gap-12 max-w-[1280px] w-[90%] mx-auto">
      <div className="mb-10">
        <h2 className="text-blue text-base font-medium text-center">{tagline?.en}</h2>
        <h4 className="text-3xl font-medium text-center">{title?.en}</h4>
        <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
      </div>
      <PortableText
        content={content?.en}
        className="flex flex-col gap-5"
        serializers={PortableTextSerializer}
      />
    </div>
  )
}

export default ContentSection
