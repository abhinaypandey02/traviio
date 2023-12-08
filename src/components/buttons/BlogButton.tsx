import React from 'react'
import Image from 'next/image'

export interface BlogButtonProps {
  title: string
  images: string[]
  selected?: boolean
}

function BlogButton(props: BlogButtonProps) {
  const { title, images, selected } = props
  return (
    <div
      className={`min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-md border-gray ${
        selected ? 'bg-blue' : 'bg-transparent border-2 border-opacity-10'
      }`}
    >
      {images.map((image, index) => {
        return <Image src={image} height={18} width={18} alt={title} key={index} />
      })}
      <p
        className={`text-sm font-medium whitespace-nowrap ${selected ? 'text-white' : 'text-gray'}`}
      >
        {title}
      </p>
    </div>
  )
}

export default BlogButton
