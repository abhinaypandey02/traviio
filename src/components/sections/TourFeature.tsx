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
    <Container
      className="my-20 mb-[69px]  
        "
    >
      {data.title?.en && (
        <div className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] leading-[30px] md:leading-[34px] pt-[20px] md:pt-[16px] ">
            {data.title?.en}
          </h2>
          <hr className="w-[85px] md:w-[110px] my-2  bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] mb-5" />
        </div>
      )}
      <section
        className={
          data?.type == 'small'
            ? 'bg-[#F2FAFF] rounded-2xl text-center lg:w-3/4 w-full py-8'
            : 'bg-[#F2FAFF] text-center lg:w-3/4 w-full py-8'
        }
      >
        {data?.type == 'small' ? (
          <div className="grid md:grid-cols-2 gap-7 lg:grid-cols-4 w-fit mx-auto">
            {data?.features?.map((feature, index) => <Feature key={index} data={feature} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3  md:gap-10 md:gap-x-16 gap-x-4 w-full px-[60px] py-[4px] relative">
            {data?.features?.map((feature, index) => <LargeFeature key={index} data={feature} />)}
          </div>
        )}
      </section>
    </Container>
  )
}

export type FeatureProps = { data: SanityFeature }

const Feature = ({ data }: FeatureProps) => {
  return (
    <div className=" w-full min-w-[250px] text-center flex flex-col items-center z-[2]">
      {data.icon?.asset?._ref && <Image src={urlFor(data.icon)} width={48} height={48} alt="" />}

      {/* {data.title?.en} */}

      <p className="font-[500] text-[15px]  mb-2">{data.title?.en}</p>
      <p className="mx-20 opacity-60"> {data.description?.en}</p>
    </div>
  )
}

const LargeFeature = ({ data }: FeatureProps) => {
  return (
    <div className=" w-full text-start gap-x-3 flex  items-center z-[2]">
      {data.icon?.asset?._ref && <Image src={urlFor(data.icon)} width={28} height={28} alt="" />}

      <div>
        <p className="font-[500] text-[20px]  mb-2">{data.title?.en}</p>
        <p className="mx-20 opacity-60"> {data.description?.en}</p>
      </div>
    </div>
  )
}

export default TourFeature
