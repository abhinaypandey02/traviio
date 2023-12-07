import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'

import { SanityFeature, SanityFeatureSection } from '../../sanity/types'
import Container from '../Container'

export type FeatureSectionProps = {
  data: SanityFeatureSection
}
const TourFeature = ({ data }: FeatureSectionProps) => {
  return (
    <Container className="my-20  md:px-20 mb-[69px] ">
      {data.title?.en && (
        <div className="mb-10 px-5 md:px-0">
          <h2 className="text-[20px] md:text-[24px] font-[700] leading-[30px] md:leading-[34px] pt-[20px] md:pt-[16px] ">
            {data.title?.en}
          </h2>
          <hr className="w-[85px] md:w-[110px] my-2  bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] mb-5" />
        </div>
      )}
      <div
        className={
          data?.type == 'small'
            ? 'bg-[#F2FAFF] rounded-2xl text-center max-w-5xl w-full pb-8'
            : 'bg-[#F2FAFF] text-center rounded-2xl  max-w-5xl w-full pb-8'
        }
      >
        {data?.type == 'small' ? (
          <div className=" px-5">
            <div className="lg:text-xl text-base py-8 lg:py-6 font-bold">Keep Things Simple</div>
            <div className="grid grid-cols-2 gap-7 lg:grid-cols-4 w-fit mx-auto">
              {data?.features?.map((feature, index) => <Feature key={index} data={feature} />)}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 lg:gap-x-16 px-4 w-full pt-8 lg:px-[60px] relative">
            {data?.features?.map((feature, index) => <LargeFeature key={index} data={feature} />)}
          </div>
        )}
      </div>
    </Container>
  )
}

export type FeatureProps = { data: SanityFeature }

const Feature = ({ data }: FeatureProps) => {
  return (
    <div className=" w-full max-w-5xl text-center flex flex-col items-center z-[2]">
      {data.icon?.asset?._ref && <Image src={urlFor(data.icon)} width={48} height={48} alt="" />}

      {/* {data.title?.en} */}

      <p className="font-[500] lg:text-[15px] text-[12px] mb-2">{data.title?.en}</p>
      <p className="mx-20 opacity-60"> {data.description?.en}</p>
    </div>
  )
}

const LargeFeature = ({ data }: FeatureProps) => {
  return (
    <div className=" w-full text-start flex  gap-3   items-center z-[2]">
      {data.icon?.asset?._ref && <Image src={urlFor(data.icon)} width={28} height={28} alt="" />}

      <div className=" flex-1">
        <p className="font-[500] text-base lg:text-[20px]  mb-2">{data.title?.en}</p>
        <p className=" opacity-60"> {data.description?.en}</p>
      </div>
    </div>
  )
}

export default TourFeature
