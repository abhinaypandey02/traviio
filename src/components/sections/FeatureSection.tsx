import Image from 'next/image'

import { urlFor } from '@/sanity/client'

import Container from '@/components/Container'

import { SanityFeature, SanityFeatureSection } from '../../sanity/types'

export type FeatureSectionProps = {
  data: SanityFeatureSection
}

export default function FeatureSection({ data }: FeatureSectionProps) {
  if (data?.type != 'small') {
    return (
      <Container className={'text-center  pb-20 pt-[84px] text-[#140D31] relative'}>
        {data.title?.en && (
          <>
            <h2 className=" text-darkblue w-fit -tracking-[1.2px] mx-auto text-[24px] md:text-[40px] font-bold leading-[32px] md:leading-[50px]  text-center ">
              {data.title?.en}
              <hr className="w-1/3 mt-[9px] m-auto bg-yellow text-yellow h-[3px] rounded-full  " />
            </h2>
          </>
        )}
        <div className="flex justify-between mt-[74px]   gap-4 md:gap-6 w-full ">
          {data?.features?.map((feature, index) => <Feature key={index} data={feature} />)}
          <div className="absolute left-0 top-48 max-md:hidden w-full  flex  items-center -z-[0]">
            <svg width="100%" height="135" viewBox="0 0 856 135" fill="none">
              <path
                d="M1 94.3466C148.5 114.17 412.268 160.821 474 97.7702C514.063 56.8511 475.5 -16.993 405.5 5.00972C343 24.655 349.5 116.234 428 120.226C428 120.226 586 164.478 855 94.3466"
                stroke="#65BAF7"
                strokeOpacity="0.7"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
        </div>
      </Container>
    )
  }
  return (
    <section className={'bg-[#F2FAFF] text-center py-3'}>
      <Container>
        {data.title?.en && (
          <>
            <h2 className="text-xl md:text-2xl -tracking-[0.72px] font-bold w-fit mx-auto leading-[30px] md:leading-[34px] ">
              {data.title?.en}
              <hr className="w-[85px] md:w-1/2 mt-1 bg-yellow text-yellow h-0.5  mb-4" />
            </h2>
          </>
        )}
        <div className="flex justify-between w-full">
          {data?.features?.map((feature, index) => <SmallFeature key={index} data={feature} />)}
        </div>
      </Container>
    </section>
  )
}

export type FeatureProps = { data: SanityFeature }

const Feature = ({ data }: FeatureProps) => {
  return (
    <div className="relative text-center flex flex-col items-center z-[2]">
      {data.icon?.asset?._ref && <Image src={urlFor(data.icon)} width={68} height={68} alt="" />}

      {/* {data.title?.en} */}

      <p className="font-[700] -tracking-[0.6px] text-[20px] mt-9 mb-2.5">{data.title?.en}</p>
      <p className="opacity-60 max-w-[348px]"> {data.description?.en}</p>
    </div>
  )
}

const SmallFeature = ({ data }: FeatureProps) => {
  return (
    <div className="text-center flex items-center">
      <Image
        src={data.icon ? urlFor(data.icon) : ''}
        width={48}
        height={48}
        alt=""
        className={'h-12 w-12'}
      />
      <p className="text-center font-medium md:text-start text-xs md:text-base  leading-[20px] md:leading-[24px] ml-3">
        {data.title?.en}
      </p>
    </div>
  )
}
