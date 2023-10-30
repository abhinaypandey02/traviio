import { SanityAccommodationSection } from '@/sanity/types'

import Container from '@/components/Container'
import AccomodationCard from '@/components/molecule/AccomodationCard'

export default function AccommdationTypesSection({ data }: { data: SanityAccommodationSection }) {
  return (
    <Container className="flex flex-col py-7  relative gap-10">
      <div className='lg:w-3/4 w-full'>
        <div>
          <h2 className="text-black font-bold text-2xl text-c">{data?.title?.en}</h2>
          <hr className=" w-28 my-2 text-yellow bg-yellow  rounded-full border-2" />
        </div>
        <div>
          <span className="text-gray  mt-3 text-lg">{data.subtitle?.en?.substring(0,18)}</span>
          <span className="text-blue  mt-3 text-lg">{data.subtitle?.en?.substring(18,)}</span>
        </div>
      </div>
      <div className="flex mt-2 lg:w-3/4 w-full gap-6">
        {data?.accommodation_types?.map((item, index) => (
          <AccomodationCard data={item} key={index} />
        ))}
      </div>
    </Container>
  )
}
