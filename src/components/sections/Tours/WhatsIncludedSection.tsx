import Image from 'next/image'

import { urlFor } from '@/sanity/client'
import { SanityWhatsIncludedSection } from '@/sanity/types'

import Container from '@/components/Container'
import { useState } from 'react'

export default function WhatsIncludedSection({ data }: { data: SanityWhatsIncludedSection }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <Container className="flex flex-col py-7 md:px-20 px-5  relative">
      <div id="inclusions">
        <h2 className="text-black  font-bold text-[20px] lg:text-2xl text-c">{data?.title?.en}</h2>
        <hr className=" w-28 my-2 text-yellow bg-yellow  rounded-full border-2" />
      </div>
      <div className="divide-y-2 hidden lg:block divide-darkblue/10 my-3 lg:w-3/4  w-full">
        {data?.inclusion_list?.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_4fr] py-8 pb-7 gap-7"
            >
              <div className="flex items-center gap-2  self-start">
                <div className="w-7 h-7 relative">
                  <Image
                    src={item.icon ? urlFor(item.icon) : ''}
                    alt={item.icon?.alt?.en ?? ''}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="lg:text-xl text-[20px] font-medium text-blue">{item.title?.en}</p>
              </div>
              <div className="flex flex-col">
                {item?.description?.map((note, index) => {
                  return (
                    <p className="text-base font-medium" key={index}>
                      {note.en}
                    </p>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className=" lg:hidden text-base">
        {/* The Icons color need to be white for the background to be blue */}
        <div className=" flex flex-row  justify-evenly mt-10 bg-[whitesmoke] px-4 pt-4 rounded-t-2xl items-center gap-5">
          {data?.inclusion_list?.map((item, index) => (
            <div
              onClick={() => setCurrentIndex(index)}
              key={index}
              style={{
                borderBottom:
                  index === currentIndex ? '3px solid #FFBB0B ' : '2px solid transparent',
              }}
              className="flex h-full pb-2 w-full justify-center  items-center transition-all border-b-orange-400 border-b-2 gap-2  self-start"
            >
              <div className="w-7 h-7  relative">
                <Image
                  src={item.icon ? urlFor(item.icon) : ''}
                  alt={item.icon?.alt?.en ?? ''}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        {data?.inclusion_list && (
          <div className=" flex bg-white shadow-xl shadow-[#f5f5f5]  flex-col justify-start items-start gap-3 p-5">
            {
              <p className="lg:text-xl text-base font-medium text-black">
                {data?.inclusion_list[currentIndex]?.title?.en}
                <hr className=" w-12 my-2 text-yellow bg-yellow  rounded-full border-[1.5px]" />
              </p>
            }
            <div className="flex text-[14px] flex-col">
              {data?.inclusion_list[currentIndex]?.description?.map((note, index) => {
                return (
                  <p className="text-base font-medium" key={index}>
                    {note.en}
                  </p>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
