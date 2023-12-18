import React from 'react'
import Image from 'next/image'

const Address = ({
  heading,
  address,
  number,
  email,
}: {
  heading: string
  address: string
  number: string
  email: string
}) => {
  return (
    <div className="flex flex-col flex-none text-gray text-sm gap-3 md:max-w-[218px]">
      <p className="text-xs font-medium leading-[20px] md:text-base text-darkblue/80">{heading}</p>
      <div className="flex items-start gap-2">
        <Image width={20} height={20} alt="" src="/map_icon.svg"></Image>
        <p className='font-normal'>{address}</p>
      </div>
      <div className="flex items-start gap-2">
        <Image width={20} height={20} alt="" src="/call_icon.svg"></Image>
        <p className='font-normal'>{number}</p>
      </div>
      <div className="flex items-start gap-2">
        <Image width={20} height={20} alt="" src="/email_icon.svg"></Image>
        <p className='font-normal'>{email}</p>
      </div>
    </div>
  )
}

export default Address
