import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'
import { SanityFeaturedPlaceBlogsSection } from '@/sanity/types'

export type SanityFeaturedBlogs = {
  data: SanityFeaturedPlaceBlogsSection
}

const FeatureTopBlogSection = (props: SanityFeaturedBlogs) => {
  const {
    data: { cards },
  } = props
  console.log(cards)
  return (
    <div className="px-32 py-10">
      <div className="grid grid-flow-row grid-cols-2 gap-x-8 gap-y-4">
        <div>
          {cards ? (
            <div className="cursor-pointer relative">
              <Image
                src={cards[0] ? urlFor(cards[0].image) : ''}
                style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                width={700}
                height={73}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-3xl font-semibold">
                  {cards ? cards[0]?.title?.en : null}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="grid grid-flow-row grid-cols-2 gap-x-8 gap-y-4 ">
          {cards ? (
            <div className="cursor-pointer relative">
              <Image
                src={cards[1] ? urlFor(cards[1].image) : ''}
                style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                width={700}
                height={73}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-semibold">
                  {cards ? cards[0]?.title?.en : null}
                </p>
              </div>
            </div>
          ) : null}
          {cards ? (
            <div className="cursor-pointer relative">
              <Image
                src={cards[2] ? urlFor(cards[2].image) : ''}
                style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                width={700}
                height={73}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-semibold">
                  {cards ? cards[0]?.title?.en : null}
                </p>
              </div>
            </div>
          ) : null}
          {cards ? (
            <div className="cursor-pointer relative">
              <Image
                src={cards[3] ? urlFor(cards[3].image) : ''}
                style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                width={700}
                height={73}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-semibold">
                  {cards ? cards[0]?.title?.en : null}
                </p>
              </div>
            </div>
          ) : null}
          {cards ? (
            <div className="cursor-pointer relative">
              <Image
                src={cards[4] ? urlFor(cards[4].image) : ''}
                style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                width={700}
                height={73}
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-semibold">
                  {cards ? cards[0]?.title?.en : null}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default FeatureTopBlogSection
