import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityTopThingsSection } from '@/sanity/types'

import Container from '@/components/Container'

export type TopThings = {
  data: SanityTopThingsSection
}

const TopThingsToDo = (TopThings: any) => {
  return (
    <div>
      <Container>
        <header className="pb-5">
          <p className="text-blue text-xs md:text-base font-medium text-center uppercase leading-tight md:leading-normal">
            {/* {localizedString(tagline, props.locale)} */}
            {TopThings?.data?.tagline?.en}
          </p>
          <div className="text-2xl mt-2 md:mt-3 -tracking-[1.2px] mb-[30px] md:mb-12 w-fit mx-auto md:text-[40px] font-bold leading-[32px] md:leading-[50px] text-center">
            {/* <h2>{localizedString(title, props.locale)}</h2> */}
            <h2>{TopThings?.data?.title?.en}</h2>
            <hr className=" mt-[4px] md:mt-[12px] w-2/3 md:w-[117px] mx-auto text-yellow  bg-yellow  rounded-full border-b-2" />
          </div>
        </header>
        <div className="p-10 grid grid-flow-row gap-x-6 grid-cols-4">
          {TopThings?.data?.top_things?.map((item: any, index: any) => {
            return (
              <Link href={item?.link?.en} className="shadow-md" key={index}>
                <Image alt={''} height={300} width={300} src={urlFor(item.image)} />
                <div className="px-2">
                  <h2 className="my-1 text-xl font-semibold">{item?.title?.en}</h2>
                  <h3 className="my-1 mb-2">{item?.description?.en}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default TopThingsToDo
