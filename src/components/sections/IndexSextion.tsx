import React from 'react'
import Container from '@/components/Container'
import { SanityIndexSection } from '@/sanity/types'
export type IndexSectionProps = {
  data: SanityIndexSection
}
const IndexSextion = (props:IndexSectionProps) => {
    console.log(props)
    const {data:{title},}=props
  return (
    <div>
      <Container>
       <h4 className='font-[700] text-[24px]'>{title?.en}</h4>
       <hr className='text-yellow bg-yellow w-1/12 rounded-full border-2 my-2' />
      </Container>
    </div>
  )
}

export default IndexSextion
