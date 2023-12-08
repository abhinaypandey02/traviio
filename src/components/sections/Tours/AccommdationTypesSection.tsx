import { SanityAccommodationSection } from '@/sanity/types'

import Container from '@/components/Container'
import AccomodationCard from '@/components/molecule/AccomodationCard'
import Swiper from '@/components/Swiper'

export default function AccommdationTypesSection({ data }: { data: SanityAccommodationSection }) {
  return (
    <Container className="flex flex-col py-7 md:px-20   relative gap-10">
      <div className=" w-full">
        <div className=" pl-5 md:pl-0">
          <h2 className="text-black font-bold text-xl lg:text-2xl text-c">{data?.title?.en}</h2>
          <hr className=" w-28 my-2 text-yellow bg-yellow  rounded-full border-2" />
        </div>
        <div className=" pl-5 md:pl-0">
          <span className="text-gray  text-base mt-3 lg:text-lg">
            {data.subtitle?.en?.substring(0, 18)}
          </span>
          <span className="text-blue  text-base mt-3 lg:text-lg">
            {data.subtitle?.en?.substring(18)}
          </span>
        </div>
      </div>
      <div className="flex pl-5 overflow-x-scroll mt-2 max-w-5xl w-full gap-6">
        {data?.accommodation_types?.map((item, index) => (
          <AccomodationCard data={item} key={index} />
        ))}
      </div>
    </Container>
  )
}
