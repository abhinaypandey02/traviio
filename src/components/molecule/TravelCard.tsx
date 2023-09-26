import React from 'react'
import Link from 'next/link'

import Button from '../buttons/Button'

import { SanityTourPage } from '@/sanity/types'

const TravelCard = (props: SanityTourPage['overview_card']) => {
  return (
    <div className="bg-white h-fit  shadow-2xl rounded-2xl cursor-pointer relative">
      <span className="bg-red absolute my-2 mx-2 right-0 px-2 py-1 text-white font-bold text-sm rounded-full">
        Hot Deal
      </span>
      <img
        className="rounded-t-2xl"
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww&w=1000&q=80"
      />
      <div className="px-4 py-2">
        <h3 className="text-xl font-medium">{props?.about?.en}</h3>
        <div className="flex px-1 py-2 justify-between">
          <span className="text-sm">{props?.duration?.en}</span>
          <span className="text-sm">{props?.cities} Cities</span>
          <span className="text-sm">{props?.countries} Countries</span>
        </div>
        <div className="mt-4 flex justify-between">
          <span className="line-through opacity-50 font-bold text-lg">
            {props?.price?.currency_symbol?.en}
            {props?.price?.initial_price?.en}
          </span>
          <span className="text-right">
            <span className="text-lg font-bold">
              From {props?.price?.currency_symbol?.en}
              {props?.price?.discounted_price?.en}
            </span>{' '}
            <br />
            <span className="text-sm text-red font-bold">
              You Save {props?.price?.currency_symbol?.en}
              {(props?.price?.initial_price?.en || 0) - (props?.price?.discounted_price?.en || 0)}
            </span>
          </span>
        </div>
        {props?.cta_button?.url && (
          <Link href={props?.cta_button?.url}>
            <Button text={props?.cta_button?.label?.en} varient={props?.cta_button?.type} />
          </Link>
        )}
      </div>
    </div>
  )
}

export default TravelCard
