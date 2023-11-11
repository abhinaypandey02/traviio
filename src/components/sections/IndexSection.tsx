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
    <div className="pb-10">
      <Container>
        <h2 className="font-[700] text-[24px]">{title?.en}</h2>
        <hr className="text-yellow bg-yellow w-[85px] md:w-1/12 rounded-full border-2 my-2" />
        <div className="my-10 mt-[30px] md:mt-10 gap-[11px] flex flex-wrap text-gray">
          {data.map((item: any, index) => {
            return (
              <Link
                key={index}
                className="mx-1  flex items-center "
                href={item?.slug?.current ? item?.slug?.current : '/'}
              >
                {item?.meta_data?.meta_title?.en ? item?.meta_data?.meta_title?.en : 'page'} |
              </Link>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default IndexSextion
