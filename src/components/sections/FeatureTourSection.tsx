import React from 'react'
import { SanityFeaturedToursSection } from '@/sanity/types'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/Container'
import { urlFor } from '@/sanity/client'
export type FeaturedTour = {
  data: SanityFeaturedToursSection
}
const FeatureTourSection = (FeaturedTour: any) => {
 
  return (
    <div>
      <Container>
        <header className="pb-5">
          <p className="text-blue text-xs md:text-base font-medium text-center uppercase leading-tight md:leading-normal">
            {FeaturedTour?.data?.tagline?.en}
          </p>
          <div className="text-2xl mt-2 md:mt-3 -tracking-[1.2px] mb-[30px] md:mb-12 w-fit mx-auto md:text-[40px] font-bold leading-[32px] md:leading-[50px] text-center">
            {/* <h2>{TopThings?.data?.title?.en}</h2> */}
            <h2>{FeaturedTour?.data?.title?.en}</h2>
            <hr className=" mt-[4px] md:mt-[12px] w-2/3 md:w-[117px] mx-auto text-yellow  bg-yellow  rounded-full border-b-2" />
          </div>
        </header>
        <div className='grid grid-flow-row grid-cols-4  gap-5'>
          {
            FeaturedTour.data?.tour_cards?.map((item: any, index: any) => {
              return (
                <div className='rounded-t-xl shadow-md'>
                  <Image width={340} height={200} src={urlFor(item?.content?.hero_section?.image)} />
                  <div className='px-2 py-2'>
                    <h2 className='my-1 text-xl font-semibold rounded-t-xl'>{item?.content?.hero_section?.title?.en}</h2>
                    <div className="flex mt-3 justify-between  text-darkblue">
                      <div className="text-xs md:text-sm items-center font-medium leading-none md:leading-[22px] flex gap-1.5">
                        <Image
                          height={100}
                          width={100}
                          alt=""
                          src="/calendar.svg"
                          className="h-4 w-4 md:h-[18px] md:w-[18px]"
                        ></Image>
                        <p> {item?.content?.overview_card?.duration?.en} </p>
                      </div>
                      <div className="text-xs md:text-sm items-center font-medium leading-none md:leading-[22px] flex gap-1.5">
                        <Image
                          height={100}
                          width={100}
                          alt=""
                          src="/map_plain.svg"
                          className="h-4 w-4 md:h-[18px] md:w-[18px]"
                        ></Image>
                        <p>{item?.content?.overview_card?.cities} Cities</p>
                      </div>
                      <div className="text-xs md:text-sm items-center font-medium leading-none md:leading-[22px] flex gap-1.5">
                        <Image
                          height={100}
                          width={100}
                          alt=""
                          src="/globe.svg"
                          className="h-4 w-4 md:h-[18px] md:w-[18px]"
                        ></Image>
                        <p>{item?.content?.overview_card?.countries} Countries </p>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-start">
                    <div className="line-through opacity-50 text-gray font-bold text-sm md:text-[18px] leading-[20px] md:leading-[28px]">
                     {item?.content?.price_overrides[0]?.price?.initial_price?.en}
                     
                    </div>

                    <div className="text-right md:font-[900] ">
                      <div className="text-base md:text-lg font-black text-darkblue leading-[20px] md:leading-[28px]">
                        From
                        {item?.content?.price_overrides[0]?.price?.initial_price?.en}
                      </div>
                      <div className="text-[10px] md:-mt-2 md:text-xs text-red font-bold leading-[20px] md:leading-[28px]">
                        You Save
                        {item?.content?.price_overrides[0]?.price?.initial_price?.en - item?.content?.price_overrides[0]?.price?.initial_price?.en}
                      </div>
                    </div>
                    </div>

                    <button  className='w-full bg-blue text-center py-2 text-lg mt-3 mb-2 rounded-2xl font-bold text-white'>
                      <Link href={'/tours'+item?.content?.slug?.current} >
                      View More
                      </Link>
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Container>
    </div>
  )
}

export default FeatureTourSection
