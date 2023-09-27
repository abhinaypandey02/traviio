import React, { useState } from 'react'

import Input from '@/components/atoms/Input'

export default function Page2() {
  const [formData, setFormData] = useState({
    titlePrefix: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    dobDate: '',
    dobMonth: '',
    dobYear: '',
    nationality: '',
    email: '',
    mobileCode: '',
    mobileNumber: '',
    address: '',
    town: '',
    state: '',
    country: '',
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
    <div className="p-10 rounded-2xl overflow-hidden border border-darkblue/10 flex flex-col gap-10">
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
              setValue={makeSetValue('titlePrefix')}
              value={formData.titlePrefix}
              placeholder="Prefix"
              type="select"
              options={['Mr', 'Ms', 'Dr', 'Pr']}
            />
            <Input
              setValue={makeSetValue('firstName')}
              value={formData.firstName}
              placeholder="First Name"
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            setValue={makeSetValue('middleName')}
            value={formData.middleName}
            placeholder="Middle Name"
            type="text"
          />
          <Input
            setValue={makeSetValue('lastName')}
            value={formData.lastName}
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Date of Birth</p>
          <div className="grid grid-cols-3 gap-3">
            <Input
              setValue={makeSetValue('dobDate')}
              value={formData.dobDate}
              placeholder="Date"
              options={new Array(31).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              setValue={makeSetValue('dobMonth')}
              value={formData.dobMonth}
              placeholder="Month"
              options={new Array(12).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              setValue={makeSetValue('dobYear')}
              value={formData.dobYear}
              placeholder="Year"
              options={new Array(100).fill(0).map((_, i) => i + 1924)}
              type="select"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Nationality</p>
            <Input
              setValue={makeSetValue('nationality')}
              value={formData.nationality}
              placeholder=" "
              type="select"
              options={['India', 'USA', 'UK', 'Australia']}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Email</p>
            <Input setValue={makeSetValue('email')} value={formData.email} type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Mobile</p>
            <div className="grid grid-cols-[80px_1fr] gap-3">
              <Input
                setValue={makeSetValue('mobileCode')}
                value={formData.mobileCode}
                type="select"
                options={['+91', '+1', '+44', '+61']}
              />
              <Input
                setValue={makeSetValue('mobileNumber')}
                value={formData.mobileNumber}
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Address</p>
            <Input setValue={makeSetValue('address')} value={formData.address} type="text" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">Town</p>
              <Input setValue={makeSetValue('town')} value={formData.town} type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-darkblue">State</p>
              <Input setValue={makeSetValue('state')} value={formData.state} type="text" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-darkblue">Country</p>
            <Input
              setValue={makeSetValue('country')}
              value={formData.country}
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
              setValue={makeSetValue('titlePrefix')}
              value={formData.titlePrefix}
              placeholder="Prefix"
              type="select"
              options={['Mr', 'Ms', 'Dr', 'Pr']}
            />
            <Input
              setValue={makeSetValue('firstName')}
              value={formData.firstName}
              placeholder="First Name"
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            setValue={makeSetValue('middleName')}
            value={formData.middleName}
            placeholder="Middle Name"
            type="text"
          />
          <Input
            setValue={makeSetValue('lastName')}
            value={formData.lastName}
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Date of Birth</p>
          <div className="grid grid-cols-3 gap-3">
            <Input
              setValue={makeSetValue('dobDate')}
              value={formData.dobDate}
              placeholder="Date"
              options={new Array(31).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              setValue={makeSetValue('dobMonth')}
              value={formData.dobMonth}
              placeholder="Month"
              options={new Array(12).fill(0).map((_, i) => i + 1)}
              type="select"
            />
            <Input
              setValue={makeSetValue('dobYear')}
              value={formData.dobYear}
              placeholder="Year"
              options={new Array(100).fill(0).map((_, i) => i + 1924)}
              type="select"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-darkblue">Email</p>
          <Input setValue={makeSetValue('email')} value={formData.email} type="text" />
        </div>
        <button className="font-bold text-base text-blue self-start">Add Passenger</button>
      </div>
    </div>
  )
}
