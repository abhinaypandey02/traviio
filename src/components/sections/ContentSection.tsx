import React from 'react'
import Image from 'next/image'
import PortableText from 'react-portable-text'

import { LocalizedString, localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { decodeAssetId, urlFor } from '@/sanity/client'
import { SanityContentSection } from '@/sanity/types'

import Container from '@/components/Container'
export type ContentSectionProps = {
  data: SanityContentSection
}
const ContentSection = (props: PropsWithLocale<ContentSectionProps>) => {
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
        <div className="flex w-full max-md:flex-col font-medium  gap-4 md:gap-12">

          {props.items.map((item: any) => (
            <PortableText
              // className={item._type === 'content_image' ? 'w-full' : ''}
              content={item}
              serializers={PortableTextSerializer}
            />
          ))}
        </div>
      )
    },
    layout_stack: (props: any) => {
      return (
        <div className="flex flex-col  gap-[18px]">
          <PortableText
            // className="flex-1"
            content={props.items[0]}
            serializers={PortableTextSerializer}
          />
          <PortableText
            // className="w-fit"
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
      const { dimensions } = decodeAssetId(props.image.asset._ref)
      return (
        <div
          style={{
            width: dimensions?.width,
            height: dimensions?.height,
          }}
          className="shrink-0 w-full"
        >
          <Image
            alt=""
            src={urlFor(props.image)}
            width={dimensions?.width}
            height={dimensions?.height}
            className="object-cover w-full "
          />
          <div className={'text-center'}>
            <LocalizedString text={props.image.alt} />
          </div>
        </div>
      )
    },
  }

  return (
    <Container className="mt-12 mb-20">
      <div className="mb-12">
        <h2 className="text-blue uppercase font-medium text-center mb-3">
          {localizedString(tagline, props.locale)}
        </h2>
        <h4 className="text-[40px] leading-tight -tracking-[1.2px] font-bold text-center">
          {localizedString(title, props.locale)}
        </h4>
        <hr className="lg:w-1/12 w-1/3 mt-[9px] text-yellow m-auto  bg-yellow   border-t-2 border-b" />
      </div>


       <div className='font-medium'>

      {content[props.locale] && (
        <PortableText
        content={content[props.locale]}
        className="flex flex-col gap-6 leading-[1.75] tracking-[0.64px]"
        serializers={PortableTextSerializer}
        />
        )}
        </div>
    </Container>
  )
}

export default ContentSection
