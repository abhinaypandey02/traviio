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
  console.log(content)
  return (
    <div className="lg:px-20 px-10 py-10  bg-white text-black">
      <h2 className="text-blue text-base font-medium text-center">{tagline?.en}</h2>
      <h4 className="text-3xl font-medium text-center">{title?.en}</h4>
      <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
      {content?.en?.map((item: any, index: any) => {
        if (item._type == 'block')
          return (
            <div className="py-5" key={index}>
              <PortableText content={item} serializers={{}} />
            </div>
          )
        return (
          <div className="grid grid-flow-row grid-cols-2 gap-x-20">
            {item.items.map((it: any, ind: any) => {
              if (it._type == 'content_image') {
                return (
                  <div key={ind}>
                    <Image alt="image" src={urlFor(it.image)} width={600} height={100} className='my-3'/>
                  </div>
                )
              }
              return (
                <div className="flex flex-col gap-5 my-5">
                  {it.items.map((bt: any, by: any) => {
                    return <div key={by}>{bt.text}</div>
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
      {/* <PortableText
      content={content?.en[0]}
      serializers={{
      }}
    /> */}
    </div>
  )
}

export default ContentSection
