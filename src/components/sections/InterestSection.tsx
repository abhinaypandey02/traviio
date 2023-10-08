import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityInterestsSection } from '@/sanity/types'
export type InterestSectionProps = {
  data: SanityInterestsSection
}

const InterestSection = (props: PropsWithLocale<InterestSectionProps>) => {
  const {
    data: { title, tagline, interests },
  } = props
  return (
    <div className="my-10">
      <h2 className="text-blue text-base font-medium text-center">{tagline?.en}</h2>
      <h4 className="text-3xl font-medium text-center">{title?.en}</h4>
      <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />

      <div className="shadow-lg rounded-md mx-28 px-10 py-10 grid grid-flow-row gap-y-10  md:grid-cols-3 grid-cols-1 my-10">
        {interests
          ? interests.map((item: any, index: any) => {
              return (
                <Link
                  href={'/blogs/' + item.slug?.current}
                  key={index}
                  className="justify-center items-center  flex-col"
                >
                  <Image
                    style={{ margin: 'auto' }}
                    src={urlFor(item?.icon)}
                    width={80}
                    height={80}
                    alt=""
                  />
                  <h3 className="text-center my-1 font-semibold text-blue">
                    {localizedString(item?.name, props.locale)}
                  </h3>
                </Link>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default InterestSection
