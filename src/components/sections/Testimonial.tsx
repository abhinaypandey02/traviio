import React from 'react'
import Image from 'next/image'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { urlFor } from '@/sanity/client'
import { SanityTestimonialSection } from '@/sanity/types'

import 'swiper/css'
import 'swiper/css/navigation'
// import ReactStars from 'react-stars'

export type TestimonialSectionProps = {
  data: SanityTestimonialSection
}

const RatingCard = ({ title, review, country, name, date, star, varient }: any) => {
  return (
    <div
      className={varient == 1 ? 'w-full' : 'w-full rounded-2xl  border-gray  px-5 py-2 shadow-xl'}
    >
      <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
      <h5 className="text-base font-medium my-2 opacity-60">
        {
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        }
        ...
      </h5>
      <div className="flex gap-x-3 my-4">
        <div>
          <img
            src={
              'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
            }
            alt=""
            className="rounded-full w-12 h-12"
          />
        </div>
        <div className="ml-2 ">
          <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
          <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
        </div>
      </div>
    </div>
  )
}

const Testimonial = (props: TestimonialSectionProps) => {
  const dataa = [
    {
      title: 'I Highly Recommended this website',
      star: 5,
      name: 'Deepak Chattwani',
      country:
        'data:image/png;base64,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',
      date: '16 Aug,2003',
      review:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 'I Highly Recommended this website',
      star: 5,
      name: 'Deepak Chattwani',
      country:
        'data:image/png;base64,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',
      date: '16 Aug,2003',
      review:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 'I Highly Recommended this website',
      star: 5,
      name: 'Deepak Chattwani',
      country:
        'data:image/png;base64,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',
      date: '16 Aug,2003',
      review:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      title: 'I Highly Recommended this website',
      star: 5,
      name: 'Deepak Chattwani',
      country:
        'data:image/png;base64,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',
      date: '16 Aug,2003',
      review:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ]

  const {
    data: { title, subtitle, image, testimonials },
  } = props

 

  return (
    <div className="w-full bg-[#F2FAFF]  text-black px-10 py-10 lg:flex items-center gap-x-10 ">
      <div className="lg:w-1/5 w-full">
        {/* <h3 className='font-semibold text-4xl'>{title?.en}</h3> */}
        <h3 className="font-semibold text-4xl">{'Hear it from our'}</h3>
        <h3 className="font-semibold text-4xl my-1 text-blue">{'Happy Travelers'}</h3>
        <h5 className="text-lg my-5 opacity-60">{subtitle?.en}</h5>
        <Image
          src={image ? urlFor(image) : ''}
          width={260}
          height={73}
          alt=""
          style={{ borderRadius: '10px' }}
        />
      </div>

      <div className="w-3/4 hidden lg:block">
        <Swiper
          navigation={true}
          slidesPerView={3}
          spaceBetween={30}
          modules={[FreeMode, Navigation]}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full lg:hidden block">
        <Swiper
          navigation={true}
          slidesPerView={1}
          spaceBetween={30}
          modules={[FreeMode, Navigation]}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={'w-full'}>
              <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
              <h3 className="text-lg font-medium">{'I Highly Recommended this website'}...</h3>
              <h5 className="text-base font-medium my-2 opacity-60">
                {
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                }
                ...
              </h5>
              <div className="flex gap-x-3 my-4">
                <div>
                  <img
                    src={
                      'https://media.istockphoto.com/id/1349796126/photo/flag-of-india.webp?b=1&s=170667a&w=0&k=20&c=1pWIs3VkXqu1wNBGcztG5IixaN4oGA-nul4Ynb1G2QY='
                    }
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                </div>
                <div className="ml-2 ">
                  <h6 className="font-semibold">{'Abhinay Pandey'}</h6>
                  <h6 className="text-sm opacity-60">{'16 Aug 2023'}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Testimonial
