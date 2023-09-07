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
    <div className="flex flex-col text-gray text-sm w-[90%] gap-3">
<<<<<<< HEAD
      <p className="text-lg text-darkblue">{heading}</p>
=======
      <p className='text-lg text-darkblue'>{heading}</p>
>>>>>>> deep
      <div className="flex items-start gap-2">
        <Image width={20} height={20} alt="" src="/map_icon.svg"></Image>
        <p>{address}</p>
      </div>
      <div className="flex items-start gap-2">
        <Image width={20} height={20} alt="" src="/call_icon.svg"></Image>
        <p>{number}</p>
      </div>
      <div className="flex items-start gap-2">
        <Image width={20} height={20} alt="" src="/email_icon.svg"></Image>
        <p>{email}</p>
      </div>
    </div>
  )
}

export default Address
