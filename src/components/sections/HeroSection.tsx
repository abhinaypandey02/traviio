import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'
import { SanityHeroSection } from '@/sanity/types'

import Container from '@/components/Container'

import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'

export type HeroSectionProps = {
  data: SanityHeroSection
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const linearGradient =
    'linear-gradient(75.52deg, #000000 1.5%, rgba(0, 0, 0, 0.8) 9.18%, rgba(0, 0, 0, 0.7) 15.93%, rgba(0, 0, 0, 0.6) 37.5%, rgba(0, 0, 0, 0) 63.68%)'
  return (
    <div
      className={
        'relative z-10 h-screen max-h-[540px] flex items-end md:items-center  max-w-[1440px] border  md:h-full'
      }
    >
      <div
        className={'w-full h-full absolute top-0 left-0 -z-10'}
        style={{ background: linearGradient }}
      ></div>
      {data.image && (
        <Image
          className={'absolute -z-20 left-0 top-0 w-full h-full object-cover'}
          style={{ boxShadow: linearGradient }}
          height={538}
          width={1440}
          priority={true}
          // fill
          src={urlFor(data.image)}
          alt={'hero'}
        />
      )}

      <section className="text-white md:py-5 py-3 z-10  w-full">
        <Container className="flex items-center  md:items-start justify-center md:justify-between flex-col">
          <div className="w-[335px]  md:w-[572px] ">
            <h1 className="text-[28px] md:text-[56px] font-black -tracking-[1.68px] leading-[38px] md:leading-[76px] text-center md:text-start ">
              {data.title?.en}
            </h1>
            <h3 className="mt-2 md:mt-[10px] text-sm md:text-[20px] leading-[20px] md:leading-[30px] text-center md:text-start ">
              {data?.subtitle?.en}
            </h3>
            <div className="flex gap-3 md:gap-4 mt-5 md:mt-12 items-center justify-center md:justify-start">
              <PrimaryButton title={'Inquire Now'} />
              <SecondaryButton title={'Customize Your Own Trip'} />
            </div>
            <div className={'text-xs font-bold pl-[115px] mt-2 opacity-60'}>
              In less than 1 minute
            </div>
          </div>
          <div className="mt-[28px] md:mt-[72px] flex items-center relative bottom-0">
            {data.scores?.map((score, index) => (
              <React.Fragment key={index}>
                {index !== 0 && (
                  <div className="border-[0.69px]  rounded-full border-yellow mx-4 h-[73px]"></div>
                )}
                <Image
                  src={urlFor(score)}
                  width={136}
                  height={73}
                  alt=""
                  className={'h-[73px] w-auto'}
                />
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HeroSection
