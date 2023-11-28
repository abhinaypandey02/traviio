import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Control,
  FieldErrors,
  useController,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import ReactStars from 'react-stars'

import LocaleContext, { localizedNumber, localizedString } from '@/contexts/LocaleProvider'
import { PaymentSchema } from '@/pages/tours/[slug]/payment'
import { urlFor } from '@/sanity/client'
import { SanityLocale, SanityTourPage } from '@/sanity/types'
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react'

import Input, { ERROR_MESSAGES } from '@/components/atoms/Input'

export interface IPaymentTourExtras {
  adultMembers: number
  childrenMembers: number
  hotelChoice: string
  roomType: string
  sharingRoomWith: string
  optionalVisits: any
}
export default function Page1({
  payment,
  control,
  errors,
  locale,
}: {
  payment: SanityTourPage['payment']
  control: Control<any>
  errors: any
  locale: SanityLocale
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
      <OptionalVisits control={control} data={payment?.extras} locale={locale} />
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
  locale,
}: {
  data: NonNullable<SanityTourPage['payment']>['extras']
  control: Control<any>
  locale: SanityLocale
}) => {
  const { field } = useController({ control, name: 'optionalVisits' })
  const [viewMore, setViewMore] = useState<string>()
  return (
    <div className="bg-darkblue/[0.02] border border-darkblue/10 rounded-2xl overflow-hidden">
      <div className="py-2 bg-blue">
        <p className="text-center text-white font-bold text-xl">Hotel choosing</p>
      </div>
      {data?.map((place, index) => {
        const count = field.value?.[place._key]?.filter(Boolean).length || 0
        return (
          <div key={index}>
            <div className="flex justify-between items-center px-10 pt-10">
              <p className="text-xl font-bold text-blue">
                {localizedString(place.city_name, locale)}
              </p>
              <p className="text-base font-bold text-red">
                ({count}/{place.count})
              </p>
            </div>
            <div className="px-10 flex flex-col divide-y divide-yellow">
              {place.visits?.slice(0, viewMore === place._key ? 9999 : 2).map((plan, index) => (
                <div key={index} className="flex justify-between gap-2 py-[18px]">
                  <div className="flex gap-5">
                    <div className="w-[120px] h-[84px] flex gap-2 border rounded border-blue items-center justify-center">
                      {plan.image && (
                        <Image
                          key={index}
                          alt={localizedString(plan.title)}
                          src={urlFor(plan.image)}
                          height={100}
                          width={100}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-darkblue text-xl">
                        {localizedString(plan.title)}
                      </p>
                      <p className="text-sm font-medium text-gray">
                        {localizedString(plan.description)}
                      </p>
                    </div>
                  </div>
                  <div className="w-[76px] flex flex-col justify-around items-center">
                    <Input
                      disabled={count >= (place.count || 0)}
                      checkboxValue={plan._key}
                      name={`optionalVisits.${place._key}.${index}`}
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
              {(place.visits?.length || 0) > 2 && (
                <div className="px-10 pb-7 pt-4">
                  <button
                    onClick={() => setViewMore((o) => (o === place._key ? undefined : place._key))}
                    className="text-blue flex items-center gap-3 mx-auto font-bold"
                  >
                    View {viewMore === place._key ? 'Less' : 'More'}{' '}
                    {viewMore === place._key ? <CaretUp /> : <CaretDown />}
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      })}
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
