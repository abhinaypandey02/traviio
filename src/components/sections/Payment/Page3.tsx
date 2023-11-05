import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { set } from 'mongoose'

import Input from '@/components/atoms/Input'
import OptionSelectButton from '@/components/atoms/OptionSelectButton'

export default function Page3() {
  const [formData, setFormData] = useState({
    bookingMode: 'payFull',
    paymentOption: 'creditCard',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
    agreeTAndC: false,
    readTripInfo: false,
    receiveUpdates: false,
  })
  const makeSetValue = (key: string) => {
    return (value: any) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  }
  const setValue = (value: any, key: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
  const CARDS = [
    '/visa_card.png',
    '/visa_card.png',
    '/visa_card.png',
    '/visa_card.png',
    '/visa_card.png',
    '/visa_card.png',
  ]
  return (
    <div className="md:p-10 md:rounded-2xl overflow-hidden md:border border-darkblue/10 flex flex-col gap-12">
      <div className="text-base text-gray font-medium">
        Have you reviewed the details in the booking summary? If something isn't correct, you can
        adjust your details in the previous steps.
      </div>

      <div className="text-base text-gray bg-primary p-5 rounded-2xl">
        Please note that you won't be charged immediately, and your booking will be confirmed by our
        travel specialist within 1-4 days.
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-2xl text-darkblue font-bold">Payment options</p>
        <div
          className="flex items-center text-base text-darkblue font-medium gap-2 cursor-pointer"
          onClick={() => {
            setValue('payFull', 'bookingMode')
          }}
        >
          <OptionSelectButton value={formData.bookingMode == 'payFull'} />
          <p>Pay in full USD $11,850.00</p>
        </div>
        <div
          className="flex items-center text-base text-darkblue font-medium gap-2 cursor-pointer"
          onClick={() => {
            setValue('secureSpot', 'bookingMode')
          }}
        >
          <OptionSelectButton value={formData.bookingMode == 'secureSpot'} />
          <p>Secure your spot with a deposit of $200 </p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <Image alt="" src="/ColoredCalender.svg" width={28} height={28} />
          <p className="text-lg text-darkblue font-medium">
            Payment plan available when you login into your account
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Image alt="" src="/refund.svg" width={28} height={28} />
          <div>
            <p className="text-lg text-darkblue font-medium">
              Book now and change your mind if you have to
            </p>
            <p className="text-sm text-gray">
              Get a full refund before 13 March 2023, terms and conditions apply
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-2xl text-darkblue font-bold">We Accept</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {CARDS.map((item, index) => {
            return (
              <Image
                width={50}
                height={32}
                src={item}
                alt=""
                key={index}
                className="w-[50px] h-[32px]"
              />
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-2xl text-darkblue font-bold">Payment options</p>
        <div className="flex flex-col gap-4">
          <div>
            <div
              className={`flex items-center gap-2 rounded px-3 py-[14px] text-lg font-medium border border-darkblue/10 ${
                formData.paymentOption == 'creditCard' ? 'text-blue' : 'text-darkblue'
              }`}
              onClick={() => {
                setValue('creditCard', 'paymentOption')
              }}
            >
              <OptionSelectButton value={formData.paymentOption == 'creditCard'} /> Credit & Debit
              Cards
            </div>
            {formData.paymentOption == 'creditCard' && (
              <div className="px-4 md:px-10 py-7">
                <div className="flex flex-col gap-[18px] max-w-[390px]">
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-medium text-darkblue">Card Holder Number</p>
                    <Input
                      setValue={makeSetValue('cardHolderName')}
                      value={formData.cardHolderName}
                      type="text"
                      placeholder=""
                      name="cardHolderName"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-medium text-darkblue">Card Number</p>
                    <Input
                      setValue={makeSetValue('cardNumber')}
                      value={formData.cardNumber}
                      type="text"
                      placeholder="1234 5678 3245 9101"
                      name="cardNumber"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-medium text-darkblue">Expiry Date</p>

                      <Input
                        setValue={makeSetValue('expiryDate')}
                        value={formData.expiryDate}
                        placeholder="MM / YY"
                        type="text"
                        name="expiryDate"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-medium text-darkblue">Security Code</p>
                      <Input
                        setValue={makeSetValue('securityCode')}
                        value={formData.securityCode}
                        placeholder="123"
                        type="text"
                        name="securityCode"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <div
              className={`flex items-center gap-2 rounded px-3 py-[14px] text-lg font-medium border border-darkblue/10 ${
                formData.paymentOption == 'paypal' ? 'text-blue' : 'text-darkblue'
              }`}
              onClick={() => {
                setValue('paypal', 'paymentOption')
              }}
            >
              <OptionSelectButton value={formData.paymentOption == 'paypal'} /> PayPal
            </div>
            {formData.paymentOption == 'paypal' && (
              <div className="px-4 md:px-10 py-7">
                <div className="flex flex-col gap-[18px] max-w-[390px]">
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-medium text-darkblue">Card Holder Number</p>
                    <Input
                      setValue={makeSetValue('cardHolderName')}
                      value={formData.cardHolderName}
                      type="text"
                      placeholder=""
                      name="cardHolderName"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-medium text-darkblue">Card Number</p>
                    <Input
                      setValue={makeSetValue('cardNumber')}
                      value={formData.cardNumber}
                      type="text"
                      placeholder="1234 5678 3245 9101"
                      name="cardNumber"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-medium text-darkblue">Expiry Date</p>
                      <Input
                        setValue={makeSetValue('expiryDate')}
                        value={formData.expiryDate}
                        placeholder="MM / YY"
                        type="text"
                        name="expiryDate"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-medium text-darkblue">Security Code</p>
                      <Input
                        setValue={makeSetValue('securityCode')}
                        value={formData.securityCode}
                        placeholder="123"
                        type="text"
                        name="securityCode"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <div
              className={`flex items-center gap-2 rounded px-3 py-[14px] text-lg font-medium border border-darkblue/10 ${
                formData.paymentOption == 'bankTransfer' ? 'text-blue' : 'text-darkblue'
              }`}
              onClick={() => {
                setValue('bankTransfer', 'paymentOption')
              }}
            >
              <OptionSelectButton value={formData.paymentOption == 'bankTransfer'} /> Bank Transfer
            </div>
            {formData.paymentOption == 'bankTransfer' && (
              <div className="px-4 md:px-10 py-7">
                <div className="flex flex-col gap-[18px] max-w-[390px]">
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-medium text-darkblue">Card Holder Number</p>
                    <Input
                      setValue={makeSetValue('cardHolderName')}
                      value={formData.cardHolderName}
                      type="text"
                      placeholder=""
                      name="cardHolderName"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-medium text-darkblue">Card Number</p>
                    <Input
                      setValue={makeSetValue('cardNumber')}
                      value={formData.cardNumber}
                      type="text"
                      placeholder="1234 5678 3245 9101"
                      name="cardNumber"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-medium text-darkblue">Expiry Date</p>
                      <Input
                        setValue={makeSetValue('expiryDate')}
                        value={formData.expiryDate}
                        placeholder="MM / YY"
                        type="text"
                        name="expiryDate"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-medium text-darkblue">Security Code</p>
                      <Input
                        setValue={makeSetValue('securityCode')}
                        value={formData.securityCode}
                        placeholder="123"
                        type="text"
                        name="securityCode"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 text-base font-medium text-darkblue">
        <div className="flex gap-2 items-center">
          <Input
            setValue={() => setValue(!formData.agreeTAndC, 'agreeTAndC')}
            type="checkbox"
            value={formData.agreeTAndC}
            name="agreeTAndC"
          />
          <p className="">
            I agree to the{' '}
            <Link href="/terms-and-conditions" className="text-blue underline">
              terms and conditions
            </Link>{' '}
            and{' '}
            <Link href={'/privacy-policy'} className="text-blue underline">
              privacy policy
            </Link>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            setValue={() => setValue(!formData.readTripInfo, 'readTripInfo')}
            type="checkbox"
            value={formData.readTripInfo}
            name="readTripInfo"
          />

          <p className="">
            I have read the{' '}
            <Link href="/essential-trip-information" className="text-blue underline">
              essential trip information
            </Link>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            setValue={() => setValue(!formData.receiveUpdates, 'receiveUpdates')}
            type="checkbox"
            value={formData.receiveUpdates}
            name="receiveUpdates"
          />

          <p className="">
            I would like to receive offers and regular updates from Intrepid Travel via email
          </p>
        </div>
      </div>

      <div className="flex justify-between text-2xl text-darkblue font-bold">
        <p>Payment today</p>
        <p>$200</p>
      </div>
    </div>
  )
}
