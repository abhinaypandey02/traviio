import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import Link from 'next/link'

interface BlogReviewProps {
  image: string
  name: string
  text: string
  socialImage: string
  socialLink: string
}

function BlogReview(props: BlogReviewProps) {
  const { image, name, text, socialImage, socialLink } = props
  return (
    <Container className="rounded-xl bg-primary py-12">
      <div className="flex gap-7 mx-auto justify-center items-center">
        {/* left side */}
        <div className="flex flex-col gap-2 items-center">
          <Image
            src={image}
            height={60}
            width={60}
            alt=""
            className="rounded-full border-2 border-blue aspect-square"
          />
          <p className="text-lg font-medium underline underline-offset-2 decoration-[3px] decoration-yellow whitespace-nowrap">
            {name}
          </p>
          <Link href={socialLink} className="flex mt-1 items-center justify-center">
            <Image src={socialImage} height={20} width={20} className="rounded-full" alt="" />
          </Link>
        </div>
        {/* right side */}
        <div className='grow max-w-[560px]'>
            {text}
        </div>
      </div>
    </Container>
  )
}

export default BlogReview
