import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/sanity/client'

import Container from '../Container'

interface BlogReviewProps {
  data: any
}

function BlogReview(props: BlogReviewProps) {
  const { data } = props
  return (
    <Container className="rounded-xl mx-auto max-w-[1312px] px-4 my-10 bg-primary py-12">
      <div className="flex gap-7 mx-auto justify-center items-center">
        {/* left side */}
        <div className="flex flex-col gap-2 items-center">
          <Image
            src={urlFor(data.avatar)}
            height={60}
            width={60}
            alt=""
            className="rounded-full border-2 border-blue aspect-square"
          />

          <p className="text-lg font-medium underline underline-offset-2 decoration-[3px] decoration-yellow whitespace-nowrap">
            {data.name?.en}
          </p>

          {data.socials.map((it: any, ind: any) => {
            return (
              <Link key={ind} href={it.link} className="flex mt-1 items-center justify-center">
                <Image
                  src={urlFor(it.icon)}
                  height={20}
                  width={20}
                  className="rounded-full"
                  alt={it.name}
                />
              </Link>
            )
          })}
        </div>
        {/* right side */}
        <div className="grow max-w-[560px]">{data.bio?.en}</div>
      </div>
    </Container>
  )
}

export default BlogReview
