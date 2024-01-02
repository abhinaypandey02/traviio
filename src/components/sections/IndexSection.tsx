import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { SanityIndexSection } from '@/sanity/types'
import { getAllPages, PageData } from '@/utils/utils'

import Container from '@/components/Container'
export type IndexSectionProps = {
  data: SanityIndexSection
}
const IndexSextion = (props: IndexSectionProps) => {
  const [data, setData] = useState<PageData[]>([])
  useEffect(() => {
    const getdata = async () => {
      const result = await getAllPages()
      setData(result)
    }
    getdata()
  }, [getAllPages])

  const {
    data: { title, tours },
  } = props

  return (
    <Container className="my-8  md:my-12 ">
      <h2 className="font-[700] text-darkblue text-[24px] tracking-[-0.72px]">{title?.en}</h2>
      <hr className="text-yellow bg-yellow w-[85px] md:w-1/12 rounded-full border-2 mt-2" />
      <div className="md:py-12 py-8 mds:mt-10 flex flex-wrap text-gray ">
        {tours?.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="text-xs md:text-sm leading-[20px] md:leading-[22px] font-medium flex space-x-2 pr-2"
            >
              <Link key={index} href={item?.url ? item?.url : '/'}>
                {item?.text?.en ? item?.text?.en : 'page'}
              </Link>
              <span className="text-gray ">|</span>
            </div>
          )
        })}
      </div>
      {title?.en === 'Popular Tours' && (
        <hr className="text-[#F2FAFF] w-full rounded-full border-2 max-w-[1280px]" />
      )}
    </Container>
  )
}

export default IndexSextion
