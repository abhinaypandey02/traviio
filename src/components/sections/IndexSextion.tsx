import React from 'react'

import { SanityIndexSection } from '@/sanity/types'

import Container from '@/components/Container'
export type IndexSectionProps = {
  data: SanityIndexSection
}
const IndexSextion = (props: IndexSectionProps) => {
  const {
    data: { title },
  } = props
  return (
    <div>
      <Container>
        <h4 className="font-[700] text-[24px]">{title?.en}</h4>
        <hr className="text-yellow bg-yellow w-1/12 rounded-full border-2 my-2" />
      </Container>
    </div>
  )
}

export default IndexSextion
