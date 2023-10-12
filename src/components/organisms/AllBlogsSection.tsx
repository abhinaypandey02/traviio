import React from 'react'

import { localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityAllBlogsSection } from '@/sanity/types'

import Container from '../Container'
import BlogDetailCard from '../molecule/BlogDetailCard'

function AllBlogsSection({ data }: { data: SanityAllBlogsSection }) {
  console.log(data.blogs)
  // blogs: [
  //   {
  //     destination: [Object],
  //     introduction: [Object],
  //     time: [Object],
  //     cover_image: [Object],
  //     title: [Object]
  //   }
  // ]

  return (
    <Container className="flex flex-col items-center">
      <div>
        <h2 className="text-blue text-base font-medium text-center">
          {localizedString(data.tagline)}
        </h2>
        <h4 className="text-4xl font-[700] mt-5  text-center">{localizedString(data.title)}</h4>
        <hr className="w-32 my-2 text-yellow m-auto bg-yellow  rounded-full border-2" />
      </div>
      <div className="flex flex-wrap mt-10 w-full">
        {data.blogs?.map((blog, index) => {
          return (
            <BlogDetailCard
              country={localizedString((blog.destination as any)?.name)}
              excerpt={localizedString(blog.introduction)}
              image={blog.cover_image ? urlFor(blog.cover_image) : ''}
              link={`/blogs/${blog.slug?.current}`}
              title={localizedString(blog.title)}
              date={localizedString(blog.time)}
              author={localizedString(blog.author)}
              key={index}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default AllBlogsSection
