import React, { useState } from 'react'
import Image from 'next/image'
import ReactStars from 'react-stars'

import { CaretDown, Check } from '@phosphor-icons/react'

import Input from '@/components/atoms/Input'

export default function Page1() {
  const [formData, setFormData] = useState({
    adultMembers: 0,
    childrenMembers: 0,
    hotelChoice: '',
    roomType: '',
    sharingRoomWith: '',
    optionalVisits: [],
  })
  const makeSetValue = (key: string) => {
    return (value: any) => {
      setFormData((prev) => ({
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
            value={formData.adultMembers}
            setValue={makeSetValue('adultMembers')}
            type="buttonNumber"
            variant="secondary"
          />
          <Input
            placeholder="Children (3 - 11 year)"
            value={formData.childrenMembers}
            setValue={makeSetValue('childrenMembers')}
            type="buttonNumber"
            variant="secondary"
          />
        </div>
      </div>
      <HotelChoosing value={formData.hotelChoice} setValue={makeSetValue('hotelChoice')} />
      <RomeType
        value={formData.roomType}
        setValue={makeSetValue('roomType')}
        value1={formData.sharingRoomWith}
        setValue1={makeSetValue('sharingRoomWith')}
      />
      <OptionalVisits value={formData.optionalVisits} setValue={makeSetValue('optionalVisits')} />
      <HelpWithExtras />
    </div>
  )
}

const HotelChoosing = ({ value, setValue }: { value: any; setValue: any }) => {
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
        {plans.map((plan, index) => (
          <div key={index} className="flex justify-between gap-2 py-[18px]">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-darkblue text-xl">{plan.name}</p>
              {/* @ts-ignore */}
              <ReactStars count={plan.rating} value={plan.rating} edit={false} size={16} />
              <p className="text-sm font-medium text-gray">{plan.details}</p>
            </div>
            <div className="w-[76px] flex flex-col justify-around items-center">
              <Input
                value={value == plan.name}
                type="checkbox"
                setValue={() => {
                  if (value == plan.name) setValue('')
                  else setValue(plan.name)
                }}
              />
              {plan.extra && <p className="text-blue font-medium">{plan.extra}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const RomeType = ({
  value,
  setValue,
  value1,
  setValue1,
}: {
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
        {plans.map((plan, index) => (
          <div key={index} className="flex justify-between gap-2 py-[18px]">
            <div className="flex gap-5">
              <div className="w-[120px] h-[84px] flex gap-2 border rounded border-blue items-center justify-center">
                {new Array(plan.capacity).fill(0).map((_, index) => (
                  <Image key={index} alt="" src={'/bed.svg'} height={24} width={24} />
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-darkblue text-xl">{plan.name}</p>
                <p className="text-sm font-medium text-gray">{plan.details}</p>
              </div>
            </div>
            <div className="w-[76px] flex flex-col justify-around items-center">
              <Input
                value={value == plan.name}
                type="checkbox"
                setValue={() => {
                  if (value == plan.name) setValue('')
                  else setValue(plan.name)
                }}
              />
              {plan.extra && <p className="text-blue font-medium">{plan.extra}</p>}
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

const OptionalVisits = ({ value, setValue }: { value: any; setValue: any }) => {
  const Places = [
    {
      name: 'Cario Tours',
      tours: [
        {
          id: 1,
          name: 'The Egyptian Museum in Cairo',
          description:
            'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
          image: '/demo/tourimage.png',
          extra: '$200 Extra',
        },
        {
          id: 2,
          name: 'The Egyptian Museum in Cairo',
          description:
            'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
          image: '/demo/tourimage.png',
          extra: '$200 Extra',
        },
        {
          id: 3,
          name: 'The Egyptian Museum in Cairo',
          description:
            'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
          image: '/demo/tourimage.png',
          extra: '$200 Extra',
        },
        {
          id: 4,
          name: 'The Egyptian Museum in Cairo',
          description:
            'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
          image: '/demo/tourimage.png',
          extra: '$200 Extra',
        },
      ],
    },
    {
      name: 'Luxor Tours',
      tours: [
        {
          id: 5,
          name: 'The Egyptian Museum in Cairo',
          description:
            'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
          image: '/demo/tourimage.png',
          extra: '$200 Extra',
        },
        {
          id: 6,
          name: 'The Egyptian Museum in Cairo',
          description:
            'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
          image: '/demo/tourimage.png',
          extra: '$200 Extra',
        },
        {
          id: 7,
          name: 'The Egyptian Museum in Cairo',
          description:
            'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
          image: '/demo/tourimage.png',
          extra: '$200 Extra',
        },
        {
          id: 8,
          name: 'The Egyptian Museum in Cairo',
          description:
            'The Egyptian Museum in Cairo, known as simply the Egyptian Museum, located in Cairo, Egypt  located in Cairo, Egypt.',
          image: '/demo/tourimage.png',
          extra: '$200 Extra',
        },
      ],
    },
  ]
  return (
    <div className="bg-darkblue/[0.02] border border-darkblue/10 rounded-2xl overflow-hidden">
      <div className="py-2 bg-blue">
        <p className="text-center text-white font-bold text-xl">Hotel choosing</p>
      </div>
      {Places.map((place, index) => (
        <div key={index}>
          <div className="flex justify-between items-center px-10 pt-10">
            <p className="text-xl font-bold text-blue">{place.name}</p>
            <p className="text-base font-bold text-red">(1/3)</p>
          </div>
          <div className="px-10 flex flex-col divide-y divide-yellow">
            {place.tours.map((plan, index) => (
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
                    <p className="font-bold text-darkblue text-xl">{plan.name}</p>
                    <p className="text-sm font-medium text-gray">{plan.description}</p>
                  </div>
                </div>
                <div className="w-[76px] flex flex-col justify-around items-center">
                  <Input
                    value={value.includes(plan.id)}
                    type="checkbox"
                    setValue={() => {
                      if (value.includes(plan.id))
                        setValue(value.filter((id: any) => id != plan.id))
                      else setValue([...value, plan.id])
                    }}
                  />
                  {plan.extra && <p className="text-blue font-medium">{plan.extra}</p>}
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
