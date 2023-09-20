import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'
import { SanityHeroSection } from '@/sanity/types'

import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'

export type HeroSectionProps = {
  data: SanityHeroSection
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const linearGradient =
    'linear-gradient(75.52deg, #000000 1.5%, rgba(0, 0, 0, 0.8) 9.18%, rgba(0, 0, 0, 0.7) 15.93%, rgba(0, 0, 0, 0.6) 37.5%, rgba(0, 0, 0, 0) 63.68%)'
  return (
    <>
      <p className="w-full h-[40px] text-white bg-darkblue text-[14px] font-[400] leading-[24px] flex items-center justify-center ">
        More summer for less. Save up to 20% off selected trips*.{' '}
        <span className="underline cursor-pointer">Book now</span>
      </p>
      <section

        className="h-[538px] text-white flex items-center bg-cover md:items-start justify-center md:justify-between flex-col px-[80px] py-[48px]"

        style={{
          backgroundImage: `${linearGradient}, url(${data.image ? urlFor(data.image) : ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <div className="w-[335px] md:w-[552px] min-h-[314px] py-5">
          <h1 className="text-[28px] md:text-[56px] font-[900] leading-[38px] md:leading-[78px] text-center md:text-start ">

            {data.title?.en}
          </h1>
          <h3 className="text-[14px] md:text-[20px] font-[400] leading-[20px] md:leading-[32px] text-center md:text-start ">
            {data?.subtitle?.en}
          </h3>
          <div className="flex gap-0 md:gap-[10px] pt-[48px] items-center justify-center md:justify-start">
            <PrimaryButton title={'Inquire Now'} />
            <SecondaryButton title={'Customize Your Own Trip'} />
          </div>
        </div>
        <div className="flex items-center mt-20  relative bottom-0">
          {data.scores?.map((score, index) => (
            <React.Fragment key={index}>
              {index !== 0 && (
                <div className="border-r rounded-[1px] border-yellow mx-4 h-[73px]"></div>
              )}
              <Image src={urlFor(score)} width={136} height={73} alt="" />
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  )
}

export default HeroSection
