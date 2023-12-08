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
          <h2 className="text-3xl px-5 z-50  lg:text-[52px]  text-yellow absolute bottom-5 lg:bottom-[70px]  font-black lg:text-center inset-x-0 ">
            Title:
            <span className="text-white">{localizedString(hero_section?.title, locale)}</span>
          </h2>
          <div className=" bg-gradient-to-t w-full h-full top-0 from-black via-transparent to-transparent absolute" />
        </div>
        <OverViewCard slug={slug} data={overview_card} />
        <div className=" h-[56px] mt-[40px] flex flex-col w-full justify-center items-center  md:mt-[48px] relative">
          <TourTabs />
        </div>
        <TourInfoTab/>
      </div>
    </>
  )
}

const TourInfoTab = () => {
  const list = [
    {
      title: 'Inquire Now',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M3 4C1.89543 4 1 4.89543 1 6V7.16147L9.44098 11.382C9.79289 11.5579 10.2071 11.5579 10.559 11.382L19 7.16147V6C19 4.89543 18.1046 4 17 4H3Z"
            fill="white"
            fill-opacity="0.5"
          />
          <path
            d="M19 8.83853L11.2298 12.7236C10.4556 13.1107 9.54436 13.1107 8.77016 12.7236L1 8.83853V14C1 15.1046 1.89543 16 3 16H17C18.1046 16 19 15.1046 19 14V8.83853Z"
            fill="white"
            fill-opacity="0.5"
          />
        </svg>
      ),
    },
    {
      title: 'Tailor Your tour',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <g clip-path="url(#clip0_3436_4400)">
            <path
              d="M4.16473 3.42773C3.77774 3.42773 3.46289 3.74258 3.46289 4.12961C3.46289 4.51661 3.77774 4.83146 4.16473 4.83146C4.55176 4.83146 4.86661 4.51661 4.86661 4.12961C4.86661 3.74258 4.55176 3.42773 4.16473 3.42773Z"
              fill="white"
            />
            <path
              d="M14.9044 18.706C15.2274 17.9268 14.8576 17.0334 14.0784 16.7104C13.2993 16.3874 12.4058 16.7573 12.0828 17.5364C11.7599 18.3156 12.1297 19.2091 12.9088 19.532C13.688 19.855 14.5814 19.4852 14.9044 18.706Z"
              fill="white"
            />
            <path
              d="M10.7539 18.1171C10.7539 17.9597 10.768 17.8056 10.7937 17.6553H2.87957C2.23672 17.6553 1.71371 17.1323 1.71371 16.4894C1.71371 15.8466 2.23672 15.3235 2.87957 15.3235H8.33533C9.5758 15.3235 10.585 14.3143 10.585 13.0739C10.585 11.8334 9.57583 10.8242 8.33533 10.8242H5.93283L5.21156 12.0301H8.33533C8.9109 12.0301 9.37914 12.4983 9.37914 13.0739C9.37914 13.6495 8.91087 14.1177 8.33533 14.1177H2.87957C1.57179 14.1177 0.507812 15.1817 0.507812 16.4894C0.507812 17.7972 1.57179 18.8612 2.87957 18.8612H10.8577C10.7906 18.6245 10.7539 18.3751 10.7539 18.1171Z"
              fill="white"
            />
            <path
              d="M20.4992 9.77124C20.4896 9.53369 20.3414 9.32392 20.1206 9.23562L13.7117 6.67201C13.5259 6.59776 13.3154 6.62039 13.1497 6.73257C12.984 6.84475 12.8848 7.03177 12.8848 7.23182V15.4523C13.0788 15.4084 13.2803 15.3845 13.4873 15.3845C13.6947 15.3845 13.8964 15.4085 14.0906 15.4524V13.3504L20.1647 10.3355C20.3777 10.2298 20.5087 10.0088 20.4992 9.77124Z"
              fill="white"
            />
            <path
              d="M7.89253 4.05466C7.89253 2.01274 6.23721 0.357422 4.19529 0.357422C2.15337 0.357422 0.498047 2.01274 0.498047 4.05466V4.07C0.498047 4.80805 0.695524 5.53264 1.06999 6.16865L3.88352 10.9471C4.01088 11.1634 4.32335 11.1645 4.45219 10.949L7.30599 6.17782C7.68982 5.53615 7.89253 4.80239 7.89253 4.05466ZM4.16622 6.03681C3.1143 6.03681 2.25848 5.181 2.25848 4.12907C2.25848 3.07715 3.1143 2.22134 4.16622 2.22134C5.21814 2.22134 6.07395 3.07715 6.07395 4.12907C6.07395 5.18104 5.21814 6.03681 4.16622 6.03681Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_3436_4400">
              <rect width="20" height="20" fill="white" transform="translate(0.5)" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: 'Contact us',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clip-path="url(#clip0_3436_4409)">
            <path
              d="M0.832031 19.1654L2.12699 14.4579C1.32821 13.0802 0.90805 11.5173 0.908637 9.91616C0.910692 4.90719 5.00544 0.832031 10.0371 0.832031C12.4788 0.833054 14.7706 1.77913 16.4941 3.49626C18.2175 5.2134 19.1662 7.4959 19.1654 9.92346C19.1632 14.9323 15.0678 19.008 10.0371 19.008C10.0368 19.008 10.0372 19.008 10.0371 19.008H10.0331C8.50539 19.0074 7.00439 18.626 5.67112 17.9021L0.832031 19.1654ZM5.89522 16.2576L6.17244 16.4211C7.33708 17.1092 8.6724 17.4731 10.0341 17.4738H10.0371C14.2187 17.4738 17.6222 14.0863 17.624 9.92288C17.6247 7.90524 16.8364 6.00798 15.4039 4.58083C13.9713 3.15368 12.0665 2.36728 10.0399 2.36641C5.85486 2.36641 2.45147 5.75349 2.44986 9.91674C2.44927 11.3435 2.8502 12.7328 3.6098 13.9351L3.79031 14.2208L3.02367 17.007L5.89522 16.2576Z"
              fill="white"
              fill-opacity="0.5"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.66165 5.94464C7.48404 5.54975 7.29697 5.54181 7.1279 5.53495C6.98965 5.52899 6.83142 5.5293 6.67349 5.5293C6.51541 5.5293 6.25845 5.58881 6.04117 5.82608C5.82373 6.06336 5.21094 6.63709 5.21094 7.80393C5.21094 8.97092 6.06085 10.0984 6.17941 10.2568C6.29797 10.415 7.82004 12.886 10.2305 13.8366C12.2338 14.6267 12.6414 14.4696 13.0762 14.4301C13.5111 14.3905 14.4793 13.8563 14.6769 13.3026C14.8746 12.7488 14.8746 12.2743 14.8153 12.175C14.7559 12.0762 14.5978 12.0169 14.3607 11.8983C14.1236 11.7798 12.9577 11.2059 12.7402 11.1268C12.5228 11.0476 12.3647 11.0083 12.2066 11.2457C12.0484 11.4828 11.5943 12.0169 11.4559 12.175C11.3175 12.3335 11.1791 12.3533 10.942 12.2346C10.7049 12.1158 9.94101 11.8655 9.03494 11.0576C8.32999 10.429 7.85391 9.65268 7.71552 9.41526C7.57727 9.17813 7.71323 9.06095 7.81973 8.9314C8.01154 8.69809 8.33334 8.27863 8.41238 8.12055C8.49142 7.96216 8.4519 7.82376 8.3927 7.70505C8.33334 7.58649 7.87238 6.4137 7.66165 5.94464Z"
              fill="white"
              fill-opacity="0.5"
            />
          </g>
          <defs>
            <clipPath id="clip0_3436_4409">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ]

  return (
    <div className=" flex flex-row text-[12px] font-normal flex-wrap justify-evenly bg-blue p-5 md:hidden text-white">
      {list.map((item, key) => (
        <div key={key}>{item.icon}</div>
        <p>
          {item.title}
          </p>
      ))}
    </div>
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
      <div className="lg:absolute grid p-5 grid-cols-2 gap-3 lg:flex max-w-[1200px]  inset-x-0 lg:divide-x-2 divide-darkblue/10 top-[-34px] w-full lg:w-6xl mx-auto bg-primary rounded-t-2xl py-7">
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
        <p className="text-xs font-medium -mt-3 text-red">{data?.cta_helper_text?.en}</p>
      </div>
    </div>
  )
}
