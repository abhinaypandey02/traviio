import React from 'react'
import PortableText from "react-portable-text"
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'

const BlogContentSection = ({ data }: any) => {
  console.log(data)
  const SampleImageComponent = ({value, isInline}) => {
    const {width, height} = getImageDimensions(value)
    return (
      <img
        src={urlBuilder()
          .image(value)
          .width(isInline ? 100 : 800)
          .fit('max')
          .auto('format')
          .url()}
        alt={value.alt || ' '}
        loading="lazy"
        style={{
          // Display alongside text if image appears inside a block text span
          display: isInline ? 'inline-block' : 'block',
  
          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />
    )
  }
  const components = {
    types: {
      image: SampleImageComponent,
      // Any other custom types you have in your content
      // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
    },
  }
  
  return (
    <div className='my-10'>
      {data.map((item: any, index: any) => {
        return (
          <div key={index} className="text-black gap-y-5 flex flex-col ">
            <PortableText
              content={item.title?.en}
              serializers={{
              }}
            />
     
            <PortableText
              content={item.content?.en}
              components={components}
              serializers={{
              }}
            />

          </div>
        )
      })
      }
    </div>
  )
}

export default BlogContentSection
