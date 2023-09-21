import Image from 'next/image'

import { urlFor } from '@/sanity/client'

import { SanityFeature, SanityFeatureSection } from '../../sanity/types'

export type FeatureSectionProps = {
  data: SanityFeatureSection
}

const FeatureSection = ({ data }: FeatureSectionProps) => {
  console.log(data)
  if (data?.type != 'small') {
    return (
      <section className={'text-center min-h-[257px] my-20  text-[#140D31] relative'}>
        <h2 className=" text-darkblue text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[50px]  text-center ">
          {data.title?.en}
        </h2>
        <hr className="w-[85px] md:w-[117px] my-2 m-auto bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] " />

        <div className="grid grid-cols-2 my-20  md:grid-cols-3 gap-4 md:gap-6 w-full px-[80px] py-[10px]">
          {data?.features?.map((feature, index) => <Feature key={index} data={feature} />)}
          <div className="absolute left-0 top-0 max-md:hidden w-full h-[380px] flex  items-center -z-[0]">
            <svg width="100%" height="135" viewBox="0 0 856 135" fill="none">
              <path
                d="M1 94.3466C148.5 114.17 412.268 160.821 474 97.7702C514.063 56.8511 475.5 -16.993 405.5 5.00972C343 24.655 349.5 116.234 428 120.226C428 120.226 586 164.478 855 94.3466"
                stroke="#65BAF7"
                stroke-opacity="0.7"
                stroke-dasharray="6 6"
              />
            </svg>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section
      className={
        data?.type == 'small'
          ? 'bg-[#F2FAFF] text-center pb-8'
          : 'text-center h-[257px]  text-[#140D31]'
      }
    >
      <h2 className="text-[20px] md:text-[30px] font-[700] leading-[30px] md:leading-[34px] pt-[20px] md:pt-[16px] ">
        {data.title?.en}
      </h2>
      <hr className="w-[85px] md:w-[117px] my-2 m-auto bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] mb-5" />
      {data?.type == 'small' ? (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          {data?.features?.map((feature, index) => <SmallFeature key={index} data={feature} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full px-[80px] py-[10px] relative">
          {data?.features?.map((feature, index) => <Feature key={index} data={feature} />)}
        </div>
      )}
    </section>
  )
}

export type FeatureProps = { data: SanityFeature }

const Feature = ({ data }: FeatureProps) => {
  return (
    <div className="relative text-center flex flex-col items-center z-[2]">
      {data.icon?.asset?._ref && <Image src={urlFor(data.icon)} width={48} height={48} alt="" />}

      {/* {data.title?.en} */}

      <p className="font-[700] text-[20px] mt-10 mb-2">{data.title?.en}</p>
      <p className="mx-20 opacity-60"> {data.description?.en}</p>
    </div>
  )
}

const SmallFeature = ({ data }: FeatureProps) => {
  return (
    <div className="m-auto  text-center flex  items-center justify-center  ">
      <Image src={data.icon ? urlFor(data.icon) : ''} width={48} height={48} alt="" />
      <p className="text-center my-2 font-medium md:text-start text-[12px] md:text-[16px]  leading-[20px] md:leading-[24px] px-[8px]">
        {data.title?.en}
      </p>
    </div>
  )
}

FeatureSection.Feature = Feature

export default FeatureSection
