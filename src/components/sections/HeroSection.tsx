import React from 'react'
import Image from 'next/image'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityHeroSection } from '@/sanity/types'

import Container from '@/components/Container'

import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import PromoBanner from '@/sanity/schemas/atoms/PromoBanner'

export type HeroSectionProps = {
  data: SanityHeroSection
}

const HeroSection = ({ data, locale }: PropsWithLocale<HeroSectionProps>) => {
  const linearGradient =
    'linear-gradient(75.52deg, #000000 1.5%, rgba(0, 0, 0, 0.8) 9.18%, rgba(0, 0, 0, 0.7) 15.93%, rgba(0, 0, 0, 0.6) 37.5%, rgba(0, 0, 0, 0) 63.68%)'
  return (
    <div
      className={
        'relative z-10 h-[540px] md:h-full flex items-end lg:items-center justify-center'
      }
    >
      <div
        className={'w-full h-[540px] lg:h-full absolute top-0 left-0 -z-10'}
        style={{ background: linearGradient }}
      ></div>
      {data.image && (
        <Image
          className={'absolute -z-20 left-0 top-0 w-full h-[540px] lg:h-full object-cover'}
          style={{ boxShadow: linearGradient }}
          height={538}
          width={1440}
          priority={true}
          sizes={`
              100vw
            `}
          // fill
          src={urlFor(data.image)}
          alt={'hero'}
        />
      )}

      <div className="text-white py-5 z-10 w-full">
        <Container className="-mt-20 md:mt-0 flex items-center md:items-start justify-center md:justify-between flex-col">
          <div className="w-full md:w-[572px]">
            <header className='flex flex-col gap-2.5'>
              <h1 className="text-[28px] md:text-[56px] font-[900] -tracking-[1.68px] leading-[38px] md:leading-[76px] text-center md:text-start ">
                {localizedString(data.title, locale)}
              </h1>
              <p className="text-sm md:text-[20px] leading-[20px] md:leading-[32px] text-center md:text-start ">
                {localizedString(data?.subtitle, locale)}
              </p>
            </header>
            <div className="flex gap-1 md:gap-4 mt-5 md:mt-12 items-center justify-center md:justify-start">
              <PrimaryButton title={'Inquire Now'} />
              <div className='hidden lg:flex' >
                <SecondaryButton title={'Customize Your Own Trip'} />
              </div>
              <div  className='flex lg:hidden'>
                <SecondaryButton title={'Customize Your Trip'} />
              </div>
            </div>
            <p className={'text-xs font-bold text-center md:text-left leading-5 lg:pl-[115px] mt-1.5 text-white/60'}>
              In less than 1 minute
            </p>
          </div>
          <footer className="mt-[28px] md:mt-[71px] flex items-center relative bottom-0">
            {data.scores?.map((score, index) => (
              <React.Fragment key={index}>
                {index !== 0 && (
                  <svg
                    className="mx-[18px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="2"
                    height="75"
                    viewBox="0 0 2 75"
                    fill="none"
                  >
                    <path
                      d="M1 74L1 0.999997"
                      stroke="#FFBB0B"
                      stroke-width="0.689655"
                      stroke-linecap="round"
                    />
                  </svg>
                )}
                <Image
                  src={urlFor(score)}
                  width={136}
                  height={73}
                  alt=""
                  className={'h-[74px] w-auto'}
                />
              </React.Fragment>
            ))}
          </footer>
        </Container>
      </div>
    </div>
  )
}

export default HeroSection
