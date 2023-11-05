import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'

const ArticleHeroSection = ({ data }: any) => {
  return (
    <div className=" mt-8 ">
      <h1 className="text-4xl font-semibold">{data.title?.en}</h1>
      <h2 className="my-5 font-semibold mb-7">
        By {data?.author?.name?.en} On <span className="text-yellow">{data?.time?.en}</span>{' '}
      </h2>

      <Image
        src={data.cover_image ? urlFor(data.cover_image) : ''}
        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
        width={700}
        height={73}
        alt=""
      />

      <p className="mt-7 font-semibold leading-7 opacity-70 text-[16px]">
        {' '}
        {data.introduction?.en}{' '}
      </p>
    </div>
  )
}

export default ArticleHeroSection
