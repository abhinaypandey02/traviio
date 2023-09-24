import React, { useState } from 'react'
import Image from 'next/image'

import { SanityPricingSection } from '@/sanity/types'
import { ArrowDown, ArrowLeft, ArrowRight, CaretDown, Info } from '@phosphor-icons/react'

import Button from '@/components/buttons/Button'

export default function PricingSection({ data }: { data: SanityPricingSection }) {
  const prices = [{}, {}, {}, {}, {}]
  return (
    <div className="bg-white flex flex-col my-10 gap-12 max-w-[1280px] w-[90%] mx-auto bg-darkblue/5 p-7">
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
          <p className="text-lg font-medium text-darkblue">From</p>
          <p className="text-lg font-medium text-darkblue">To</p>
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
        <div className={`text-base font-bold ${isOpen ? 'text-white' : 'text-black'}`}>
          02 Jun 2023
        </div>
        <div className={`text-base font-bold ${isOpen ? 'text-white' : 'text-black'}`}>
          11 Jun 2023
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
