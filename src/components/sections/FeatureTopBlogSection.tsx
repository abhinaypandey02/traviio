import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityFeaturedPlaceBlogsSection } from '@/sanity/types'

export type SanityFeaturedBlogs = {
  data: SanityFeaturedPlaceBlogsSection
}

const FeatureTopBlogSection = (props: PropsWithLocale<SanityFeaturedBlogs>) => {
  const {
    data: { cards },
  } = props
  return (
    <div className="md:px-32 px-10 md:py-10 py-5">
      <div className="grid grid-cols-4 gap-7">
        {cards?.map((card, i) => (
          <Link
            href={'/blogs' + card.slug?.current}
            className={
              'bg-red h-[224px] relative rounded-2xl overflow-hidden ' +
              ((i + 1) % 3 === Math.floor(i / 3) ? 'col-span-2' : '')
            }
          >
            <div
              className={
                'absolute bottom-2.5 font-bold text-white left-3 bg-blue rounded-2xl px-4 py-1.5'
              }
            >
              {localizedString(card.name, props.locale)}
            </div>
            {card.meta_data?.meta_image && (
              <Image
                src={urlFor(card.meta_data?.meta_image)}
                className={'w-full h-full object-cover'}
                height={224}
                width={300}
                alt={localizedString(card.meta_data?.meta_title, props.locale)}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FeatureTopBlogSection
