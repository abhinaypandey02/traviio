import { useState } from 'react'
import Image from 'next/image'
import type { GetStaticPaths, GetStaticProps } from 'next/types'
import { AnyARecord } from 'dns'
import PortableText from 'react-portable-text'

import { LocaleProvider, localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import client from '@/sanity/client'
import { SanityGlobals, SanityLocale, SanitySlug, SanityTravelWiki } from '@/sanity/types'
import { getPaths, LocalePage } from '@/utils/locales'
import { getSanitySlugFromSlugs } from '@/utils/utils'

import Layout from '@/components/layout/index'
import NewsletterSection from '@/components/sections/NewsletterSection'
import SEO from '@/components/Seo'
import Wiki_DisclosureItems from '@/components/wiki/Wiki_DisclosureItems'

import App_Tabs from '../../../components/molecule/App_Tabs'

type WikiPageProps = {
  slug: string
  data: SanityTravelWiki
  globals: SanityGlobals
} & LocalePage

const ImageHeader = ({ image, Title }: any) => {
  return (
    <div className="">
      <div>
        <div>
          <div className="lg:h-[30rem] sm:h-[200px] sm:relative max-sm:text-center">
            <Image
              src={image ? urlFor(image) : ''}
              style={{ width: '100%', height: '100%' }}
              width={1400}
              height={400}
              alt=""
              className="object-cover"
            />
            <div
              style={{
                background: 'linear-gradient(343deg, #000 -20.24%, rgba(0, 0, 0, 0.00) 88.74%)',
              }}
              className="absolute max-sm:hidden inset-0 w-full h-full pointer-events-none"
            />
            <h2 className="max-sm:mt-4 sm:absolute bottom-16 inset-x-0 text-xl sm:text-6xl text-black sm:text-white font-extrabold text-center">
              {Title}
            </h2>
            <hr className="w-10 mx-auto sm:hidden bg-yellow text-yellow h-[1.5px] mt-1 rounded-full md:rounded-[3px] " />
            <p className="sm:hidden px-6 text-sm font-normal pt-6 leading-6">
              Egypt, a captivating land of ancient wonders, beckons travelers with its rich history
              and timeless allure. From the towering pyramids of Giza to the magnificent temples of
              Luxor and the vibrant streets of Cairo, Egypt offers a tapestry of experiences that
              transport you to a bygone era.
            </p>
          </div>
        </div>
        <div className="px-10 text-sm opacity-80">{''}</div>
      </div>
    </div>
  )
}
const Heading = ({ tagline, title }: any) => {
  return (
    <div className="flex flex-col items-center p-2 space-y-2 py-6 pt-14 max-sm:text-center">
      <h1 className="text-blue text-[12px] md:text-[16px] font-[500] leading-[20px] md:leading-[24px] ">
        {title}
      </h1>
      <h3 className="text-darkblue text-[24px] md:text-[40px] font-bold leading-[32px] md:leading-[50px] ">
        {tagline}
      </h3>
      <hr className="w-40 md:w-[117px] bg-yellow text-yellow h-[3px] mt-2 rounded-full md:rounded-[3px] " />
    </div>
  )
}
const InfoSection = ({ data }: any) => {
  // const cities = ['Egypt', 'Jordan', 'Saudia Arabia', 'Dubai', 'Isral']
  const [head, sethead] = useState(0)

  return (
    <div className="py-20 max-w-7xl mx-auto">
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
      <div className="lg:flex-row flex flex-col gap-x-16 px-4 justify-between mt-4">
        {/* <div className="w-1/5 flex flex-col gap-y-2">
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
        </div> */}
        <Wiki_DisclosureItems />

        <div className="lg:w-2/3 w-full lg:mt-0 mt-20">
          {data?.map((item: any, index: any) => {
            return (
              <div key={index} id={item.title?.en} className="mb-10">
                <h2 className="text-2xl font-semibold">{item.title?.en}</h2>
                <hr className="w-1/6 text-yellow bg-yellow h-1 mt-1 my-3 rounded-full" />
                {item.content?.en && <PortableText content={item.content?.en} serializers={{}} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function WikiPage({ slug, data, locale, globals }: WikiPageProps) {
  // href - is the respective scetion so it auto scrolls to that section when active

  const tabs = [
    { name: 'Egypt', href: '#' },
    { name: 'Jordan', href: '#' },
    { name: 'Dubai', href: '#' },
    { name: 'Saudi Arabia', href: '#' },
    { name: 'Israel', href: '#' },
    { name: 'Turkey', href: '#' },
  ]
  const promoBannerTest: any = {
    _id: '123',
    _key: '12345',
    _type: 'promo_banner',
    link: {
      _type: 'link',
      text: {
        _type: 'locale_string',
        en: 'Book now',
      },
      url: '/',
    },
    text: {
      en: 'More summer for less. Save up to 20% off selected trips*.',
      _type: 'locale_string',
    },
  }
  const newsletterStatic: any = {
    data: {
      subtitle: {
        _type: 'locale_string',
        en: 'Be the first to know about our latest travel deals, special promotions, and insider tips',
      },
      _type: 'newsletter_section',
      _key: '75d74a4ff9c3',
      title: {
        _type: 'locale_string',
        en: 'Join Our Travel Community and Unlock Exclusive Deals!',
      },
      image: {
        asset: {
          _ref: 'image-38956b0ed7d0d908e7b716cda8b2dfe39b9454f8-2560x888-png',
          _type: 'reference',
        },
        _type: 'image',
      },
    },
    locale: 'en',
  }
  return (
    <LocaleProvider locale={locale}>
      <SEO
        title={data?.title && localizedString(data.title, locale)}
        description={data?.tagline && localizedString(data?.tagline, locale)}
        image={data?.image_hero?.image && urlFor(data?.image_hero.image)}
      />
      <Layout
        locale={locale}
        breadcrumbs={[
          { label: 'Wiki', value: '/wiki' },
          { label: 'Egypt', value: '#' },
        ]}
        globals={globals}
        promo_banner={promoBannerTest}
      >
        <ImageHeader image={data?.image_hero?.image} Title={data?.image_hero?.text?.en} />
        <Heading title={data.title?.en} tagline={data?.tagline?.en} />
        <App_Tabs tabs={tabs} />
        <InfoSection data={data?.sections} />
        <div className="mb-20">
          <NewsletterSection data={newsletterStatic.data} locale={newsletterStatic.locale} />
        </div>
      </Layout>
    </LocaleProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = (await client.fetch(
    `*[_type == "travel_wiki" && slug.current != "/"]{slug}.slug`
  )) as SanitySlug[]
  return {
    paths: getPaths(slugs, locales),
    fallback: false,
  }
}

async function fetchBlogPageData(slug: string): Promise<SanityTravelWiki> {
  const wikiPage = (await client.fetch(
    `*[_type == "travel_wiki"  && slug.current == "${slug}"][0]`
  )) as SanityTravelWiki

  return wikiPage
}

export const getStaticProps: GetStaticProps<WikiPageProps> = async ({ params, locale }) => {
  const slug = getSanitySlugFromSlugs(params?.slug)
  const wikiPageData = await fetchBlogPageData(slug)
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
      data: wikiPageData,
      locale: (locale ?? 'en') as SanityLocale,
      globals,
    },
  }
}
