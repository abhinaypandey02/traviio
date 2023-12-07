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
          <p className="font-bold text-2xl " {...props} />
          <hr className="w-20 my-2 text-yellow bg-yellow  rounded-full border-2" />
        </div>
      )
    },

    layout_group: (props: any) => {
      return (
        <div className="flex w-full max-md:flex-col  gap-4 md:gap-12">
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
        <div
          style={{
            gridTemplateColumns:
              props.items?.[0]?._type === 'layout_group' && props.grid
                ? `repeat(${props.items?.[0].items?.length}, minmax(0, auto))`
                : '',
          }}
          className={props.grid ? 'grid gap-[18px]' : 'flex flex-col gap-[18px]'}
        >
          {props.items
            .map((item: any) =>
              props.grid && item._type === 'layout_group' ? (
                item.items?.map((item: any) => (
                  <PortableText
                    // className="flex-1"
                    content={item}
                    serializers={PortableTextSerializer}
                  />
                ))
              ) : (
                <PortableText
                  // className="flex-1"
                  content={item}
                  serializers={PortableTextSerializer}
                />
              )
            )
            .flat()}
        </div>
      )
    },
    content_text: (props: any) => {
      return <p style={{ color: props.styles?.color }}>{props.text}</p>
    },
    content_image: (props: any) => {
      const { dimensions } = decodeAssetId(props.image.asset._ref)

      return (
        <div className="shrink-0 w-full lg:w-[400px]  box-border">
          <Image
            alt=""
            src={urlFor(props.image)}
            width={dimensions?.width}
            height={dimensions?.height}
            className="object-fill w-full h-auto"
          />
          <div className="text-center mt-2">
            <LocalizedString text={props.image.alt} />
          </div>
        </div>
      )
    },
  }

  return (
    <Container id="overview" className="mt-[60px] px-5 md:px-20 mb-20">
      <div className="mb-[30px] md:mb-12 flex flex-col items-center">
        <p className="text-blue text-xs md:text-base  font-medium uppercase leading-tight md:leading-normal">
          {localizedString(tagline, props.locale)}
        </p>

        <h2 className="text-[24px] md:text-[40px] leading-[32px] md:leading-tight  -tracking-[1.2px] mt-2 md:mt-3  w-fit  font-bold">
          {localizedString(title, props.locale)}
          <hr className="w-1/2 mx-auto text-yellow  bg-yellow  rounded-full mt-2.5 border-b-2" />
        </h2>
      </div>

      <div className="text-sm md:text-base mt-[48px] font-normal">
        {content[props.locale] && (
          <PortableText
            content={content[props.locale]}
            className="flex flex-col gap-[10px] font-[500] md:gap-6 leading-normal md:leading-7 md:tracking-wide"
            serializers={PortableTextSerializer}
          />
        )}
      </div>
    </Container>
  )
}

export default ContentSection
