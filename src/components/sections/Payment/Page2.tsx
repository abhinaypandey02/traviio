import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'

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
export default function Page2({ control }: { control: Control<any> }) {
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
              control={control}
              placeholder="Prefix"
              type="select"
              options={['Mr', 'Ms', 'Dr', 'Pr']}
              rules={{ required: true }}
            />
            <Input
              rules={{ required: true }}
              name="firstName"
              control={control}
              placeholder="First Name"
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input name="middleName" control={control} placeholder="Middle Name" type="text" />
          <Input
            rules={{ required: true }}
            name="lastName"
            control={control}
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Date of Birth</p>
          <div className="grid grid-cols-3 gap-3">
            <Input
              name="dobDate"
              control={control}
              placeholder="Date"
              options={new Array(31).fill(0).map((_, i) => i + 1)}
              type="select"
              rules={{ required: true }}
            />
            <Input
              name="dobMonth"
              control={control}
              placeholder="Month"
              options={new Array(12).fill(0).map((_, i) => i + 1)}
              type="select"
              rules={{ required: true }}
            />
            <Input
              name="dobYear"
              control={control}
              placeholder="Year"
              options={new Array(100).fill(0).map((_, i) => i + 1924)}
              type="select"
              rules={{ required: true }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Nationality</p>
            <Input
              name="nationality"
              control={control}
              placeholder=" "
              rules={{ required: true }}
              type="select"
              options={['India', 'USA', 'UK', 'Australia']}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Email</p>
            <Input rules={{ required: true }} name="email" control={control} type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Mobile</p>
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <Input
                name="mobileCode"
                rules={{ required: true }}
                control={control}
                type="select"
                options={['+91', '+1', '+44', '+61']}
              />
              <Input
                name="mobileNumber"
                rules={{ required: true }}
                control={control}
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Address</p>
            <Input rules={{ required: true }} name="address" control={control} type="text" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">Town</p>
              <Input name="town" control={control} type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">State</p>
              <Input rules={{ required: true }} name="state" control={control} type="text" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Country</p>
            <Input
              rules={{ required: true }}
              name="country"
              control={control}
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
              rules={{ required: true }}
              control={control}
              placeholder="Prefix"
              type="select"
              options={['Mr', 'Ms', 'Dr', 'Pr']}
            />
            <Input
              name="adultPassenger.0.firstName"
              rules={{ required: true }}
              control={control}
              placeholder="First Name"
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="adultPassenger.0.middleName"
            control={control}
            placeholder="Middle Name"
            type="text"
          />
          <Input
            name="adultPassenger.0.lastName"
            rules={{ required: true }}
            control={control}
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Date of Birth</p>
          <div className="grid grid-cols-3 gap-3">
            <Input
              name="adultPassenger.0.dobDate"
              rules={{ required: true }}
              control={control}
              placeholder="Date"
              options={new Array(31).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              name="adultPassenger.0.dobMonth"
              rules={{ required: true }}
              control={control}
              placeholder="Month"
              options={new Array(12).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              name="adultPassenger.0.dobYear"
              rules={{ required: true }}
              control={control}
              placeholder="Year"
              options={new Array(100).fill(0).map((_, i) => i + 1924)}
              type="select"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Email</p>
          <Input
            rules={{ required: true }}
            name="adultPassenger.0.email"
            control={control}
            type="text"
          />
        </div>
        <button className="font-bold text-base text-blue self-start">Add Passenger</button>
      </div>
    </div>
  )
}
