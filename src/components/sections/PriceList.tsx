import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface SinglePrice {
  from: string
  to: string
  availability: 'Available' | 'Full' | 'Almost Full'
  bookingLink: string
  currentPrice: number
  actualPrice: number
}

interface PriceListProps {
  prices: SinglePrice[]
  tailorLink: string
}

function PriceList({ props }: { props: PriceListProps }) {
  const [selected, setSelected] = React.useState(-1)
  return (
    <div className={`rounded-md bg-darkblue bg-opacity-5 w-[90%] mx-auto p-5`}>
      <div className="flex justify-between">
        <div>
          These dates don't work for you? Tailor your trip <Link href={props.tailorLink}>here</Link>
          <div className="flex items-center">
            <Image src="/lock_icon.svg" height={24} width={24} alt="lock" />
            <p className="text-md font-semibold text-blue">Secure Payments</p>
          </div>
        </div>
        <div>{/* Need to add the selector here */}</div>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='grid grid-cols-6'>
          
        </div>
        {props.prices.map((price, index) => (
          <div className='grid grid-cols-6 rounded-lg bg-darkblue bg-opacity-10'>
             
          </div>
        ))}
      </div>
    </div>
  )
}

export default PriceList
