import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'
import { SanityAtGlanceSection } from '@/sanity/types'

import Container from '@/components/Container'

export type AtAGlanceSectionProps = {
  data: SanityAtGlanceSection
}

const AtAGlanceSection = (props: AtAGlanceSectionProps) => {
  const {
    data: { tagline, title, useful_links_section, facts },
  } = props
  console.log(useful_links_section)
  return (
    <div className=" ">
      <Container className='bg-[#F2FAFF] py-12'>
        <h2 className="text-[#3FA9F5] text-[16px] font-[500] text-center">{tagline?.en}</h2>
        <h4 className="text-[36px] font-[700] mt-2 text-center">{title?.en}</h4>
        <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
        <div className="py-2 grid grid-flow-row grid-cols-4 px-10 gap-x-24 mt-16 gap-y-12">
          {facts?.map((item: any, index: any) => {
            return (
              <div className="flex gap-x-2 items-center ">
                <Image alt={''} src={urlFor(item.icon)} width={48} height={48} />
                <div className=' '>
                  <h3 className="text-[18px] font-[500]">{item.title?.en}</h3>
                  <h3 className="text-[14px] text-[#726E83]">{item.subtitle?.en}</h3>
                </div>
              </div>
            )
          })}
        </div>
         <hr className='mt-14 mb-11 m-auto text-[#CFEAFD] bg-[#CFEAFD] w-10/12 ' /> 
         <div>
         <h4 className="text-[24px] font-[700] text-center">{useful_links_section?.title?.en}</h4>
         <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
         <div className="py-2 grid grid-flow-row grid-cols-4 mt-16 pl-20  gap-y-12">
              {
                useful_links_section?.useful_links?.map((item:any,index:any)=>{
                  return (
                    <div>
                       <a href={item.url}>
                         <div className='flex items-center gap-x-2 '>
                         <Image alt={''} src={urlFor(item.icon)} width={28} height={28} />
                          <span className='font-[500] text-[18px] text-[#140D31]'>{item.title?.en}</span>
                         </div>
                       </a>
                    </div>
                  )
                })
              }
         </div>
         </div>
      </Container>
    </div>
  )
}

export default AtAGlanceSection
