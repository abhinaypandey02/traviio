import React, { useEffect } from 'react'
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { TailorTripFormData } from '@/pages/tailor_your_tour'
import { Boat, Car, Compass, Cross, FinnTheHuman, Leaf, WaveTriangle } from '@phosphor-icons/react'

import Input from '@/components/atoms/Input'

export default function Step2({
  register,
  setValue,
  getValues,
  errors,
}: {
  register: UseFormRegister<TailorTripFormData>
  setValue: UseFormSetValue<TailorTripFormData>
  getValues: UseFormGetValues<TailorTripFormData>
  errors: FieldErrors<TailorTripFormData>
}) {
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
    setValue('phone', mobileNumber['mobileCode'] + mobileNumber['mobileNumber'], {
      shouldValidate: true,
    })
  }, [mobileNumber, setValue])

  return (
    <div className="grid lg:grid-cols-2 gap-[18px] px-12">
      <Input
        errorMsg={errors.name?.message}
        name="name"
        register={register}
        label="Name*"
        type="text"
      />
      <Input
        errorMsg={errors.email?.message}
        name="email"
        register={register}
        label="Email*"
        type="text"
      />
      <Input
        errorMsg={errors.name?.message}
        name="nationality"
        register={register}
        label="Nationality*"
        options={['Indian', 'American']}
        type="select"
        placeholder="Select your Nationality"
        className="h-[38px]"
      />
      <div className="flex  font-medium text-base text-black flex-col gap-2">
        <label htmlFor="mobileNumber">Mobile</label>
        <div className="border bg-white text-base border-darkblue/10 text-gray rounded p-1 h-[38px] grid grid-cols-[1fr_7fr] gap-1 divide-x-2 divide-darkblue/10">
          <input
            className="min-w-0 w-full flex items-center justify-center py-2 h-full overflow-hidden focus:outline-none"
            id="mobileCode"
            value={mobileNumber['mobileCode']}
            onChange={(e) => {
              setMobileNumber({ ...mobileNumber, mobileCode: e.target.value || '+' })
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
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-base text-black">Number of People*</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input
            errorMsg={errors.numberOfAdults?.message}
            name="numberOfAdults"
            value={getValues('numberOfAdults')}
            setValue={(value: any) => setValue('numberOfAdults', value, { shouldValidate: true })}
            placeholder="Adults"
            type="buttonNumber"
          />
          <Input
            errorMsg={errors.numberOfChildrens?.message}
            name="numberOfChildrens"
            value={getValues('numberOfChildrens')}
            setValue={(value: any) =>
              setValue('numberOfChildrens', value, { shouldValidate: true })
            }
            placeholder="Children"
            type="buttonNumber"
          />
        </div>
      </div>
      <Input
        errorMsg={errors.budget?.message}
        label={
          <p className="flex gap-[6px] items-center">
            Your Budget
            <span className="font-normal text-xs text-gray">(Excluding international flights)</span>
          </p>
        }
        name="budget"
        register={register}
        type="select"
        options={['less than $1000', '$1000-$2000', '$2000-$3000', 'more than $3000']}
        className="h-[38px]"
      />
      <div className="col-span-full">
        <Input
          errorMsg={errors.categories?.message}
          name="categories"
          value={getValues('categories')}
          setValue={(value: any) => setValue('categories', value, { shouldValidate: true })}
          type="boxSelection"
          options={CategoriesOptions}
          label={'Select Categories'}
        />
      </div>
      <div className="col-span-full">
        <Input
          errorMsg={errors.moreInfo?.message}
          type="textarea"
          label="More Information"
          name="moreInfo"
          register={register}
        />
      </div>
    </div>
  )
}
