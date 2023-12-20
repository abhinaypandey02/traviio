import React from 'react'
import PortableText from 'react-portable-text'

import { getImageDimensions } from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'

const BlogContentSection = ({ data }: any) => {
  return (
    <div className="my-10">
      {data.map((item: any, index: any) => {
        return (
          <div key={index} className="text-black gap-y-5 flex flex-col ">
            {item.title?.en && <PortableText content={item.title?.en} serializers={{}} />}
            {item.content?.en && <PortableText content={item.content?.en} serializers={{}} />}
          </div>
        )
      })}
    </div>
  )
}

export default BlogContentSection
