import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Button from '../buttons/ButtonTwo'

interface SinglePrice {
  from: string
  to: string
  availability: 'Available' | 'Full' | 'Almost Full' | 'Attention'
  bookingLink: string
  currentPrice: number
  actualPrice: number
  roomType: string
}

const MAPPINGS = {
  Available: {
    color: 'text-darkblue',
    availablecolor: 'text-darkblue',
    availability: 'Available',
  },
  Full: {
    color: 'text-gray',
    availablecolor: 'text-gray italic',
    availability: 'Full',
  },
  'Almost Full': {
    color: 'text-darkblue',
    availablecolor: 'text-red',
    availability: 'Almost Full',
  },
  Attention: {
    color: 'text-red',
    availablecolor: '',
    availability: 'Available',
  },
}

interface PriceListProps {
  prices: SinglePrice[]
  tailorLink: string
}

function PriceList({ props }: { props: PriceListProps }) {
  const [selected, setSelected] = React.useState(-1)
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    setCollapsed(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setCollapsed(window.innerWidth < 768)
    })
  }, [])

  return (
    <div className={`rounded-md bg-darkblue bg-opacity-5 w-[90%] mx-auto p-5`}>
      <div className="flex justify-between">
        <div className="gap-2 flex flex-col my-2">
          <h1>
            These dates don't work for you? Tailor your trip{' '}
            <Link href={props.tailorLink} className="text-blue">
              here
            </Link>
          </h1>
          <div className="flex items-center gap-3">
            <Image src="/lock_icon.svg" height={24} width={24} alt="lock" />
            <p className="text-md font-semibold text-blue">Secure Payments</p>
          </div>
        </div>
        <div>{/* Need to add the selector here */}</div>
      </div>
      <div className="flex flex-col gap-3">
        <div
          className={`grid gap-2 py-3 px-2 font-semibold text-xl ${
            collapsed ? ' grid-cols-6' : 'grid-cols-12'
          }`}
        >
          <h1 className="text-left ml-5 col-span-2">From</h1>
          <p></p>
          <h1 className="col-span-2">To</h1>
          {!collapsed && (
            <>
              <p className="col-span-3"></p>
              <h1 className="col-span-3 text-center">Price</h1>
            </>
          )}
        </div>
        {props.prices.map((price, index) => (
          <div
            className={`rounded-lg shadow ${
              selected !== index ? 'bg-darkblue bg-opacity-5' : 'bg-blue text-white'
            }`}
            key={index}
          >
            <div
              className={`grid gap-2 py-3 px-2 cursor-pointer font-semibold text-xl ${
                collapsed ? ' grid-cols-6' : 'grid-cols-12'
              }`}
              onClick={() => {
                selected === index ? setSelected(-1) : setSelected(index)
              }}
            >
              <h1 className={`col-span-2 ${collapsed ? 'text-sm ml-2' : 'ml-5'}`}>{price.from}</h1>
              <Image
                src="/arrow_icon.svg"
                height={9}
                width={40}
                alt=""
                className="my-auto mx-auto"
              />
              <h1 className={`col-span-2 ${collapsed && 'text-sm'}`}>{price.to}</h1>
              {!collapsed && (
                <>
                  <p
                    className={`col-span-3 ${MAPPINGS[price.availability].availablecolor} ${
                      selected === index ? 'opacity-0' : ''
                    }`}
                  >
                    {MAPPINGS[price.availability].availability}
                  </p>
                  <h1
                    className={`col-span-3 text-center ${MAPPINGS[price.availability].color} ${
                      selected === index ? 'opacity-0' : ''
                    }`}
                  >
                    $ {price.currentPrice}
                  </h1>
                </>
              )}
              <Image
                src="/down_icon.svg"
                height={20}
                width={20}
                alt=""
                className={`ml-auto mr-5 transition-all ${selected === index && '-rotate-180'}`}
              />
            </div>
            {selected === index && (
              <div className="bg-white text-darkblue p-10 rounded-b-lg col-span-full flex justify-between">
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-3 items-center">
                    <h1
                      className={`${
                        MAPPINGS[price.availability].color
                      } font-semibold whitespace-nowrap ${collapsed ? 'text-xl' : 'text-4xl'}`}
                    >
                      $ {price.currentPrice}
                    </h1>
                    <h1
                      className={`text-gray line-through text-2xl font-semibold whitespace-nowrap ${
                        collapsed ? 'text-sm' : 'text-2xl'
                      }`}
                    >
                      $ {price.actualPrice}
                    </h1>
                    {collapsed && (
                      <Link href={price.bookingLink} className={`flex items-center ml-auto`}>
                        <Button className="!bg-red flex items-center justify-center gap-1 px-3 !py-3 !my-auto !text-sm">
                          Book Tour
                        </Button>
                      </Link>
                    )}
                  </div>
                  <p className="text-gray">Per person in a {price.roomType}</p>
                  <p>
                    Looking for a Different Room Type?
                    <span className="text-blue"> Find the pricing in the next steps.</span>
                  </p>
                  <p>
                    <span className="text-blue">Customize your trip</span> with optional tours
                    during booking!
                  </p>
                </div>
                {!collapsed && (
                  <Link href={price.bookingLink} className={`flex items-center`}>
                    <Button className="!bg-red flex items-center justify-center gap-2 px-5 !py-3 !my-auto !text-xl">
                      Book Tour <Image height={10} width={20} alt="" src="/white_arrow.png" />
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PriceList
