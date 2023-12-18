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
    data: { title },
  } = props
  return (
    <Container className="md:py-[48px]">
        <h2 className="font-[700] text-darkblue text-[24px] tracking-[-0.72px]">{title?.en}</h2>
        <hr className="text-yellow bg-yellow w-[85px] md:w-1/12 rounded-full border-2 my-2" />
        <div className="my-12 mt-[30px] md:mt-10 flex flex-wrap text-gray">
          {data.map((item: any, index) => {
            return (
              <div className="text-xs md:text-sm leading-[20px] md:leading-[22px] font-medium flex space-x-2 pr-2">
                <Link key={index} href={item?.slug?.current ? item?.slug?.current : '/'}>
                  {item?.meta_data?.meta_title?.en ? item?.meta_data?.meta_title?.en : 'page'}
                </Link>
                <span className="text-gray ">|</span>
              </div>
            )
          })}
        </div>
      </Container>
  )
}

export default IndexSextion
