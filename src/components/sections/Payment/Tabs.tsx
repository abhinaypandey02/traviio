import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Control, useForm } from 'react-hook-form'

import LocaleContext, { localizedNumber, localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityPrice, SanityPricingSection, SanityPromoCode, SanityTourPage } from '@/sanity/types'

import Button from '@/components/buttons/Button'
import Container from '@/components/Container'

import Input from '@/components/atoms/Input'

export default function Tabs({
  children,
  tour,
  startDate,
  endDate,
  pricingData,
  adultsNumber,
  childrenNumber,
  addons,
  onSubmit,
  setTotalPrice,
  control,
  trigger,
  loading,
  promo,
}: {
  children?: any[]
  tour: SanityTourPage
  startDate: Date
  endDate: Date
  pricingData: SanityPricingSection
  adultsNumber: number
  childrenNumber: number
  addons: number
  onSubmit: () => void
  setTotalPrice: (a: number) => void
  control: Control<any>
  trigger: () => any
  loading: boolean
  promo: SanityPromoCode[]
}) {
  const [promoCode, setPromoCode] = useState<SanityPromoCode>()
  let priceOverrides = pricingData.price_overrides ?? []
  const price = (pricingData as any)?.price

  priceOverrides = priceOverrides.filter((override: any) => {
    const overrideStartDate = new Date(override.timeline?.start_date ?? '')
    const overrideEndDate = new Date(override.timeline?.end_date ?? '')
    return startDate >= overrideStartDate && endDate <= overrideEndDate
  })

  let actualPrice =
    priceOverrides.length > 0
      ? localizedNumber(priceOverrides[0].price?.initial_price)
      : localizedNumber(price?.initial_price)
  let currentPrice =
    (priceOverrides.length > 0
      ? localizedNumber(priceOverrides[0].price?.discounted_price)
      : localizedNumber(price?.discounted_price)) || actualPrice
  let totalPrice =
    currentPrice * (adultsNumber + childrenNumber) + (addons || 0) * (adultsNumber + childrenNumber)
  let discount = 0
  if (promoCode) {
    discount = Math.min((totalPrice * promoCode.percent) / 100, promoCode.max_discount)
    totalPrice -= discount
  }
  console.log(totalPrice)
  setTotalPrice(totalPrice)
  const [page, setPage] = useState(1)
  useEffect(() => {}, [page])
  return (
    <Container className="flex flex-col gap-16 py-16">
      <div className="flex items-center gap-1 px-6 max-w-[800px] mx-auto w-full h-[68px] ">
        <div
          className="relative cursor-pointer"
          onClick={async () => {
            if (await trigger()) setPage(1)
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
          onClick={async () => {
            if (await trigger()) setPage(2)
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
          onClick={async () => {
            if (await trigger()) setPage(3)
          }}
        >
          <Image alt="" src={'/circleTick.svg'} height={36} width={36} />
          <p className="absolute top-[110%] -translate-x-1/4 text-blue text-base font-medium whitespace-nowrap">
            Payment
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 xl:grid-cols-[5fr_3fr] gap-12 relative">
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
                  disabled={loading}
                  text={loading ? 'Loading...' : 'Next'}
                  onClick={async () => {
                    if (await trigger()) setPage(page + 1)
                  }}
                />
              ) : (
                <Button
                  varient="primary"
                  text={loading ? 'Booking...' : 'Pay'}
                  disabled={loading}
                  onClick={onSubmit}
                />
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-7 sticky top-0">
          <SelectedTour tour={tour} />
          <TripDuration startDate={startDate} endDate={endDate} />
          <Costing
            clearPromoCode={() => setPromoCode(undefined)}
            setPromoCode={(x: string) => {
              const code = promo.find((p) => p.code === x)
              if (code) {
                setPromoCode(code)
                return true
              }
              return false
            }}
            promoCode={promoCode?.code}
            promoCodeDiscount={discount}
            actualPrice={actualPrice}
            currentPrice={currentPrice}
            adults={adultsNumber || 0}
            childrenNumber={childrenNumber || 0}
            addons={addons}
          />
        </div>
      </div>
    </Container>
  )
}

const SelectedTour = ({ tour }: { tour: SanityTourPage }) => {
  const { locale } = useContext(LocaleContext)
  return (
    <div className="pb-10 px-10 pt-4 bg-primary border border-darkblue/10 rounded-2xl flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-center">Selected Tour</h1>
        <hr className="w-1/4 m-auto my-2 rounded-full border-2 bg-yellow text-yellow " />
      </div>
      <div className="rounded-2xl overflow-hidden">
        <div className="h-[220px] w-full relative">
          <Image
            alt=""
            src={(tour.hero_section?.image && urlFor(tour.hero_section?.image)) || ''}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="bg-white flex flex-col gap-3 p-4">
          <p className="text-darkblue font-bold text-xl">
            {localizedString(tour.overview_card?.about, locale)}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[6px]">
              <Image alt="" src={'/calendar.svg'} height={18} width={18} />
              <p>{localizedString(tour.overview_card?.duration, locale)}</p>
            </div>
            <div className="flex items-center gap-[6px]">
              <Image alt="" src={'/calendar.svg'} height={18} width={18} />
              <p>{tour.overview_card?.countries} Countries</p>
            </div>
            <div className="flex items-center gap-[6px]">
              <Image alt="" src={'/map_plain.svg'} height={18} width={18} />
              <p>{tour.overview_card?.cities} Cities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TripDuration = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  return (
    <div className="bg-primary border border-darkblue/10 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-2 bg-blue p-2">
        <p className="text-sm font-bold text-white place-self-center">Trip Start</p>
        <p className="text-sm font-bold text-white place-self-center">Trip End</p>
      </div>
      <div className="grid grid-cols-2 p-3">
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-darkblue">{startDate.toDateString()}</p>
          <p className="text-gray">London, UK</p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-darkblue">{endDate.toDateString()}</p>
          <p className="text-gray">London, UK</p>
        </div>
      </div>
    </div>
  )
}

const Costing = ({
  adults,
  childrenNumber,
  actualPrice,
  currentPrice,
  promoCodeDiscount,
  setPromoCode,
  clearPromoCode,
  promoCode,
  addons,
}: {
  adults: number
  childrenNumber: number
  actualPrice: number
  currentPrice: number
  promoCodeDiscount: number
  setPromoCode: (x: string) => boolean
  clearPromoCode: () => void
  promoCode?: string
  addons?: number
}) => {
  const { control, handleSubmit, setError } = useForm()
  const people = adults + childrenNumber
  const originalPrice = people * actualPrice + parseInt(people.toString()) * (addons || 0)
  const totalPrice = people * (currentPrice + (addons || 0)) - promoCodeDiscount
  return (
    <div className="bg-primary border border-darkblue/10 rounded-2xl overflow-hidden p-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between gap-2">
            <p className="text-base font-bold text-darkblue">Passengers</p>
            <p className="text-base font-bold text-darkblue">
              {adults > 0 && `${adults} Adults`}
              {childrenNumber > 0 && (
                <>
                  <br />
                  {`${childrenNumber} Children`}
                </>
              )}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-base font-medium text-gray">Tour Package</p>
            <p className="text-base font-medium text-gray">
              {`${parseInt(people.toString())} x $ ${actualPrice}`}
            </p>
          </div>
          {addons != 0 && (
            <div className="flex justify-between gap-2">
              <p className="text-base font-medium text-gray">Addons</p>
              <p className="text-base font-medium text-gray">
                {parseInt(people.toString())} x $ {addons}
              </p>
            </div>
          )}
          {actualPrice != currentPrice && parseInt(adults.toString()) != 0 && (
            <div className="flex justify-between gap-2">
              <p className="text-base font-medium text-gray">Discount</p>
              <p className="text-base font-medium text-green">
                - $ {parseInt(people.toString()) * (actualPrice - currentPrice)}
              </p>
            </div>
          )}
          {promoCodeDiscount > 0 && (
            <div className="flex justify-between gap-2">
              <p className="text-base font-medium text-gray">Promo Code</p>
              <p className="text-base font-medium text-green">- $ {promoCodeDiscount}</p>
            </div>
          )}
        </div>
        <hr className="w-full text-yellow" />
        <div className="flex flex-col gap-5">
          {originalPrice != totalPrice && (
            <div className="flex justify-between gap-2">
              <p className="text-base font-bold text-darkblue">Original Price</p>
              <p className="text-base font-bold text-darkblue line-through">$ {originalPrice}</p>
            </div>
          )}
          <div>
            <div className="flex justify-between gap-2">
              <p className="text-base font-bold text-darkblue">Total Price</p>
              <p className="text-base font-bold text-darkblue">$ {totalPrice}</p>
            </div>
            {originalPrice != totalPrice && (
              <div>
                <p className="text-red font-bold text-[10px] text-end">
                  You save ${(originalPrice - totalPrice).toFixed(2)}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-between gap-2 items-center">
            <p className="text-base font-bold text-darkblue">Payment Today</p>
            <p className="text-2xl font-bold text-blue">$ {totalPrice}</p>
          </div>
        </div>

        {promoCode ? (
          <div className="flex flex-col items-center gap-2" onClick={clearPromoCode}>
            <div className="w-full text-center py-2 bg-white font-medium text-darkblue text-sm border border-gray rounded">
              {promoCode}
            </div>
            <p className="font-medium text-blue text-base ">Promocode applied</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit((data) => {
              if (!setPromoCode(data.promoCode)) {
                setError('promoCode', {
                  type: 'invalid',
                  message: 'This code is invalid',
                })
              }
            })}
            className="w-full relative"
          >
            <Input
              rules={{ required: true }}
              placeholder="Add promo code"
              type="text"
              control={control}
              name="promoCode"
            />
            <button className="absolute right-2 inset-y-0 text-blue font-medium">Apply</button>
          </form>
        )}
      </div>
    </div>
  )
}
