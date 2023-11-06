import React from 'react'
import Image from 'next/image'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityTravelInfoSection } from '@/sanity/types'

import Container from '@/components/Container'

import Button from './buttons/Button'

const TravelInformation = ({
  data,
  locale,
}: PropsWithLocale<{ data: SanityTravelInfoSection }>) => {
  return (
    <Container>
      <div className="flex flex-col my-8 gap-5 text-center items-center justify-center  rounded-2xl border-yellow border-[1px] shadow-md px-20 py-10 pb-7">
        <Image
          src={data.icon ? urlFor(data.icon) : ''}
          alt={data.icon?.alt?.en ?? ''}
          height={78}
          width={78}
        />

        <h2 className=" text-4xl mt-3 font-medium">{localizedString(data.title, locale)}</h2>
        <h5 className="text-base my-2  px-0 md:px-20 opacity-60">
          {localizedString(data.subtitle, locale)}
        </h5>
        <Button
          varient={data.cta?.type}
          text={data.cta?.label?.en}
          className="px-10 font-bold w-full lg:w-[180px] py-3"
        />
      </div>
    </Container>
  )
}

export default TravelInformation
