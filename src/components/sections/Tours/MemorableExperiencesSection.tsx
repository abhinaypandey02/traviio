import React from 'react'
import Image from 'next/image'
import { A11y, Controller, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { urlFor } from '@/sanity/client'
import { SanityMemorableExperiencesSection } from '@/sanity/types'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

import Container from '@/components/Container'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function MemorableExperiencesSection({
  data,
}: {
  data: SanityMemorableExperiencesSection
}) {
  const [swiper, setSwiper] = React.useState<any>()
  const prevRef = React.useRef<any>()
  const nextRef = React.useRef<any>()

  React.useEffect(() => {
    if (swiper) {
      swiper.params && (swiper.params.navigation.prevEl = prevRef.current)
      swiper.params && (swiper.params.navigation.nextEl = nextRef.current)
      swiper.navigation && swiper.navigation.init()
      swiper.navigation && swiper.navigation.update()
    }
  }, [swiper])

  return (
    <div className="flex flex-col gap-12 mb-16">
      <div className="flex gap-3 flex-col justify-center w-fit mx-auto items-center">
        <h1 className="text-blue text-base font-medium">{data?.tagline?.en}</h1>
        <div>
          <h2 className="text-black font-bold text-4xl text-c">{data?.title?.en}</h2>
          <hr className="lg:w-1/3 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
        </div>
      </div>
      <div className="w-full bg-primary">
        <Container className="flex flex-col py-7 relative">
          <Swiper
            modules={[Navigation, Scrollbar, A11y, Controller]}
            className="external-buttons mySwiper "
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              690: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1040: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1390: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            navigation={{
              prevEl: prevRef?.current,
              nextEl: nextRef?.current,
            }}
            updateOnWindowResize
            observer
            observeParents
            onSwiper={setSwiper}
          >
            {data?.experience_cards?.map((card, index) => (
              <SwiperSlide key={index}>
                <Card data={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
      <Container className="gap-12  relative flex justify-center">
        <div
          className="w-[50px] h-[50px] rounded-full bg-blue flex items-center justify-center"
          ref={prevRef}
        >
          <ArrowLeft color="white" />
        </div>

        <div
          className="w-[50px] h-[50px] rounded-full bg-blue flex items-center justify-center"
          ref={nextRef}
        >
          <ArrowRight color="white" />
        </div>
      </Container>
    </div>
  )
}

const Card = ({
  data,
}: {
  data: Exclude<SanityMemorableExperiencesSection['experience_cards'], undefined>[0]
}) => {
  if (!data) return null
  return (
    <div className="w-full min-h-[400px] min-w-[300px] rounded-2xl overflow-hidden bg-white shadow-md m-1">
      <div className="h-[220px] relative">
        <Image alt="" src={data.image ? urlFor(data.image) : ''} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <p className="font-bold text-xl text-darkblue">{data.title?.en}</p>
        <p className="font-medium text-sm text-gray">{data.description?.en}</p>
      </div>
    </div>
  )
}
