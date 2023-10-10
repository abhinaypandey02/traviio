import React, { useState } from 'react'
import Image from 'next/image'

import { SanityPrice, SanityPricingSection, SanityTourTimeline } from '@/sanity/types'
import { ArrowRight, CaretDown, Info } from '@phosphor-icons/react'

import Button from '@/components/buttons/Button'
import Container from '@/components/Container'

function getDay(day: Exclude<SanityTourTimeline['start_day'], undefined>) {
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

export default function PricingSection({ data }: { data: SanityPricingSection }) {
  // The day of the week on which the tour starts
  const startDay = data.weekly_schedule?.start_day ?? 'mon'
  // The duration of the tour in days
  const duration = data.weekly_schedule?.duration ?? 3
  // The default price of the tour
  const price = data.weekly_schedule?.price

  // Prices to override the default price
  const priceOverrides = data.price_override ?? []

  // Generate the next 5 weeks for the tour on the basis of the start day and duration
  const next5WeekPrices: { startDate: Date; endDate: Date; price?: SanityPrice }[] = []
  for (let i = 0; i < 5; i++) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + (i + 1) * 7)
    startDate.setDate(startDate.getDate() + ((getDay(startDay) - startDate.getDay() + 7) % 7))
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + duration)
    // check if the price is overridden for this week
    priceOverrides.filter((override) => {
      const overrideStartDate = new Date(override.timeline?.start_date ?? '')
      const overrideEndDate = new Date(override.timeline?.end_date ?? '')
      return (
        startDate.getTime() >= overrideStartDate.getTime() &&
        endDate.getTime() <= overrideEndDate.getTime()
      )
    })
    if (priceOverrides.length > 0) console.log(priceOverrides[0])

    next5WeekPrices.push({
      startDate,
      endDate,
      price: priceOverrides.length > 0 ? priceOverrides[0].price : price,
    })
  }

  console.log({ next5WeekPrices })

  const prices = [{}, {}, {}, {}, {}]
  return (
    <Container>
      <div className="flex flex-col my-10 gap-12 lg:w-3/4 w-full bg-darkblue/5 rounded-2xl p-7">
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-gray text-base font-medium">
              These dates don't work for you? Tailor your trip here
            </p>
            <p className="text-blue font-bold text-base flex gap-2">
              {<Image src="/lock.svg" alt="" height={24} width={24} />}Secure payments
            </p>
          </div>
          <div>
            <div className="h-12 w-[280px] grid grid-cols-[1fr_36px] bg-white divide-x-2 divide-darkblue p-3 border border-darkblue rounded-md">
              <div className="flex gap-3 items-center">
                <Image src="/calendar.svg" alt="" height={24} width={24} />
                <p className="text-darkblue font-normal text-base">June 2023</p>
              </div>
              <div className="flex justify-end items-start">
                <CaretDown height={24} width={24} />
              </div>
            </div>
            {/* <input type="date" /> */}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="px-7 grid grid-cols-5">
            <div className="col-span-2 grid grid-cols-[2fr_1fr_3fr]">
              <p className="text-lg font-medium text-darkblue">From</p>
              <p></p>
              <p className="text-lg font-medium text-darkblue">To</p>
            </div>
            <p className="text-lg font-medium text-darkblue"></p>
            <p className="text-lg font-medium text-darkblue">Price</p>
            <p className="text-lg font-medium text-darkblue"></p>
          </div>
          <div className="flex flex-col gap-5">
            {prices.map((price, index) => (
              <PriceCard key={index} data={price} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

const PriceCard = ({ data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={`transition-all rounded-2xl border-darkblue/10 ${isOpen ? 'border' : ''}`}>
      <div
        className={`grid grid-cols-5 transition-all justify-between ${
          isOpen ? 'bg-blue text-white' : 'bg-darkblue/[0.02] text-black'
        }  items-center px-7 py-4 ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <div className="col-span-2 grid grid-cols-[2fr_1fr_3fr]">
          <div className={`text-base font-bold ${isOpen ? 'text-white' : 'text-black'}`}>
            02 Jun 2023
          </div>
          <div className="flex items-center">
            <ArrowRight
              width={40}
              weight="bold"
              className={`${isOpen ? 'text-yellow' : 'text-blue'}`}
            />
          </div>
          <div className={`text-base font-bold ${isOpen ? 'text-white' : 'text-black'}`}>
            11 Jun 2023
          </div>
        </div>
        <div className={`text-base font-bold ${isOpen ? 'text-white' : 'text-black'}`}>
          Available
        </div>
        <div className={`text-base font-bold ${isOpen ? 'text-white' : 'text-black'}`}>$ 2,260</div>
        <CaretDown height={24} width={24} className="place-self-end" />
      </div>
      <div
        className={`flex items-center justify-between gap-6 transition-all rounded-b-2xl ${
          !isOpen ? 'overflow-hidden h-0' : 'p-7'
        }`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <p className="font-bold text-5xl text-red">$ 2,543</p>
            <p className="font-bold text-2xl text-gray line-through">$ 2,625</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray flex gap-2">
              Per person in a Double Bedroom <Info height={20} width={20} />
            </p>
            <p className="text-sm">
              Looking for a Different Room Type?{' '}
              <span className="text-blue">Find the pricing in the next steps.</span>
            </p>
            <p className="text-sm">
              <span className="text-blue">Customize your trip</span> with optional tours during
              booking!
            </p>
          </div>
        </div>
        <div>
          <Button
            text={
              <p className="flex gap-2 items-center">
                Book Tour <ArrowRight width={20} height={15} />
              </p>
            }
            className="bg-red px-5 py-3"
          />
        </div>
      </div>
    </div>
  )
}
