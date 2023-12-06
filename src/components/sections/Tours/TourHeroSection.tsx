import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReactStars from 'react-stars'

import { localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityLocale, SanityTourPage } from '@/sanity/types'

import Button from '@/components/buttons/Button'

import Breadcrumbs from '@/components/atoms/Breadcrumbs'

export default function TourHeroSection({
  hero_section,
  overview_card,
  slug,
  locale,
}: {
  slug: string
  hero_section: SanityTourPage['hero_section']
  locale: SanityLocale
  overview_card: SanityTourPage['overview_card']
}) {
  return (
    <>
      <div className="">
        <div className=" relative">
          <Image
            src={hero_section?.image ? urlFor(hero_section?.image) : ''}
            className="w-full lg:h-[480px] h-[212px]"
            width={700}
            height={73}
            alt=""
          />
          <h2 className="text-3xl px-5  lg:text-[52px]  text-yellow absolute bottom-5 lg:bottom-[70px]  font-black lg:text-center inset-x-0 ">
            Title:
            <span className="text-white">{localizedString(hero_section?.title, locale)}</span>
          </h2>
        </div>
        <OverViewCard slug={slug} data={overview_card} />
        <div className=" h-[100px] relative">
          <TourTabs />
        </div>
      </div>
    </>
  )
}

const TourTabs = () => {
  const [isFixed, setIsFixed] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)

  const tabsRef = useRef<HTMLDivElement | null>(null)

  const tabs = [
    { name: 'Overview', href: '#' },
    { name: 'Trip highlights', href: '#triphighlights' },
    { name: 'Itinerary', href: '#itinerary' },
    { name: 'Inclusions', href: '#inclusions' },
    { name: 'Essential Travel information', href: '#essentials' },
    { name: 'Reviews', href: '#review' },
  ]
  const handleScroll = () => {
    const scrollPosition = window.scrollY

    setIsFixed(scrollPosition > window.innerHeight / 0.5)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function cNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div
      style={{
        position: isFixed ? 'fixed' : 'absolute',
        top: 0,
        zIndex: 1000,
        marginTop: isFixed ? '0' : '50px',
        backgroundColor: 'white', // Optional: set a background color
      }}
      className=" w-full border-b border-[rgba(20,13,49,0.10)]"
      ref={tabsRef}
    >
      <div className="w-full overflow-x-scroll">
        <div className="px-5">
          <nav
            className="-mb-px flex lg:justify-center lg:items-center justify-start items-start lg:space-x-20 space-x-8"
            aria-label="Tabs"
          >
            {tabs.map((tab, index) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={() => setCurrentTab(index)}
                className={cNames(
                  currentTab === index
                    ? 'border-yellow text-yellow'
                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 border-gray-100 py-4 px-1 lg:text-base text-gray text-xs font-medium'
                )}
                aria-current={currentTab ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

const OverViewCard = ({ data, slug }: { data: SanityTourPage['overview_card']; slug: string }) => {
  const router = useRouter()
  const price: any = data?.price
  return (
    <div className="relative lg:h-[80px] bg-primary lg:bg-transparent pb-5 w-full h-fit ">
      <div className="lg:absolute grid p-5 grid-cols-2 gap-3 lg:flex max-w-[1280px]  inset-x-0 lg:divide-x-2 divide-darkblue/10 top-[-34px] w-full lg:w-6xl mx-auto bg-primary rounded-t-2xl py-7">
        <div className="flex gap-2 bg-white lg:bg-transparent justify-start lg:justify-center lg:px-5 shadow-lg lg:shadow-none shadow-[rgba(200,200,200,0.2)] lg:rounded-none rounded-xl p-2 w-full lg:w-fit">
          <div className="relative lg:h-12 w-8 h-8 lg:w-12">
            <Image alt="" src={'/ColoredCalender.svg'} fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="lg:text-base text-sm font-medium text-gray whitespace-nowrap">Duration</p>
            <p className="lg:text-xl text-lg font-bold text-darkblue">{data?.duration?.en}</p>
          </div>
        </div>

        <div className="flex gap-2 bg-white lg:bg-transparent justify-start lg:justify-center lg:px-5 shadow-lg lg:shadow-none shadow-[rgba(200,200,200,0.2)] lg:rounded-none rounded-xl p-2 w-full lg:w-fit">
          <div className="relative lg:h-12 w-8 h-8 lg:w-12">
            <Image alt="" src={'/ColoredLocation.svg'} fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="lg:text-base text-sm font-medium text-gray whitespace-nowrap">
              {data?.countries} Countries
            </p>
            <p className="lg:text-xl text-lg font-bold text-darkblue">{data?.cities} Cities</p>
          </div>
        </div>

        <div className="flex gap-2 bg-white lg:bg-transparent justify-start lg:justify-center lg:px-5 shadow-lg lg:shadow-none shadow-[rgba(200,200,200,0.2)] lg:rounded-none rounded-xl p-2 w-full lg:w-fit">
          {/* <div className="relative h-12 w-12">
            <Image alt="" src={'/calendar.svg'} fill className="object-contain" />
          </div> */}
          <div className="flex flex-col gap-1">
            <p className="lg:text-base text-sm font-medium text-gray whitespace-nowrap">
              Trip Rating
            </p>
            <div className="flex items-center gap-1 flex-nowrap">
              {/*@ts-ignore*/}
              <ReactStars
                count={5}
                onChange={() => {}}
                edit={false}
                className="flex flex-nowrap"
                value={data?.rating}
                size={16}
                color2={'#ffd700'}
              />
              <p className="lg:text-xl text-lg font-bold text-darkblue">{data?.rating}</p>
            </div>
          </div>
        </div>

        <div className=" gap-2 hidden lg:flex justify-center px-7  w-full">
          <div className="relative h-12 w-12">
            <Image alt="" src={'/add-user 1.svg'} fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="lg:text-base text-sm font-medium text-gray whitespace-nowrap">
              About This Tour
            </p>
            <p className="lg:text-xl text-lg font-bold text-darkblue">{data?.about?.en}</p>
          </div>
        </div>

        <div className="flex gap-2 bg-white lg:bg-transparent justify-start lg:justify-center lg:px-5 shadow-lg lg:shadow-none shadow-[rgba(200,200,200,0.2)] lg:rounded-none rounded-xl p-2 w-full lg:w-fit">
          <div className="relative lg:h-12 w-8 h-8 lg:w-12">
            <Image alt="" src={'/credit-card (2) 1.svg'} fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="lg:text-base text-sm font-medium text-gray whitespace-nowrap">
              Price From
            </p>
            <p className="text-xl font-bold text-darkblue whitespace-nowrap">{price?.en}</p>
          </div>
        </div>
        {/* desktop CTA */}
        <div className="lg:flex hidden  flex-col w-full justify-between items-center  px-7">
          <Link href={`#price-list`}>
            <Button
              text={data?.cta_button?.label?.en}
              varient={data?.cta_button?.type}
              className="text-center text-lg font-semibold px-10 py-3 translate-y-[-10px]"
            />
          </Link>
          <p className="text-xs font-medium text-red">{data?.cta_helper_text?.en}</p>
        </div>
      </div>
      {/* Mobile CTA */}
      <div className="flex lg:hidden flex-col w-full justify-between items-center  px-7">
        <Link href={`#price-list`}>
          <Button
            text={data?.cta_button?.label?.en}
            varient={data?.cta_button?.type}
            className="text-center text-lg font-semibold px-10 py-3 translate-y-[-10px]"
          />
        </Link>
        <p className="text-xs font-medium text-red">{data?.cta_helper_text?.en}</p>
      </div>
    </div>
  )
}
