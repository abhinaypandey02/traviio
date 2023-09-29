import React, { useEffect } from 'react'

import { Boat, Car, Compass, Cross, FinnTheHuman, Leaf, WaveTriangle } from '@phosphor-icons/react'

import Input from '@/components/atoms/Input'

export type TailorTripFormData = {
  name: string
  email: string
  nationality: string
  phone: string
  numberOfAdults: string
  numberOfChildrens: string
  budget: string
  categories: string[]
  moreInfo: string
}
export default function Step2({ onChange }: { onChange: (data: TailorTripFormData) => void }) {
  const [formData, setFormData] = React.useState<TailorTripFormData>({
    name: '',
    email: '',
    nationality: '',
    phone: '',
    numberOfAdults: '',
    numberOfChildrens: '',
    budget: '',
    categories: [],
    moreInfo: '',
  })
  const CategoriesOptions = [
    { name: 'Historic Sites', icon: <Leaf /> },
    { name: 'Religious Sites', icon: <Cross /> },
    { name: 'Beach', icon: <WaveTriangle /> },
    { name: 'Desert Safaris', icon: <Car /> },
    { name: 'Cruises', icon: <Boat /> },
    { name: 'Outdoor Activities', icon: <Compass /> },
    { name: 'Wellness Activities', icon: <FinnTheHuman /> },
  ]
  const [mobileNumber, setMobileNumber] = React.useState({
    mobileCode: '+1',
    mobileNumber: '',
  })
  useEffect(() => {
    onChange(formData)
  }, [formData])
  const makeSetValue = (key: keyof typeof formData) => {
    return (value: any) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  }
  const setValue = (value: string, key: string) => {
    setFormData({ ...formData, [key]: value })
  }
  return (
    <div className="grid lg:grid-cols-2 gap-[18px] px-12">
      <Input setValue={makeSetValue('name')} value={formData.name} label="Name*" type="text" />
      <Input setValue={makeSetValue('email')} value={formData.email} label="Email*" type="text" />
      <Input
        setValue={makeSetValue('nationality')}
        value={formData.nationality}
        label="Nationality*"
        options={['Indian', 'American']}
        type="select"
        placeholder="Select your Nationality"
      />
      <div className="flex  font-medium text-base text-black flex-col gap-2">
        <label htmlFor="mobileNumber">Mobile</label>
        <div className="border bg-white text-base border-darkblue/10 text-gray rounded p-1 h-8 grid grid-cols-[1fr_7fr] gap-1 divide-x-2 divide-darkblue/10">
          <input
            className="min-w-0 w-full flex items-center justify-center h-full overflow-hidden focus:outline-none"
            id="mobileCode"
            value={mobileNumber['mobileCode']}
            onChange={(e) => {
              setMobileNumber({ ...mobileNumber, mobileCode: e.target.value || '+' })
              setValue(mobileNumber['mobileCode'] + mobileNumber['mobileNumber'], 'phone')
              // console.log(mobileNumber)
            }}
          />
          <input
            className="h-full min-w-0 w-full overflow-hidden focus:outline-none px-2"
            id="mobileNumber"
            value={mobileNumber['mobileNumber']}
            placeholder="Mobile Number"
            onChange={(e) => {
              setMobileNumber({ ...mobileNumber, mobileNumber: e.target.value })
              setValue(mobileNumber['mobileCode'] + mobileNumber['mobileNumber'], 'phone')
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-base text-black">Number of People*</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input
            setValue={makeSetValue('numberOfAdults')}
            value={formData.numberOfAdults}
            placeholder="Adults"
            type="buttonNumber"
          />
          <Input
            setValue={makeSetValue('numberOfChildrens')}
            value={formData.numberOfChildrens}
            placeholder="Children"
            type="buttonNumber"
          />
        </div>
      </div>
      <Input
        label={
          <p className="flex gap-[6px] items-center">
            Your Budget
            <span className="font-normal text-xs text-gray">(Excluding international flights)</span>
          </p>
        }
        setValue={makeSetValue('budget')}
        type="select"
        options={['less than $1000', '$1000-$2000', '$2000-$3000', 'more than $3000']}
        value={formData.budget}
      />
      <div className="col-span-full">
        <Input
          setValue={makeSetValue('categories')}
          value={formData.categories}
          type="boxSelection"
          options={CategoriesOptions}
          label={'Select Categories'}
        />
      </div>
      <div className="col-span-full">
        <Input
          type="textarea"
          label="More Information"
          setValue={makeSetValue('moreInfo')}
          value={formData.moreInfo}
        />
      </div>
    </div>
  )
}
