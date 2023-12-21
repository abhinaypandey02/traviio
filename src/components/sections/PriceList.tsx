import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { localizedNumber } from '@/contexts/LocaleProvider'
import {
  SanityLocaleNumber,
  SanityPrice,
  SanityPricingSection,
  SanityTourTimeline,
} from '@/sanity/types'
import DateFormat, { getFirstDayOfMonth } from '@/utils/utils'
import { ArrowRight, CaretDown } from '@phosphor-icons/react'

import Button from '../buttons/ButtonTwo'
import Container from '../Container'

interface SinglePrice {
  from: Date
  to: Date
  availability?: 'Available' | 'Full' | 'Almost Full' | 'Attention'
  bookingLink?: string
  currentPrice?: SanityLocaleNumber
  actualPrice?: SanityLocaleNumber
  roomType?: string
}

const MAPPINGS = {
  Available: {
    color: 'text-darkblue',
    availablecolor: 'text-darkblue',
    availability: 'Available',
  },
  Full: {
    color: 'text-gray',
    availablecolor: 'text-gray italic',
    availability: 'Full',
  },
  'Almost Full': {
    color: 'text-darkblue',
    availablecolor: 'text-red',
    availability: 'Almost Full',
  },
  Attention: {
    color: 'text-red',
    availablecolor: '',
    availability: 'Available',
  },
}

export function getDay(day: Exclude<SanityTourTimeline['start_day'], undefined>) {
  switch (day) {
    case 'mon':
      return 1
    case 'tue':
      return 2
    case 'wed':
      return 3
    case 'thu':
      return 4
    case 'fri':
      return 5
    case 'sat':
      return 6
    case 'sun':
      return 7
  }
}

function generatePriceList(
  data: SanityPricingSection,
  n: number = 5,
  startMonth: number = new Date().getMonth()
) {
  // The day of the week on which the tour starts
  const startDay = data.weekly_schedule?.start_day ?? 'mon'
  // The duration of the tour in days
  const duration = data.weekly_schedule?.duration ?? 3
  // The default price of the tour
  const price = (data as any)?.price

  // Prices to override the default price
  const priceOverrides = (data as any).price_override ?? []

  // Generate the next 5 weeks for the tour on the basis of the start day and duration
  const next5WeekPrices: {
    from: Date
    to: Date
    currentPrice?: SanityLocaleNumber
    actualPrice?: SanityLocaleNumber
  }[] = []
  for (let i = 0; i < n; i++) {
    const startDate = getFirstDayOfMonth(!Number.isNaN(startMonth) ? startMonth : new Date().getMonth())
    
    startDate.setDate(startDate.getDate() + (i + 1) * 7)
    startDate.setDate(startDate.getDate() + ((getDay(startDay) - startDate.getDay() + 7) % 7))
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + duration)
    // check if the price is overridden for this week
    priceOverrides.filter((override: any) => {
      const overrideStartDate = new Date(override.timeline?.start_date ?? '')
      const overrideEndDate = new Date(override.timeline?.end_date ?? '')
      return (
        startDate.getTime() >= overrideStartDate.getTime() &&
        endDate.getTime() <= overrideEndDate.getTime()
      )
    })

    next5WeekPrices.push({
      from: startDate,
      to: endDate,
      currentPrice:
        priceOverrides.length > 0
          ? priceOverrides[0].price?.discounted_price
          : price?.discounted_price,
      actualPrice:
        priceOverrides.length > 0 ? priceOverrides[0].price?.initial_price : price?.initial_price,
    })
  }
  return next5WeekPrices
}

function PriceList({ data, slug }: { data: SanityPricingSection; slug: string }) {
  const [selected, setSelected] = React.useState(-1)
  const [collapsed, setCollapsed] = React.useState(false)
  const [show, setShow] = React.useState(4)
  const [startMonth, setStartMonth] = React.useState(new Date().getMonth())
  let prices: SinglePrice[] = generatePriceList(data, 5, startMonth)
  React.useEffect(() => {
    setCollapsed(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setCollapsed(window.innerWidth < 768)
    })
  }, [])

  React.useEffect(() => {
    prices = generatePriceList(data, 5, startMonth)
  }, [startMonth])

  return (
    <Container
      className=" bg-[rgba(20,13,49,0.02)] mx-auto max-w-[1312px] px-4 lg:bg-transparent"
      id="price-list"
    >
      <div
        className={` transition-all font-semibold rounded-2xl lg:bg-[rgba(20,13,49,0.02)] bg-transparent bg-opacity-60 w-full  max-w-5xl py-3 lg:px-5 px-0`}
      >
        <div className="flex-col  lg:flex-row  flex justify-between">
          <div className="gap-3 flex flex-col my-2">
            <h1 className="tracking-wide text-[14px] text-gray lg:text-base font-semibold">
              These dates don't work for you? Tailor your trip{' '}
              <Link href={'/tailor_your_tour'} className="text-blue">
                here
              </Link>
            </h1>
            <div className="flex items-center gap-2">
              <Image src="/lock_icon.svg" height={24} width={24} alt="lock" />
              <p className="text-md font-semibold text-[14px] lg:text-base text-blue">
                Secure Payments
              </p>
            </div>
          </div>
          <div className="my-3 flex flex-col justify-end items-end font-semibold">
            {/* <div
              // onClick={() => datePicker?.current?.}
              className="h-12 w-fit shadow-xl shadow-[#ebebeb] lg:w-[280px] grid grid-cols-[1fr_36px] bg-white divide-x-2 divide-darkblue p-3 border border-gray md:border-darkblue rounded-md"
            >
              <div className="flex gap-3  relative items-center">
                <Image src="/calendar.svg" alt="" height={24} width={24} />
                <input
                  type="date"
                  className="w-5 cursor-pointer opacity-0 scale-[1.5]  z-[100] absolute"
                />
                <p className="md:text-darkblue text-gray font-[600] text-[14px]  md:text-base">
                  June 2023
                </p>
              </div>
              <div className="flex justify-end ml-2 items-start">
                <CaretDown height={24} width={24} />
              </div>

            </div> */}
            <input
              type="date"
              name="startMonth"
              id=""
              onChange={(e) => {
                setStartMonth(new Date(e.target.value).getMonth())
                // console.log(new Date(e.target.value).getMonth())
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className={`md:grid  flex frow-row justify-start gap-10 md:gap-2 w-full text-[14px]  py-3 px-2 font-semibold lg:text-xl ${
              collapsed ? ' grid-cols-6' : 'grid-cols-12'
            }`}
          >
            <h1 className="text-left ml-5 lg:col-span-2 col-span-1">From</h1>
            <p></p>
            <h1 className="lg:col-span-3 col-span-1">To</h1>

            <>
              {/* <p className="lg:col-span-3"></p> */}
              <h1 className="lg:col-span-6 col-span-1 md:ml-0 ml-[65px] text-center">Price</h1>
            </>
          </div>
          {prices.map((price, index) =>
            index < show ? (
              <div
                className={`rounded-lg text-darkblue  transition-all ${
                  selected !== index ? 'bg-white py-1' : 'bg-blue text-white'
                }`}
                key={index}
              >
                <div
                  className={`md:grid flex justify-between items-center  gap-2 py-3 md:px-2 px-5 cursor-pointer font-semibold text-xl ${
                    collapsed ? ' grid-cols-6' : 'grid-cols-12'
                  }`}
                  onClick={() => {
                    selected === index ? setSelected(-1) : setSelected(index)
                  }}
                >
                  <h1
                    className={`md:col-span-2 text-base ${
                      collapsed ? ' text-xs md:text-sm ml-2' : 'ml-5'
                    }`}
                  >
                    {DateFormat(price.from, true)}
                  </h1>

                  <Image
                    src={selected === index ? '/arrow_icon.svg' : '/arrow_blue.svg'}
                    height={9}
                    width={40}
                    alt=""
                    className="my-auto hidden md:block mx-auto"
                  />
                  <svg
                    className="block md:hidden "
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10.6674 8.15491C10.6679 8.06431 10.6503 7.97449 10.6154 7.89062C10.5806 7.80674 10.5293 7.73045 10.4645 7.66612L6.26663 3.53547C6.13489 3.40584 5.9562 3.33301 5.76989 3.33301C5.58357 3.33301 5.40489 3.40584 5.27314 3.53547C5.1414 3.66511 5.06738 3.84093 5.06738 4.02427C5.06738 4.2076 5.1414 4.38342 5.27314 4.51306L8.98124 8.15491L5.28014 11.7968C5.16552 11.9285 5.10562 12.0979 5.11243 12.2711C5.11923 12.4444 5.19222 12.6088 5.31682 12.7314C5.44143 12.854 5.60846 12.9258 5.78454 12.9325C5.96062 12.9392 6.13279 12.8803 6.26663 12.7675L10.4645 8.63682C10.5937 8.50859 10.6666 8.33552 10.6674 8.15491Z"
                      fill="#FFBB0B"
                    />
                  </svg>
                  <h1 className={`md:col-span-2 text-xs md:text-base ${collapsed && 'text-sm'}`}>
                    {DateFormat(price.to, true)}
                  </h1>

                  <>
                    <p
                      className={`md:col-span-3 text-center text-xs md:text-base ${
                        MAPPINGS[price.availability || 'Available'].availablecolor
                      } ${selected === index ? 'text-white' : ''}`}
                    >
                      {MAPPINGS[price.availability || 'Available'].availability}
                    </p>
                    <div></div>
                    <div
                      className={`md:col-span-2 text-xs md:text-base text-center md:flex items-center gap-2 ${
                        MAPPINGS[price.availability || 'Available'].color
                      } ${selected === index ? 'opacity-0' : ''}`}
                    >
                      <p>$ {localizedNumber(price.currentPrice)}</p>
                      {price.actualPrice && (
                        <p className="line-through text-gray text-[8px]  md:text-xs">
                          $ {localizedNumber(price.actualPrice)}
                        </p>
                      )}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                    >
                      <path
                        d="M4.97718 5.99999C5.07156 6.00056 5.16512 5.98165 5.25249 5.94434C5.33987 5.90704 5.41933 5.85207 5.48634 5.7826L9.7891 1.28491C9.92414 1.14375 10 0.952306 10 0.752682C10 0.553058 9.92414 0.361611 9.7891 0.220456C9.65406 0.0793003 9.47091 4.62544e-08 9.27994 6.29497e-08C9.08897 7.9645e-08 8.90582 0.0793003 8.77078 0.220456L4.97718 4.19341L1.18358 0.227953C1.0464 0.105146 0.86993 0.040974 0.689446 0.0482611C0.508964 0.0555483 0.337757 0.133758 0.21004 0.26726C0.0823241 0.400762 0.00750547 0.579725 0.000534125 0.768385C-0.00643626 0.957045 0.0549527 1.14151 0.172437 1.28491L4.47519 5.7826C4.60877 5.92108 4.78905 5.99916 4.97718 5.99999Z"
                        fill="#140D31"
                      />
                    </svg>
                  </>

                  <CaretDown
                    height={20}
                    width={20}
                    className={`ml-auto mr-5 hidden md:block
                     my-auto transition-all ${selected === index && '-rotate-180'}`}
                  />
                </div>
                {selected === index && (
                  <div className="bg-white text-darkblue p-8 rounded-b-lg col-span-full flex justify-between">
                    <div className="flex gap-2 flex-col">
                      <div className="flex gap-3 items-center">
                        <h1
                          className={`${
                            MAPPINGS[price.availability || 'Available'].color
                          } font-bold whitespace-nowrap ${collapsed ? 'text-xl' : 'text-4xl'}`}
                        >
                          $ {localizedNumber(price.currentPrice)}
                        </h1>
                        {price.actualPrice && (
                          <h1
                            className={`text-gray line-through text-2xl font-semibold whitespace-nowrap ${
                              collapsed ? 'text-sm' : 'text-2xl'
                            }`}
                          >
                            $ {localizedNumber(price.actualPrice)}
                          </h1>
                        )}
                        {collapsed && (
                          <Link
                            href={`/tours/${slug}/payment?from=${new Date(
                              price.from
                            ).getTime()}&to=${new Date(price.to).getTime()}`}
                            className={`flex items-center ml-auto`}
                          >
                            <Button className="!bg-red flex items-center justify-center gap-1 md:px-3 px-[16px] !py-[5px] md:!py-3 !my-auto !text-sm">
                              Book Tour
                            </Button>
                          </Link>
                        )}
                      </div>
                      <p className="text-gray mt-3 text-xs md:text-sm">
                        Per person in a {price.roomType || 'Double Seater'}
                      </p>
                      <p className="md:text-sm text-[10px]">
                        Looking for a Different Room Type?
                        <span className="text-blue"> Find the pricing in the next steps.</span>
                      </p>
                      <p className="md:text-sm text-xs">
                        <span className="text-blue">Customize your trip</span> with optional tours
                        during booking!
                      </p>
                    </div>
                    {!collapsed && (
                      <Link
                        href={`/tours/${slug}/payment?from=${new Date(
                          price.from
                        ).getTime()}&to=${new Date(price.to).getTime()}`}
                        className={`flex items-center`}
                      >
                        <Button className="!bg-red flex items-center font-medium justify-center gap-2 px-5 !py-3 !my-auto !text-xl">
                          Book Tour <Image height={10} width={20} alt="" src="/white_arrow.png" />
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : null
          )}
          {show < prices.length ? (
            <div
              onClick={() => {
                setShow(show + 4)
              }}
              className="text-center flex gap-x-2 items-center justify-center text-base lg:text-lg font-semibold my-3 text-blue cursor-pointer"
            >
              view All <CaretDown />
            </div>
          ) : (
            <div
              onClick={() => {
                setShow(show - 4)
              }}
              className="text-center  text-base lg:text-lg font-semibold flex gap-x-2 items-center justify-center my-3 text-blue cursor-pointer"
            >
              view less
              <div className="rotate-180">
                <CaretDown />
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default PriceList
