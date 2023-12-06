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
    const startDate = getFirstDayOfMonth(startMonth)
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
  const prices: SinglePrice[] = generatePriceList(data, 5)
  const [selected, setSelected] = React.useState(-1)
  const [collapsed, setCollapsed] = React.useState(false)
  const [show, setShow] = React.useState(4)
  React.useEffect(() => {
    setCollapsed(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setCollapsed(window.innerWidth < 768)
    })
  }, [])

  return (
    <Container className=" bg-[rgba(20,13,49,0.02)] lg:bg-transparent" id="price-list">
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
            <div
              // onClick={() => datePicker?.current?.}
              className="h-12 w-fit shadow-xl shadow-[#ebebeb] lg:w-[280px] grid grid-cols-[1fr_36px] bg-white divide-x-2 divide-darkblue p-3 border border-darkblue rounded-md"
            >
              <div className="flex gap-3  relative items-center">
                <Image src="/calendar.svg" alt="" height={24} width={24} />
                <input
                  type="date"
                  className="w-5 cursor-pointer opacity-0 scale-[1.5]  z-[100] absolute"
                />
                <p className="text-darkblue font-[600]  text-base">June 2023</p>
              </div>
              <div className="flex justify-end ml-2 items-start">
                <CaretDown height={24} width={24} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className={`grid gap-2 w-full text-[14px]  py-3 px-2 font-semibold lg:text-xl ${
              collapsed ? ' grid-cols-6' : 'grid-cols-12'
            }`}
          >
            <h1 className="text-left ml-5 lg:col-span-2 col-span-2">From</h1>
            <p></p>
            <h1 className="lg:col-span-3 col-span-3">To</h1>
            {!collapsed && (
              <>
                {/* <p className="lg:col-span-3"></p> */}
                <h1 className="lg:col-span-6 col-span-1 text-center">Price</h1>
              </>
            )}
          </div>
          {prices.map((price, index) =>
            index < show ? (
              <div
                className={`rounded-lg  transition-all ${
                  selected !== index ? 'bg-white py-1' : 'bg-blue text-white'
                }`}
                key={index}
              >
                <div
                  className={`grid gap-2 py-3 px-2 cursor-pointer font-semibold text-xl ${
                    collapsed ? ' grid-cols-6' : 'grid-cols-12'
                  }`}
                  onClick={() => {
                    selected === index ? setSelected(-1) : setSelected(index)
                  }}
                >
                  <h1 className={`col-span-2 text-base ${collapsed ? 'text-sm ml-2' : 'ml-5'}`}>
                    {DateFormat(price.from, true)}
                  </h1>
                  <Image
                    src={selected === index ? '/arrow_icon.svg' : '/arrow_blue.svg'}
                    height={9}
                    width={40}
                    alt=""
                    className="my-auto mx-auto"
                  />
                  <h1 className={`col-span-2 text-base ${collapsed && 'text-sm'}`}>
                    {DateFormat(price.to, true)}
                  </h1>
                  {!collapsed && (
                    <>
                      <p
                        className={`col-span-3 text-center text-base ${
                          MAPPINGS[price.availability || 'Available'].availablecolor
                        } ${selected === index ? 'text-white' : ''}`}
                      >
                        {MAPPINGS[price.availability || 'Available'].availability}
                      </p>
                      <div></div>
                      <div
                        className={`col-span-2 text-base text-center flex items-center gap-2 ${
                          MAPPINGS[price.availability || 'Available'].color
                        } ${selected === index ? 'opacity-0' : ''}`}
                      >
                        <p>$ {localizedNumber(price.currentPrice)}</p>
                        {price.actualPrice && (
                          <p className="line-through text-xs">
                            $ {localizedNumber(price.actualPrice)}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  <CaretDown
                    height={20}
                    width={20}
                    className={`ml-auto mr-5 my-auto transition-all ${
                      selected === index && '-rotate-180'
                    }`}
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
                            <Button className="!bg-red flex items-center justify-center gap-1 px-3 !py-3 !my-auto !text-sm">
                              Book Tour
                            </Button>
                          </Link>
                        )}
                      </div>
                      <p className="text-gray mt-3 text-sm">
                        Per person in a {price.roomType || 'Double Seater'}
                      </p>
                      <p className="text-sm">
                        Looking for a Different Room Type?
                        <span className="text-blue"> Find the pricing in the next steps.</span>
                      </p>
                      <p className="text-sm">
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
                        <Button className="!bg-red flex items-center justify-center gap-2 px-5 !py-3 !my-auto !text-xl">
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
