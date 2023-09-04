import Image from 'next/image'

import { urlFor } from '@/sanity/client'

import { SanityFeature, SanityFeatureSection } from '../../sanity/types'

export type FeatureSectionProps = {
  data: SanityFeatureSection
}

const FeatureSection = ({ data }: FeatureSectionProps) => {
  console.log(data)
  
  return (
    <section className={data?.type=='small'?"bg-[#F2FAFF] text-center ":"text-center h-[257px]  text-[#140D31]"}>
      <h2 className="text-[20px] md:text-[24px] font-[700] leading-[30px] md:leading-[34px] pt-[20px] md:pt-[16px] ">
        {data.title?.en}
      </h2>
      <hr className="w-[85px] md:w-[117px] my-2 m-auto bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] " />
      {
        data?.type=='small'?<div className='grid grid-cols-1 lg:grid-cols-4'>
           {data?.features?.map((feature, index) => (
          <SmallFeature key={index} data={feature} />
        ))}
        </div>
        :
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full px-[80px] py-[10px]">
        {data?.features?.map((feature, index) => (
          <Feature key={index} data={feature} />
        ))}
      </div>
      }
    </section>
  )
}

export type FeatureProps = { data: SanityFeature }

const Feature = ({ data }: FeatureProps) => {
  return (
    <div className="m-auto my-10 text-center flex flex-col items-center justify-center  ">
      <Image src={data.icon?urlFor(data.icon ):''}  width={48} height={48} alt="" />
      <p className="text-center my-2 font-medium md:text-start text-[12px] md:text-[16px]  leading-[20px] md:leading-[24px] px-[8px]">
        {data.title?.en}
      </p>
    </div>
  )
}

const SmallFeature = ({ data }: FeatureProps) => {
  return (
    <div className="m-auto  text-center flex  items-center justify-center  ">
      <Image src={data.icon?urlFor(data.icon ):''}  width={48} height={48} alt="" />
      <p className="text-center my-2 font-medium md:text-start text-[12px] md:text-[16px]  leading-[20px] md:leading-[24px] px-[8px]">
        {data.title?.en}
      </p>
    </div>
  )
}


FeatureSection.Feature = Feature

export default FeatureSection
