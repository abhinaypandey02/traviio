import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReactStars from 'react-stars'

import { urlFor } from '@/sanity/client'
import { SanityTourPage } from '@/sanity/types'

import Button from '@/components/buttons/Button'
import Breadcrumbs from '@/components/atoms/Breadcrumbs'

export default function TourHeroSection({
  hero_section,
  overview_card,
  slug,
}: {
  slug: string
  hero_section: SanityTourPage['hero_section']
  overview_card: SanityTourPage['overview_card']
}) {
  return (
    <div className="">
      <Breadcrumbs/>
      <div className=" relative">
        <Image
          src={hero_section?.image ? urlFor(hero_section?.image) : ''}
          style={{ width: '100%', height: '480px' }}
          width={700}
          height={73}
          alt=""
        />
        {/* <img className='w-full  max-h-[500px]' src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000" alt="" /> */}
        <h2 className="text-3xl lg:text-[52px]  text-yellow absolute bottom-[70px]  font-black text-center inset-x-0 ">
          {/* {hero_section?.title?.en} */}
          <span className="text-yellow">Egypt Tour:</span>{' '}
          <span className="text-white">Explore Ancient Wonders </span>
        </h2>
      </div>
      <OverViewCard slug={slug} data={overview_card} />
    </div>
  )
}

const OverViewCard = ({ data, slug }: { data: SanityTourPage['overview_card']; slug: string }) => {
  const router = useRouter()
  const price: any = data?.price
  return (
    <div className="relative h-[80px]">
      <div className="absolute flex max-w-[1280px] inset-x-0 divide-x-2 divide-darkblue/10 top-[-34px] w-[90%] mx-auto bg-primary rounded-t-2xl py-7">
        <div className="flex gap-2 justify-center px-7  w-fit">
          <div className="relative h-12 w-12">
            <Image alt="" src={'/ColoredCalender.svg'} fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium text-gray whitespace-nowrap">Duration</p>
            <p className="text-xl font-bold text-darkblue">{data?.duration?.en} Days</p>
          </div>
        </div>

        <div className="flex gap-2 justify-center px-7  w-full">
          <div className="relative h-12 w-12">
            <Image alt="" src={'/ColoredLocation.svg'} fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium text-gray whitespace-nowrap">
              {data?.countries} Countries
            </p>
            <p className="text-xl font-bold text-darkblue">{data?.cities} Cities</p>
          </div>
        </div>

        <div className="flex gap-2 justify-center px-7  w-full">
          {/* <div className="relative h-12 w-12">
            <Image alt="" src={'/calendar.svg'} fill className="object-contain" />
          </div> */}
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium text-gray whitespace-nowrap">Trip Rating</p>
            <div className="flex items-center gap-1 flex-nowrap">
              {/*@ts-ignore*/}
              <ReactStars
                count={5}
                onChange={() => {}}
                edit={false}
                className="flex flex-nowrap"
                value={data?.rating}
                size={16}
                color2={'#ffd700'}
              />
              <p className="text-xl font-bold text-darkblue">{data?.rating}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center px-7  w-full">
          <div className="relative h-12 w-12">
            <Image alt="" src={'/add-user 1.svg'} fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium text-gray whitespace-nowrap">About This Tour</p>
            <p className="text-xl font-bold text-darkblue">{data?.about?.en}</p>
          </div>
        </div>

        <div className="flex gap-2 justify-center px-7  w-full">
          <div className="relative h-12 w-12">
            <Image alt="" src={'/credit-card (2) 1.svg'} fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium text-gray whitespace-nowrap">Price From</p>
            <p className="text-xl font-bold text-darkblue whitespace-nowrap">{price?.en}</p>
          </div>
        </div>

        <div className="flex flex-col w-full justify-between items-center  px-7">
          <Link href={`/tours/${slug}/payment`}>
            <Button
              text={data?.cta_button?.label?.en}
              varient={data?.cta_button?.type}
              className="text-center text-lg font-semibold w-[170px] py-3 translate-y-[-10px]"
            />
          </Link>
          <p className="text-xs font-medium text-red">{data?.cta_helper_text?.en}</p>
        </div>
      </div>
    </div>
  )
}
