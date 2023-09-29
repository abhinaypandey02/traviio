import { useState } from 'react'
import type { GetStaticProps } from 'next'

// import { urlFor } from '@/sanity/client'
import { LocaleProvider, localizedString } from '@/contexts/LocaleProvider'
import client, { urlFor } from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanityTravelGuide } from '@/sanity/types'
import { LocalePage } from '@/utils/locales'

import Layout from '@/components/layout/index'
import ImageHeaderSection from '@/components/sections/ImageHeaderSection'
import SEO from '@/components/Seo'

type GuidePageProps = {
  data: SanityTravelGuide
  globals: SanityGlobals
} & LocalePage

const ImageHeader = () => {
  return (
    <div className="">
      <div>
        <div>
          <img
            style={{ width: '100%', height: '400px' }}
            src="https://cdn.sanity.io/images/89zc28rs/production/bc0e4c1c45a0a48c177da6e4638d7fc465fb2af2-1920x1080.jpg?w=2000&fit=max&auto=format"
            alt=""
          />

          <h2 className="text-4xl  text-white -translate-y-20  font-extrabold text-center ">
            {'Egypt'}
          </h2>
        </div>
        <div className="px-10 text-sm opacity-80">{''}</div>
      </div>
    </div>
  )
}

const Heading = () => {
  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-blue text-[12px] md:text-[16px] font-[500] leading-[20px] md:leading-[24px] ">
        {'Egypt'}
      </h1>
      <h3 className="text-darkblue text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[50px] ">
        {'Essential Trip Information'}
      </h3>
      <hr className="w-[85px] md:w-[117px] bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] " />
    </div>
  )
}

const InfoSection = () => {
  const cities = ['Egypt', 'Jordan', 'Saudia Arabia', 'Dubai', 'Isral']
  const [head, sethead] = useState(0)
  return (
    <div className="py-20">
      <div className="flex justify-between px-20 ">
        {cities.map((item: any, index: any) => {
          return (
            <h4
              onClick={() => {
                sethead(index)
              }}
              key={index}
              className={
                head == index
                  ? 'my-2 w-full text-center cursor-pointer font-bold  text-yellow'
                  : 'my-2 cursor-pointer  w-full text-center  '
              }
            >
              {item}
              <hr className={head == index ? 'my-3 border-[2px]' : 'my-3'} />
            </h4>
          )
        })}
      </div>

      {/* <hr className='py-5 text-gray opacity-40' /> */}
      <div className="flex gap-x-20 px-20 justify-between">
        <div className="w-1/5 flex flex-col gap-y-2">
          <div className="border-[1px] cursor-pointer text-gray border-gray border-opacity-40 rounded-lg px-3 py-2">
            Important Notes
          </div>

          <div className="bg-blue cursor-pointer  text-white   border-none rounded-lg px-3 py-2">
            Important Notes
          </div>
          <div className="border-[1px] cursor-pointer text-gray border-gray border-opacity-40 rounded-lg px-3 py-2">
            Important Notes
          </div>
          <div className="border-[1px] cursor-pointer text-gray border-gray border-opacity-40 rounded-lg px-3 py-2">
            Important Notes
          </div>
        </div>

        <div className="w-2/3"></div>
      </div>
    </div>
  )
}

export default function GuidePage({ data, locale, globals }: GuidePageProps) {
  return (
    <LocaleProvider locale={locale}>
      <SEO
        title={data?.title && localizedString(data.title, locale)}
        description={data?.tagline && localizedString(data?.tagline, locale)}
        image={data?.image_hero?.image && urlFor(data?.image_hero.image)}
      />
      <Layout globals={globals}>
        {/* {data.sections?.map((section, idx) => (
        <div key={idx}>
               
        </div>
        ))} */}

        <ImageHeader />
        <Heading />
        <InfoSection />
      </Layout>
    </LocaleProvider>
  )
}

export const getStaticProps: GetStaticProps<GuidePageProps> = async ({ locale }) => {
  const guidePageData = (await client.fetch(
    `*[_type == "travel_guide"  && slug.current == "/"][0]`
  )) as SanityTravelGuide
  const globals = (await client.fetch(`*[_type == "globals"][0]`)) as SanityGlobals
  return {
    props: {
      data: guidePageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
