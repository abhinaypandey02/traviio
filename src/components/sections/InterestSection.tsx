import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityInterestsSection } from '@/sanity/types'
export type InterestSectionProps = {
  data: SanityInterestsSection
}

const InterestSection = (props: PropsWithLocale<InterestSectionProps>) => {
  const {
    data: { title, tagline, interests },
  } = props
  return (
    <div className="my-10">
      <h2 className="text-blue text-base font-medium text-center">{tagline?.en}</h2>
      <h4 className="text-4xl  mt-4 font-[700] text-center">{title?.en}</h4>
      <hr className="lg:w-1/12 w-1/3 my-3 text-yellow m-auto  bg-yellow  rounded-full border-2" />

      <div className="shadow-lg rounded-sm mx-[200px] px-10 pt-14 pb-10    my-10">
        {/* {interests
          ? interests.map((item: any, index: any) => {
            if(index%3==0)
              return (
                <div>
                <Link
                  href={'/blogs/' + item.slug?.current}
                  key={index}
                  className={(index+1)%3? "justify-center items-center text-center border-r-[1px] border-opacity-25 border-gray flex-col" :"justify-center items-center text-center  flex-col"}
                >
                  <Image
                    style={{ margin: 'auto' }}
                    src={urlFor(item?.icon)}
                    width={100}
                    height={80}
                    alt=""
                    />
                  <h3 className="text-center my-5 font-semibold text-blue">
                    {localizedString(item?.name, props.locale)}
                  </h3>
                </Link>
                </div>
              )
            })
          : null} */}
         {
           interests? interests.map((item:any,index:any)=>{
             if(index%3==0){
              return(
                <div>

                <div className='grid grid-flow-row grid-cols-3'>
                  {
                    interests[index]?
                    <Link
                    href={'/blogs/' + interests[index].slug?.current}
                    key={index}
                    className={(index+1)%3? "justify-center items-center text-center border-r-[1px] border-opacity-25 border-gray flex-col" :"justify-center items-center text-center  flex-col"}
                    >
                    <Image
                      style={{ margin: 'auto' }}
                      src={urlFor(interests[index]?.icon)}
                      width={100}
                      height={80}
                      alt=""
                      />
                    <h3 className="text-center my-5 font-semibold text-blue">
                      {localizedString(interests[index]?.name, props.locale)}
                    </h3>
                  </Link> :null
                  }
                  {
                    interests[index+1]?
                    <Link
                    href={'/blogs/' + interests[index+1].slug?.current}
                    key={index}
                    className={(index+1)%3? "justify-center items-center text-center border-r-[1px] border-opacity-25 border-gray flex-col" :"justify-center items-center text-center  flex-col"}
                    >
                    <Image
                      style={{ margin: 'auto' }}
                      src={urlFor(interests[index+1]?.icon)}
                      width={100}
                      height={80}
                      alt=""
                      />
                    <h3 className="text-center my-5 font-semibold text-blue">
                      {localizedString(interests[index+1]?.name, props.locale)}
                    </h3>
                  </Link> :null
                  }
                  {
                    interests[index+2]?
                    <Link
                    href={'/blogs/' + interests[index+2].slug?.current}
                    key={index}
                    className={"justify-center items-center text-center  border-opacity- flex-col" }
                    >
                    <Image
                      style={{ margin: 'auto' }}
                      src={urlFor(interests[index+2]?.icon)}
                      width={100}
                      height={80}
                      alt=""
                      />
                    <h3 className="text-center my-5 font-semibold text-blue">
                      {localizedString(interests[index+2]?.name, props.locale)}
                    </h3>
                  </Link> :null
                  }
                </div>
                <hr className={index!=(((interests.length/3)*3)-3)?'my-5 border-opacity-25 border-gray':'hidden'} />
                </div>
              )
             }
           }) :null
         }
      </div>
    </div>
  )
}

export default InterestSection



