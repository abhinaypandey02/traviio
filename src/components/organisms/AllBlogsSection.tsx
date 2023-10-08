import React from 'react'

import { SanityAllBlogsSection } from '@/sanity/types'

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

  return <div></div>
}

export default AllBlogsSection
