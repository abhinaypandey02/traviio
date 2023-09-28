import React, { useState } from 'react'
import Image from 'next/image'

import Button from '@/components/buttons/Button'
import Container from '@/components/Container'

import Input from '@/components/atoms/Input'

export default function Tabs({ children }: { children?: any[] }) {
  const [page, setPage] = useState(1)
  return (
    <Container className="flex flex-col gap-16 py-16">
      <div className="flex items-center gap-1 px-6 max-w-[800px] mx-auto w-full h-[68px] ">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setPage(1)
          }}
        >
          <Image alt="" src={'/circleTick.svg'} height={36} width={36} />
          <p className="absolute top-[110%] -translate-x-1/4 text-blue text-base font-medium whitespace-nowrap">
            Trip Extra
          </p>
        </div>
        <hr className="flex-1 bg-yellow text-yellow h-[2px]" />
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setPage(2)
          }}
        >
          <Image alt="" src={'/circleTick.svg'} height={36} width={36} />
          <p className="absolute top-[110%] -translate-x-1/4 text-blue text-base font-medium whitespace-nowrap">
            Your Details
          </p>
        </div>
        <hr className="flex-1 bg-yellow text-yellow h-[2px]" />
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setPage(3)
          }}
        >
          <Image alt="" src={'/circleTick.svg'} height={36} width={36} />
          <p className="absolute top-[110%] -translate-x-1/4 text-blue text-base font-medium whitespace-nowrap">
            Payment
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[5fr_3fr] gap-12">
        {children && (
          <div className="flex flex-col gap-10">
            {children.length >= page ? children[page - 1] : <div>Under Construction</div>}
            <div className="grid grid-cols-2 gap-12">
              {page > 1 ? (
                <Button
                  varient="hollow"
                  text={'Back'}
                  onClick={() => {
                    setPage(page - 1)
                  }}
                />
              ) : (
                <div></div>
              )}
              {page < children.length ? (
                <Button
                  varient="primary"
                  text={'Next'}
                  onClick={() => {
                    setPage(page + 1)
                  }}
                />
              ) : (
                <Button
                  varient="primary"
                  text={'Pay'}
                  onClick={() => {
                    console.log('Paying')
                  }}
                />
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-7">
          <SelectedTour />
          <TripDuration />
          <Costing />
        </div>
      </div>
    </Container>
  )
}

const SelectedTour = () => {
  return (
    <div className="pb-10 px-10 pt-4 bg-primary border border-darkblue/10 rounded-2xl flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-center">Selected Tour</h1>
        <hr className="w-1/4 m-auto my-2 rounded-full border-2 bg-yellow text-yellow " />
      </div>
      <div className="rounded-2xl overflow-hidden">
        <div className="h-[220px] w-full relative">
          <Image alt="" src="/demo/wallpaper.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className="bg-white flex flex-col gap-3 p-4">
          <p className="text-darkblue font-bold text-xl">Valley of the King : Near Luxor</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[6px]">
              <Image alt="" src={'/calendar.svg'} height={18} width={18} />
              <p>11 Days</p>
            </div>
            <div className="flex items-center gap-[6px]">
              <Image alt="" src={'/calendar.svg'} height={18} width={18} />
              <p>1 Countries</p>
            </div>
            <div className="flex items-center gap-[6px]">
              <Image alt="" src={'/map_plain.svg'} height={18} width={18} />
              <p>11 Cities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TripDuration = () => {
  return (
    <div className="bg-primary border border-darkblue/10 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-2 bg-blue p-2">
        <p className="text-sm font-bold text-white place-self-center">Trip Start</p>
        <p className="text-sm font-bold text-white place-self-center">Trip End</p>
      </div>
      <div className="grid grid-cols-2 p-3">
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-darkblue">Tue, 13 June 2023</p>
          <p className="text-gray">London, UK</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-darkblue">Tue, 25 June 2023</p>
          <p className="text-gray">London, UK</p>
        </div>
      </div>
    </div>
  )
}

const Costing = () => {
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  return (
    <div className="bg-primary border border-darkblue/10 rounded-2xl overflow-hidden p-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between gap-2">
            <p className="text-base font-bold text-darkblue">Passengers</p>
            <p className="text-base font-bold text-darkblue">2 Adults</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-base font-medium text-gray">Tour Package</p>
            <p className="text-base font-medium text-gray">2 x $ 2,260.00</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-base font-medium text-gray">Discount</p>
            <p className="text-base font-medium text-green">- $ 100.00</p>
          </div>
          {promoApplied && (
            <div className="flex justify-between gap-2">
              <p className="text-base font-medium text-gray">Promo Code</p>
              <p className="text-base font-medium text-green">- $ 100.00</p>
            </div>
          )}
        </div>
        <hr className="w-full text-yellow" />
        <div className="flex flex-col gap-5">
          <div className="flex justify-between gap-2">
            <p className="text-base font-bold text-darkblue">Original Price</p>
            <p className="text-base font-bold text-darkblue line-through">$ 4,520.00</p>
          </div>
          <div>
            <div className="flex justify-between gap-2">
              <p className="text-base font-bold text-darkblue">Total Price</p>
              <p className="text-base font-bold text-darkblue line-through">$ 4,420.00</p>
            </div>
            <div>
              <p className="text-red font-bold text-[10px] text-end">You save $100</p>
            </div>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <p className="text-base font-bold text-darkblue">Payment Today</p>
            <p className="text-2xl font-bold text-blue">$ 200.00</p>
          </div>
        </div>

        {promoApplied ? (
          <div
            className="flex flex-col items-center gap-2"
            onClick={() => {
              setPromoApplied(false)
            }}
          >
            <div className="w-full text-center py-2 bg-white font-medium text-darkblue text-sm border border-gray rounded">
              {promoCode}
            </div>
            <p className="font-medium text-blue text-base ">Promocode applied</p>
          </div>
        ) : (
          <div className="w-full relative">
            <Input
              placeholder="Add promo code"
              type="text"
              value={promoCode}
              setValue={setPromoCode}
            />
            <button
              className="absolute right-2 inset-y-0 text-blue font-medium"
              onClick={() => {
                if (promoCode.length > 2) setPromoApplied(true)
              }}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
