import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import Image from 'next/image'
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import ReactStars from 'react-stars'

import LocaleContext, { localizedNumber, localizedString } from '@/contexts/LocaleProvider'
import { PaymentSchema } from '@/pages/tours/[slug]/payment'
import { urlFor } from '@/sanity/client'
import { SanityTourPage } from '@/sanity/types'
import { CaretDown, Check } from '@phosphor-icons/react'

import Input, { ERROR_MESSAGES } from '@/components/atoms/Input'

export interface IPaymentTourExtras {
  adultMembers: number
  childrenMembers: number
  hotelChoice: string
  roomType: string
  sharingRoomWith: string
  optionalVisits: any[]
}
export default function Page1({
  payment,
  control,
  errors,
}: {
  payment: SanityTourPage['payment']
  control: Control<any>
  errors: any
}) {
  return (
    <div className="flex flex-col gap-7">
      <div className="p-10 bg-primary border border-darkblue/10 rounded-2xl">
        <p className="text-2xl font-bold text-darkblue">How many people are traveling?</p>
        <div className="grid grid-cols-2 gap-6">
          <Input
            control={control}
            name="adultMembers"
            placeholder="Adults (+ 12 year)"
            type="buttonNumber"
            variant="secondary"
            rules={{ required: true }}
          />
          <Input
            name="childrenMembers"
            placeholder="Children (3 - 11 year)"
            control={control}
            type="buttonNumber"
            variant="secondary"
          />
        </div>
      </div>
      <HotelChoosing
        errorMsg={(ERROR_MESSAGES as any)[errors?.['hotelChoice']?.type]}
        control={control}
        room_options={payment?.room_options}
      />
      <RomeType
        errorMsg1={(ERROR_MESSAGES as any)[errors?.['roomType']?.type]}
        control={control}
        room_sharing_options={payment?.room_sharing_options}
      />
      <OptionalVisits control={control} data={payment?.extras} />
      <HelpWithExtras />
    </div>
  )
}

const HotelChoosing = ({
  room_options,
  errorMsg,
  control,
}: {
  room_options?: Exclude<SanityTourPage['payment'], undefined>['room_options']

  errorMsg?: string
  control: Control<any>
}) => {
  const { locale } = useContext(LocaleContext)
  return (
    <div className="bg-darkblue/[0.02] border border-darkblue/10 rounded-2xl overflow-hidden">
      <div className="py-2 bg-blue">
        <p className="text-center text-white font-bold text-xl">Hotel choosing</p>
      </div>
      <div className="py-7 px-10 flex flex-col divide-y divide-yellow">
        {room_options?.map((room, index) => (
          <div key={index} className="flex justify-between gap-2 py-[18px]">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-darkblue text-xl">
                {localizedString(room.title, locale)}
              </p>
              {/* @ts-ignore */}
              <ReactStars count={room.rating} value={room.rating} edit={false} size={16} />
              <p className="text-sm font-medium text-gray">
                {localizedString(room.description, locale)}
              </p>
            </div>
            <div className="w-[76px] flex flex-col justify-around items-center">
              <Input
                checkboxValue={localizedString(room.title)}
                name="hotelChoice"
                type="checkbox"
                control={control}
                rules={{ required: true }}
              />
              {room.price?.initial_price && (
                <p className="text-blue font-medium">
                  {localizedString(room.price?.currency_symbol, locale)}
                  {localizedNumber(room.price?.initial_price, locale)}
                </p>
              )}
            </div>
          </div>
        ))}
        {errorMsg && <span className="font-thin text-xs text-red">{errorMsg}</span>}
      </div>
    </div>
  )
}

const RomeType = ({
  room_sharing_options,
  control,
  errorMsg,
  errorMsg1,
}: {
  room_sharing_options?: Exclude<SanityTourPage['payment'], undefined>['room_sharing_options']
  errorMsg?: string
  errorMsg1?: string
  control: Control<any>
}) => {
  const { locale } = useContext(LocaleContext)

  return (
    <div className="bg-darkblue/[0.02] border border-darkblue/10 rounded-2xl overflow-hidden">
      <div className="py-2 bg-blue">
        <p className="text-center text-white font-bold text-xl">Hotel choosing</p>
      </div>
      <div className="py-7 px-10 flex flex-col divide-y divide-yellow">
        {room_sharing_options?.map((option, index) => (
          <div key={index} className="flex justify-between gap-2 py-[18px]">
            <div className="flex gap-5">
              <div className="w-[120px] h-[84px] flex gap-2 border rounded border-blue items-center justify-center relative">
                <Image key={index} alt="" src={option.image ? urlFor(option.image) : ''} fill />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-darkblue text-xl">
                  {localizedString(option.title, locale)}
                </p>
                <p className="text-sm font-medium text-gray">
                  {localizedString(option.description, locale)}
                </p>
              </div>
            </div>
            <div className="w-[76px] flex flex-col justify-around items-center">
              <Input
                checkboxValue={localizedString(option.title)}
                name="roomType"
                type="checkbox"
                control={control}
                rules={{ required: true }}
              />
              {option.price?.initial_price && (
                <p className="text-blue font-medium">
                  {localizedString(option.price.currency_symbol, locale)}{' '}
                  {localizedNumber(option.price.initial_price, locale)}
                </p>
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-[18px] justify-between py-[18px]">
          <p>Sharing room with someone who is not part of this booking?</p>
          <Input name="Sharing With" type="text" placeholder="Enter name" control={control} />
          {errorMsg1 && <span className="font-thin text-xs text-red">{errorMsg1}</span>}
        </div>
      </div>
    </div>
  )
}

const OptionalVisits = ({
  data,
  control,
}: {
  data: Exclude<SanityTourPage['payment'], undefined>['extras']
  control: Control<any>
}) => {
  const cities = Array.from(new Set(data?.map((item) => localizedString(item.city_name))))
  const Places = cities.map((city) => {
    const cityTours = data?.filter((item) => localizedString(item.city_name) == city)
    return { name: city, tours: cityTours }
  })

  return (
    <div className="bg-darkblue/[0.02] border border-darkblue/10 rounded-2xl overflow-hidden">
      <div className="py-2 bg-blue">
        <p className="text-center text-white font-bold text-xl">Hotel choosing</p>
      </div>
      {Places.map((place, index) => (
        <div key={index}>
          <div className="flex justify-between items-center px-10 pt-10">
            <p className="text-xl font-bold text-blue">{place?.name}</p>
            <p className="text-base font-bold text-red">(1/3)</p>
          </div>
          <div className="px-10 flex flex-col divide-y divide-yellow">
            {place.tours?.map((plan: any, index) => (
              <div key={index} className="flex justify-between gap-2 py-[18px]">
                <div className="flex gap-5">
                  <div className="w-[120px] h-[84px] flex gap-2 border rounded border-blue items-center justify-center">
                    <Image
                      key={index}
                      alt=""
                      src={'/bed.svg'}
                      height={24}
                      width={24}
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-darkblue text-xl">{localizedString(plan.title)}</p>
                    <p className="text-sm font-medium text-gray">
                      {localizedString(plan.description)}
                    </p>
                  </div>
                </div>
                <div className="w-[76px] flex flex-col justify-around items-center">
                  <Input
                    checkboxValue={plan._key}
                    name={'optionalVisits.' + place.name}
                    type="checkbox"
                    control={control}
                  />
                  {plan.price?.initial_price && (
                    <p className="text-blue font-medium whitespace-nowrap">
                      {localizedString(plan.price.currency_symbol)}{' '}
                      {localizedNumber(plan.price?.initial_price)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="px-10 pb-7 pt-4">
        <button className="text-blue flex items-center gap-3 mx-auto font-bold">
          View More <CaretDown />
        </button>
      </div>
    </div>
  )
}

const HelpWithExtras = () => {
  return (
    <div className="flex flex-col gap-6 p-10 rounded-2xl border border-darkblue/10">
      <h3 className="text-2xl font-bold text-darkblue">Would you like help with extras?</h3>
      <div className="text-base font-medium text-gray flex flex-col gap-5">
        <p>
          We can help you book transfers, accommodation, insurance and flights (note: flights and
          insurance are only available in some regions).
        </p>
        <p>Contact our adventure consultants via phone or live chat to discuss your options.</p>
      </div>
    </div>
  )
}
