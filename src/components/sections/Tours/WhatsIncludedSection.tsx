import Image from 'next/image'

import { urlFor } from '@/sanity/client'
import { SanityWhatsIncludedSection } from '@/sanity/types'

import Container from '@/components/Container'

export default function WhatsIncludedSection({ data }: { data: SanityWhatsIncludedSection }) {
  return (
    <Container className="flex flex-col py-7  relative">
      <div>
        <h2 className="text-black font-bold text-2xl text-c">{data?.title?.en}</h2>
        <hr className=" w-28 my-2 text-yellow bg-yellow  rounded-full border-2" />
      </div>
      <div className="divide-y-2 divide-darkblue/10 my-3 lg:w-3/4  w-full">
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
                <p className="text-xl font-medium text-blue">{item.title?.en}</p>
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
    </Container>
  )
}
