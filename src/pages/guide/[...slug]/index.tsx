import { useState } from 'react'
import Image from 'next/image'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import PortableText from 'react-portable-text'

import { LocaleProvider, localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import client from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanitySlug, SanityTravelGuide } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import Layout from '@/components/layout/index'
import SEO from '@/components/Seo'

type GuidePageProps = {
  slug: string
  data: SanityTravelGuide
  globals: SanityGlobals
} & LocalePage

const ImageHeader = ({ image, Title }: any) => {
  return (
    <div className="">
      <div>
        <div>
          <Image
            src={image ? urlFor(image) : ''}
            style={{ width: '100%', height: '400px' }}
            width={700}
            height={73}
            alt=""
          />

          <h2 className="text-4xl  text-white -translate-y-20  font-extrabold text-center ">
            {Title}
          </h2>
        </div>
        <div className="px-10 text-sm opacity-80">{''}</div>
      </div>
    </div>
  )
}

const Heading = ({ tagline, title }: any) => {
  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="text-blue text-[12px] md:text-[16px] font-[500] leading-[20px] md:leading-[24px] ">
        {title}
      </h1>
      <h3 className="text-darkblue text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[50px] ">
        {tagline}
      </h3>
      <hr className="w-[85px] md:w-[117px] bg-yellow text-yellow h-1 rounded-full md:rounded-[3px] " />
    </div>
  )
}

const InfoSection = ({ data }: any) => {
  // const cities = ['Egypt', 'Jordan', 'Saudia Arabia', 'Dubai', 'Isral']
  const [head, sethead] = useState(0)
  return (
    <div className="py-20">
      {/* <div className="flex justify-between px-20 ">
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
      </div> */}

      {/* <hr className='py-5 text-gray opacity-40' /> */}
      <div className="flex gap-x-20 px-20 justify-between">
        <div className="w-1/5 flex flex-col gap-y-2">
          {data?.map((item: any, index: any) => {
            return (
              <a
                href={'#' + item.title?.en}
                onClick={() => {
                  sethead(index)
                }}
              >
                <div
                  className={
                    head == index
                      ? 'bg-blue cursor-pointer  text-white   border-none rounded-lg px-3 py-2'
                      : 'border-[1px] cursor-pointer text-gray border-gray border-opacity-40 rounded-lg px-3 py-2'
                  }
                >
                  {item.title?.en}
                </div>
              </a>
            )
          })}
        </div>

        <div className="w-2/3">
          {data?.map((item: any, index: any) => {
            return (
              <div key={index} id={item.title?.en} className="mb-10">
                <h2 className="text-2xl font-semibold">{item.title?.en}</h2>
                <hr className="w-1/6 text-yellow bg-yellow h-1 mt-1 my-3 rounded-full" />
                <PortableText content={item.content?.en} serializers={{}} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function GuidePage({ slug, data, locale, globals }: GuidePageProps) {
  return (
    <LocaleProvider locale={locale}>
      <SEO
        title={data?.title && localizedString(data.title, locale)}
        description={data?.tagline && localizedString(data?.tagline, locale)}
        image={data?.image_hero?.image && urlFor(data?.image_hero.image)}
      />
      <Layout locale={locale} breadcrumbs={[]} globals={globals}>
        <ImageHeader image={data?.image_hero?.image} Title={data?.image_hero?.text?.en} />
        <Heading title={data.title?.en} tagline={data?.tagline?.en} />
        <InfoSection data={data?.sections} />
      </Layout>
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(
    `*[_type == "travel_guide" && slug.current != "/"]{slug}.slug`
  )) as SanitySlug[]

  return {
    paths: getPaths(slugs, locales),
    fallback: false,
  }
}

async function fetchBlogPageData(slug: string): Promise<SanityTravelGuide> {
  const guidePage = (await client.fetch(
    `*[_type == "travel_guide"  && slug.current == "${slug}"][0]`
  )) as SanityTravelGuide

  return guidePage
}

export const getStaticProps: GetStaticProps<GuidePageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const guidePageData = await fetchBlogPageData(slug)
  const globals = (await client.fetch(`*[_type == "globals"][0]{
    ...,
    navbar {
  ...,
      links[] {
        ...,
        _type == "tour_dropdown" => {
          ...,
          destinations[] {
            ...,
            destination->,
            tours[]->,
            blogs[]->,
          }
        }
      }
}
}`)) as SanityGlobals
  return {
    props: {
      slug: slug,
      data: guidePageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
