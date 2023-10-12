import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import ReactStars from 'react-stars'

import { localizedNumber, localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityTourPage } from '@/sanity/types'
import { CaretDown, Check } from '@phosphor-icons/react'

import Input from '@/components/atoms/Input'

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
  setTourData,
  tourData,
}: {
  payment: SanityTourPage['payment']
  tourData: IPaymentTourExtras
  setTourData: Dispatch<SetStateAction<IPaymentTourExtras>>
}) {
  const makeSetValue = (key: string) => {
    return (value: any) => {
      setTourData((prev: any) => ({
        ...prev,
        [key]: value,
      }))
    }
  }
  return (
    <div className="flex flex-col gap-7">
      <div className="p-10 bg-primary border border-darkblue/10 rounded-2xl">
        <p className="text-2xl font-bold text-darkblue">How many people are traveling?</p>
        <div className="grid grid-cols-2 gap-6">
          <Input
            placeholder="Adults (+ 12 year)"
            value={tourData.adultMembers}
            setValue={makeSetValue('adultMembers')}
            type="buttonNumber"
            variant="secondary"
          />
          <Input
            placeholder="Children (3 - 11 year)"
            value={tourData.childrenMembers}
            setValue={makeSetValue('childrenMembers')}
            type="buttonNumber"
            variant="secondary"
          />
        </div>
      </div>
      <HotelChoosing
        room_options={payment?.room_options}
        value={tourData.hotelChoice}
        setValue={makeSetValue('hotelChoice')}
      />
      <RomeType
        room_sharing_options={payment?.room_sharing_options}
        value={tourData.roomType}
        setValue={makeSetValue('roomType')}
        value1={tourData.sharingRoomWith}
        setValue1={makeSetValue('sharingRoomWith')}
      />
      <OptionalVisits
        data={payment?.extras}
        value={tourData.optionalVisits}
        setValue={makeSetValue('optionalVisits')}
      />
      <HelpWithExtras />
    </div>
  )
}

const HotelChoosing = ({
  room_options,
  value,
  setValue,
}: {
  room_options?: Exclude<SanityTourPage['payment'], undefined>['room_options']
  value: any
  setValue: any
}) => {
  const plans = [
    {
      name: 'Basic',
      rating: 4,
      details: 'Comfortable accommodation',
    },
    {
      name: 'Deluxe',
      rating: 5,
      details: 'Comfortable accommodation',
      extra: '$40 Extra',
    },
    {
      name: 'Super Deluxe',
      rating: 6,
      details: 'Comfortable accommodation',
      extra: '$70 Extra',
    },
  ]
  return (
    <div className="bg-darkblue/[0.02] border border-darkblue/10 rounded-2xl overflow-hidden">
      <div className="py-2 bg-blue">
        <p className="text-center text-white font-bold text-xl">Hotel choosing</p>
      </div>
      <div className="py-7 px-10 flex flex-col divide-y divide-yellow">
        {room_options?.map((room, index) => (
          <div key={index} className="flex justify-between gap-2 py-[18px]">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-darkblue text-xl">{localizedString(room.title)}</p>
              {/* @ts-ignore */}
              <ReactStars count={room.rating} value={room.rating} edit={false} size={16} />
              <p className="text-sm font-medium text-gray">{localizedString(room.description)}</p>
            </div>
            <div className="w-[76px] flex flex-col justify-around items-center">
              <Input
                value={value == localizedString(room.title)}
                type="checkbox"
                setValue={() => {
                  if (value == localizedString(room.title)) setValue('')
                  else setValue(localizedString(room.title))
                }}
              />
              {room.price?.initial_price && (
                <p className="text-blue font-medium">
                  {localizedString(room.price?.currency_symbol)}
                  {localizedNumber(room.price?.initial_price)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const RomeType = ({
  room_sharing_options,
  value,
  setValue,
  value1,
  setValue1,
}: {
  room_sharing_options?: Exclude<SanityTourPage['payment'], undefined>['room_sharing_options']
  value: any
  setValue: any
  value1: any
  setValue1: any
}) => {
  const plans = [
    {
      name: 'Signal share room',
      capacity: 1,
      details: 'Comfortable accommodation',
    },
    {
      name: 'Deluxe',
      capacity: 2,
      details: 'Comfortable accommodation',
      extra: '$40 Extra',
    },
    {
      name: 'Super Deluxe',
      capacity: 3,
      details: 'Comfortable accommodation',
      extra: '$70 Extra',
    },
  ]
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
                <p className="font-bold text-darkblue text-xl">{localizedString(option.title)}</p>
                <p className="text-sm font-medium text-gray">
                  {localizedString(option.description)}
                </p>
              </div>
            </div>
            <div className="w-[76px] flex flex-col justify-around items-center">
              <Input
                value={value == localizedString(option.title)}
                type="checkbox"
                setValue={() => {
                  if (value == localizedString(option.title)) setValue('')
                  else setValue(localizedString(option.title))
                }}
              />
              {option.price?.initial_price && (
                <p className="text-blue font-medium">
                  {localizedString(option.price.currency_symbol)}{' '}
                  {localizedNumber(option.price.initial_price)}
                </p>
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-[18px] justify-between py-[18px]">
          <p>Sharing room with someone who is not part of this booking?</p>
          <Input type="text" placeholder="Enter name" setValue={setValue1} value={value1} />
        </div>
      </div>
    </div>
  )
}

const OptionalVisits = ({
  data,
  value,
  setValue,
}: {
  data: Exclude<SanityTourPage['payment'], undefined>['extras']
  value: any
  setValue: any
}) => {
  // const Places = [
  //   {
  //     name: 'Cario Tours',
  //     tours: [
  //       {
  //         id: 1,
  //         name: 'The Egyptian Museum in Cairo',
  //         description:
  //           'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
  //         image: '/demo/tourimage.png',
  //         extra: '$200 Extra',
  //       },
  //       {
  //         id: 2,
  //         name: 'The Egyptian Museum in Cairo',
  //         description:
  //           'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
  //         image: '/demo/tourimage.png',
  //         extra: '$200 Extra',
  //       },
  //       {
  //         id: 3,
  //         name: 'The Egyptian Museum in Cairo',
  //         description:
  //           'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
  //         image: '/demo/tourimage.png',
  //         extra: '$200 Extra',
  //       },
  //       {
  //         id: 4,
  //         name: 'The Egyptian Museum in Cairo',
  //         description:
  //           'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
  //         image: '/demo/tourimage.png',
  //         extra: '$200 Extra',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Luxor Tours',
  //     tours: [
  //       {
  //         id: 5,
  //         name: 'The Egyptian Museum in Cairo',
  //         description:
  //           'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
  //         image: '/demo/tourimage.png',
  //         extra: '$200 Extra',
  //       },
  //       {
  //         id: 6,
  //         name: 'The Egyptian Museum in Cairo',
  //         description:
  //           'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
  //         image: '/demo/tourimage.png',
  //         extra: '$200 Extra',
  //       },
  //       {
  //         id: 7,
  //         name: 'The Egyptian Museum in Cairo',
  //         description:
  //           'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
  //         image: '/demo/tourimage.png',
  //         extra: '$200 Extra',
  //       },
  //       {
  //         id: 8,
  //         name: 'The Egyptian Museum in Cairo',
  //         description:
  //           'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
  //         image: '/demo/tourimage.png',
  //         extra: '$200 Extra',
  //       },
  //     ],
  //   },
  // ]
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
            {place.tours?.map((plan, index) => (
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
                    value={value.includes(localizedString(plan.title))}
                    type="checkbox"
                    setValue={() => {
                      if (value.includes(localizedString(plan.title)))
                        setValue(value.filter((id: any) => id != localizedString(plan.title)))
                      else setValue([...value, localizedString(plan.title)])
                    }}
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
