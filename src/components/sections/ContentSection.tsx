import React from 'react'
import Image from 'next/image'
import PortableText from 'react-portable-text'

import { LocalizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityContentSection } from '@/sanity/types'

import Container from '@/components/Container'
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
      return (
        <div className="flex w-full max-md:flex-col gap-4 md:gap-12">
          {props.items.map((item: any) => (
            <PortableText className="flex-1" content={item} serializers={PortableTextSerializer} />
          ))}
        </div>
      )
    },
    layout_stack: (props: any) => {
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
        <div className="w-full">
          <Image
            alt=""
            src={urlFor(props.image)}
            width={500}
            height={500}
            className="object-cover w-full"
          />
          <div className={'text-center'}>
            <LocalizedString text={props.image.alt?.en} />
          </div>
        </div>
      )
    },
  }
  return (
    <Container className="py-20">
      <div className="mb-10">
        <h2 className="text-blue text-base font-medium text-center">{tagline?.en}</h2>
        <h4 className="text-3xl font-medium text-center">{title?.en}</h4>
        <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
      </div>
      <PortableText
        content={content?.en}
        className="flex flex-col gap-6"
        serializers={PortableTextSerializer}
      />
    </Container>
  )
}

export default ContentSection
