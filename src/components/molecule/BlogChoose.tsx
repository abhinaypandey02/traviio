import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import BlogButton from '../buttons/BlogButton'

interface BlogChooseProps {
  items: {
    title: string
    link: string
    images: string[]
  }[]
}

function BlogChoose(props: BlogChooseProps) {
  const router = useRouter()
  const { items } = props
  return (
    <div className="flex gap-4 my-12 flex-nowrap overflow-auto">
      {items.filter(item => item.link === router.asPath).map((item, index) => {
        return (
          <Link href={item.link} key={index}>
            <BlogButton
              title={item.title}
              images={item.images}
              selected={true}
              ></BlogButton>
          </Link>
        )
      })}
      {items.filter(item => item.link !== router.asPath).map((item, index) => {
        return (
          <Link href={item.link} key={index}>
            <BlogButton
              title={item.title}
              images={item.images}
            ></BlogButton>
          </Link>
        )
      })}
    </div>
  )
}

export default BlogChoose
