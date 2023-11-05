import React from 'react'
import Image from 'next/image'

import { urlFor } from '@/sanity/client'
import { SanityOfficeLocationsSection } from '@/sanity/types'

import Container from '@/components/Container'
export type OfficeLocationSectionProps = {
  data: SanityOfficeLocationsSection
}

const OfficeLocationSection = (props: OfficeLocationSectionProps) => {
  const {
    data: { title, locations },
  } = props
  return (
    <div className="bg-white my-10   ">
      <Container className="px-5 text-2xl font-medium ">
        <h3>{title?.en}</h3>
        <hr className="lg:w-1/12 w-1/3 my-2 text-yellow bg-yellow  rounded-full border-2" />
      </Container>
      <div className="my-10 py-[24px] bg-[#F2FAFF] ">
        <Container className={'grid grid-cols-1 lg:grid-cols-3 gap-x-20 gap-y-4 py-2'}>
          {locations?.map((item: any, index: any) => {
            return (
              <div key={index} className="flex justify-start gap-x-5 lg:w-[364px]">
                <div className="relative h-full max-w-[40%] md:h-[140px] aspect-square">
                  <Image
                    style={{ borderRadius: '10px', objectFit: 'cover' }}
                    src={urlFor(item.image)}
                    fill
                    alt=""
                  />
                </div>

                <div className="flex flex-col gap-0">
                  <h2 className="text-lg font-medium opacity-50">{item?.title?.en}</h2>
                  <h6 className="flex mt-3 items-start gap-x-2 opacity-50">
                    <svg
                      version="1.0"
                      id="Layer_1"
                      width="20px"
                      height="20px"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      className=" min-h-[12px] min-w-[12px]"
                    >
                      <path
                        fill="#231F20"
                        d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24
	                      C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24
	                      C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                      />
                    </svg>
                    <span className="text-sm ">{item?.address?.en}</span>
                  </h6>
                  <h6 className="mt-2 flex items-center  justify-start gap-x-2 opacity-50">
                    <svg
                      fill="#000000"
                      width="20px"
                      height="2-px"
                      viewBox="0 0 32 32"
                      className=" min-h-[12px] min-w-[12px]"
                    >
                      <title>phone</title>
                      <path d="M0 10.375c0 0.938 0.344 1.969 0.781 3.063s1 2.125 1.438 2.906c1.188 2.063 2.719 4.094 4.469 5.781s3.813 3.094 6.125 3.938c1.344 0.531 2.688 1.125 4.188 1.125 0.75 0 1.813-0.281 2.781-0.688 0.938-0.406 1.781-1.031 2.094-1.781 0.125-0.281 0.281-0.656 0.375-1.094 0.094-0.406 0.156-0.813 0.156-1.094 0-0.156 0-0.313-0.031-0.344-0.094-0.188-0.313-0.344-0.563-0.5-0.563-0.281-0.656-0.375-1.5-0.875-0.875-0.5-1.781-1.063-2.563-1.469-0.375-0.219-0.625-0.313-0.719-0.313-0.5 0-1.125 0.688-1.656 1.438-0.563 0.75-1.188 1.438-1.625 1.438-0.219 0-0.438-0.094-0.688-0.25s-0.5-0.281-0.656-0.375c-2.75-1.563-4.594-3.406-6.156-6.125-0.188-0.313-0.625-0.969-0.625-1.313 0-0.406 0.563-0.875 1.125-1.375 0.531-0.469 1.094-1.031 1.094-1.719 0-0.094-0.063-0.375-0.188-0.781-0.281-0.813-0.656-1.75-0.969-2.656-0.156-0.438-0.281-0.75-0.313-0.906-0.063-0.094-0.094-0.219-0.125-0.375s-0.094-0.281-0.125-0.406c-0.094-0.281-0.25-0.5-0.406-0.625-0.156-0.063-0.531-0.156-0.906-0.188-0.375 0-0.813-0.031-1-0.031-0.094 0-0.219 0-0.344 0.031h-0.406c-1 0.438-1.719 1.313-2.25 2.344-0.5 1.031-0.813 2.188-0.813 3.219z"></path>
                    </svg>
                    <span className="text-sm ">{item?.phone?.en}</span>
                  </h6>
                  <h6 className="mt-2 flex items-center  justify-start gap-x-2 opacity-50">
                    <svg
                      fill="#000000"
                      width="20px"
                      height="2-px"
                      viewBox="0 0 1920 1920"
                      className=" min-h-[12px] min-w-[12px]"
                    >
                      <path
                        d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                    <span className="text-sm ">{item?.email?.en}</span>
                  </h6>
                </div>
              </div>
            )
          })}
        </Container>
      </div>
    </div>
  )
}

export default OfficeLocationSection
