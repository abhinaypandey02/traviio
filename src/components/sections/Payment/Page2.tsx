import React, { Dispatch, SetStateAction, useState } from 'react'
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { PaymentSchema } from '@/pages/tours/[slug]/payment'

import Input from '@/components/atoms/Input'

export interface IContactInfo {
  titlePrefix: string
  firstName: string
  middleName: string
  lastName: string
  dobDate: string
  dobMonth: string
  dobYear: string
  nationality: string
  email: string
  mobileCode: string
  mobileNumber: string
  address: string
  town: string
  state: string
  country: string
  adultPassenger: {
    titlePrefix: string
    firstName: string
    middleName: string
    lastName: string
    dobDate: string
    dobMonth: string
    dobYear: string
    email: string
  }[]
}
export default function Page2({
  register,
  getValues,
  setValue,
  errors,
}: {
  register: UseFormRegister<PaymentSchema>
  getValues: UseFormGetValues<PaymentSchema>
  setValue: UseFormSetValue<PaymentSchema>
  errors: FieldErrors<PaymentSchema>
}) {
  return (
    <div className="md:p-10 md:rounded-2xl overflow-hidden md:border md:border-darkblue/10 flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <p className="text-2xl text-darkblue font-bold">1. Primary Passenger Details</p>
        <p className="text-base text-gray font-medium">
          Have you reviewed the details in the booking summary? If something isn't correct, you can
          adjust your details in the previous steps.
        </p>
      </div>
      <div className="flex flex-col gap-[18px] max-w-[390px]">
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Full Name</p>
          <div className="grid grid-cols-[80px_1fr] gap-3">
            <Input
              name="titlePrefix"
              register={register}
              errorMsg={errors.titlePrefix?.message}
              placeholder="Prefix"
              type="select"
              options={['Mr', 'Ms', 'Dr', 'Pr']}
            />
            <Input
              name="firstName"
              errorMsg={errors.firstName?.message}
              register={register}
              placeholder="First Name"
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="middleName"
            errorMsg={errors.middleName?.message}
            register={register}
            placeholder="Middle Name"
            type="text"
          />
          <Input
            name="lastName"
            errorMsg={errors.lastName?.message}
            register={register}
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Date of Birth</p>
          <div className="grid grid-cols-3 gap-3">
            <Input
              name="dobDate"
              errorMsg={errors.dobDate?.message}
              register={register}
              placeholder="Date"
              options={new Array(31).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              name="dobMonth"
              errorMsg={errors.dobMonth?.message}
              register={register}
              placeholder="Month"
              options={new Array(12).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              name="dobYear"
              errorMsg={errors.dobYear?.message}
              register={register}
              placeholder="Year"
              options={new Array(100).fill(0).map((_, i) => i + 1924)}
              type="select"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Nationality</p>
            <Input
              name="nationality"
              errorMsg={errors.nationality?.message}
              register={register}
              placeholder=" "
              type="select"
              options={['India', 'USA', 'UK', 'Australia']}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Email</p>
            <Input name="email" errorMsg={errors.email?.message} register={register} type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Mobile</p>
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <Input
                name="mobileCode"
                errorMsg={errors.mobileCode?.message}
                register={register}
                type="select"
                options={['+91', '+1', '+44', '+61']}
              />
              <Input
                name="mobileNumber"
                errorMsg={errors.mobileNumber?.message}
                register={register}
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Address</p>
            <Input
              name="address"
              errorMsg={errors.address?.message}
              register={register}
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">Town</p>
              <Input name="town" errorMsg={errors.town?.message} register={register} type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">State</p>
              <Input
                name="state"
                errorMsg={errors.state?.message}
                register={register}
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Country</p>
            <Input
              name="country"
              errorMsg={errors.country?.message}
              register={register}
              type="select"
              placeholder=" "
              options={['India', 'USA', 'UK', 'Australia']}
            />
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-2xl text-darkblue font-bold">2. Adult Passenger Details</p>
      </div>
      <div className="flex flex-col gap-[18px] max-w-[390px]">
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Full Name</p>
          <div className="grid grid-cols-[80px_1fr] gap-3">
            <Input
              name="adultPassenger.0.titlePrefix"
              register={register}
              placeholder="Prefix"
              type="select"
              options={['Mr', 'Ms', 'Dr', 'Pr']}
            />
            <Input
              name="adultPassenger.0.firstName"
              register={register}
              placeholder="First Name"
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="adultPassenger.0.middleName"
            register={register}
            placeholder="Middle Name"
            type="text"
          />
          <Input
            name="adultPassenger.0.lastName"
            register={register}
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Date of Birth</p>
          <div className="grid grid-cols-3 gap-3">
            <Input
              name="adultPassenger.0.dobDate"
              register={register}
              placeholder="Date"
              options={new Array(31).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              name="adultPassenger.0.dobMonth"
              register={register}
              placeholder="Month"
              options={new Array(12).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              name="adultPassenger.0.dobYear"
              register={register}
              placeholder="Year"
              options={new Array(100).fill(0).map((_, i) => i + 1924)}
              type="select"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Email</p>
          <Input name="adultPassenger.0.email" register={register} type="text" />
        </div>
        <button className="font-bold text-base text-blue self-start">Add Passenger</button>
      </div>
    </div>
  )
}
