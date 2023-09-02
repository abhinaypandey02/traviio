import Image from 'next/image'

import { urlFor } from '@/sanity/client'

import { SanityFeature, SanityFeatureSection } from '../../sanity/types'

export type FeatureSectionProps = {
  data: SanityFeatureSection
}

const FeatureSection = ({ data }: FeatureSectionProps) => {
  return (
    <section className="flex flex-col items-center h-[257px] md:h-[128px] bg-[#F2FAFF] text-[#140D31]">
      <h2 className="text-[20px] md:text-[24px] font-[700] leading-[30px] md:leading-[34px] pt-[20px] md:pt-[16px] ">
        {data.title?.en}
      </h2>
      <hr className="h-[3px] w-[91px] md:w-[103px] rounded-[2px] bg-yellow" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full px-[80px] py-[10px]">
        {data?.features?.map((feature, index) => (
          <Feature key={index} data={feature} />
        ))}
      </div>
    </section>
  )
}

export type FeatureProps = { data: SanityFeature }

const Feature = ({ data }: FeatureProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      {/* <Image src={urlFor(data.icon )} width={48} height={48} alt="" /> */}
      <p className="text-center md:text-start text-[12px] md:text-[16px] font-[500] leading-[20px] md:leading-[24px] px-[8px]">
        {data.title?.en}
      </p>
    </div>
  )
}

FeatureSection.Feature = Feature

export default FeatureSection
