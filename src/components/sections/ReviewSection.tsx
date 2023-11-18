import React, { useState } from 'react'
import Image from 'next/image'
// import Pagination from 'rc-pagination'
import { Circle, Line } from 'rc-progress'

import { localizedString, PropsWithLocale } from '@/contexts/LocaleProvider'
import { SanityReviewsSection } from '@/sanity/types'

import Container from '@/components/Container'

import Star from '../Star'
export type ReviewSectionProps = {
  data: SanityReviewsSection
}
export function Pagination({
  onChange,
  total,
  pageSize,
  currentPage,
}: {
  onChange: (page: number) => void
  total: number
  pageSize: number
  currentPage: number
}) {
  return (
    <div className={'flex items-center justify-between w-full my-12'}>
      <button
        onClick={() => currentPage > 0 && onChange(currentPage - 1)}
        className={
          ' border-[1px] rounded-full px-6 py-2 ' +
          (currentPage > 0 ? 'opacity-50' : 'opacity-0 cursor-default')
        }
        type="button"
      >
        Prev
      </button>
      <div className={'flex gap-3'}>
        {Array.from(Array(Math.ceil(total / pageSize)).keys()).map((x, i) => (
          <div
            onClick={() => onChange(i)}
            className={
              'w-12 h-12 flex items-center justify-center cursor-pointer ' +
              (i === currentPage ? 'bg-primary' : '')
            }
          >
            {i + 1}
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          currentPage < Math.ceil(total / pageSize) - 1 ? onChange(currentPage + 1) : null
        }
        className={
          'bg-black text-white rounded-full px-6 py-2 ' +
          (currentPage < Math.ceil(total / pageSize) - 1 ? '' : 'opacity-0 cursor-default')
        }
        type="button"
      >
        Next
      </button>
    </div>
  )
}

const Filter = ({
  ratings,
  addSelectedRating,
  removeSelectedRating,
  selectedRating,
}: {
  addSelectedRating: (x: number) => void
  removeSelectedRating: (x: number) => void
  selectedRating: number[]
  ratings: { count: number; stars: number }[]
}) => {
  return (
    <div className="rounded-xl shadow-xl md:w-[300px] my-2 ">
      <div className=" py-[16px] tracking-wide font-medium rounded-t-2xl px-[18px] bg-[#ecf4ff] ">
        Filter by Rating
      </div>
      <div className="flex flex-col px-6 py-5 gap-y-5 md:gap-y-8">
        {ratings.reverse().map((rating) => (
          <div className=" flex gap-x-2 justify-center items-center">
            <input
              onChange={(e) =>
                e.target.checked
                  ? addSelectedRating(rating.stars)
                  : removeSelectedRating(rating.stars)
              }
              checked={selectedRating.includes(rating.stars)}
              type="checkbox"
              className="w-fit"
            />
            <span className="text-sm  opacity-60 font-medium">{rating.stars} Star</span>
            <div className={'grow'}>
              <Line
                percent={(rating.count / ratings.length) * 100}
                strokeWidth={6}
                trailWidth={6}
                trailColor="#ecf4ff"
                strokeColor="#f5b536"
              />
            </div>
            <span className="text-sm opacity-60 font-medium">{rating.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const RatingCard = ({ title, review, country, name, date, star, varient }: any) => {
  return (
    <div className={'w-full rounded-2xl   px-[20px] py-[24px] space-y-[16px]  shadow-xl'}>
      <div className="flex  text-xl">
        {Array.from(Array(star).keys()).map((x) => (
          <Star />
        ))}
      </div>

      <h3 className="text-base font-bold leading-normal ">{title.substring(0, 33)}...</h3>

      <h5 className="text-xs md:text-sm font-medium text-gray opacity-80 leading-normal md:leading-snug">
        {review}...
      </h5>
      <div className="flex gap-x-2 ">
        <div>
          <Image
            width={38}
            height={38}
            src={country}
            className="rounded-full h-[38px] w-[38px]"
            alt="country"
          />
        </div>
        <div className="ml-2 md:ml-3 my-auto ">
          <h6 className="text-xs md:text-sm font-bold leading-tight md:leading-snug">{name}</h6>

          <h6 className="text-[10px] md:text-xs   font-medium  md:font-normal text-gray  leading-tight">
            {date}
          </h6>
        </div>
      </div>
    </div>
  )
}

const ReviewSection = (props: PropsWithLocale<ReviewSectionProps>) => {
  let {
    data: { title, tagline, reviews },
    locale,
  } = props

  const [pageNumber, setPageNumber] = useState(0)
  const [selectedRating, setSelectedRating] = useState<number[]>([])

  const ratings: { stars: number; count: number }[] = []
  ;[1, 2, 3, 4, 5].forEach((r) => {
    ratings.push({
      stars: r,
      count: 0,
    })
  })
  reviews?.forEach((r) => {
    if (r.rating && r.rating > 0 && r.rating <= 5) ratings[r.rating - 1 || 0].count++
  })
  if (selectedRating.length !== 0) {
    reviews = reviews?.filter((x) => x.rating && selectedRating.includes(x.rating))
  }
  const pageSize = 3
  return (
    <Container className=" py-[50px] md:py-[90px]  bg-white text-black">
      <div className="flex flex-col items-center">
        <p className="text-blue text-xs md:text-base  font-medium uppercase leading-tight md:leading-normal">
          {localizedString(tagline, locale)}
        </p>

        <h2 className="text-[24px] md:text-[40px] leading-[32px] md:leading-tight  -tracking-[1.2px] mt-3 w-fit  font-bold">
          {localizedString(title, locale)}
          <hr className="w-1/2 mx-auto text-yellow  bg-yellow  rounded-full mt-2.5 border-b-2" />
        </h2>
      </div>

      <div className="flex  gap-y-[30px] md:gap-x-5 px-5 mt-8 flex-col md:flex-row">
        <div className="w-full md:w-[430px] ">
          <Filter
            addSelectedRating={(rating) => setSelectedRating((old) => [...old, rating])}
            removeSelectedRating={(rating) =>
              setSelectedRating((old) => old.filter((x) => x !== rating))
            }
            selectedRating={selectedRating}
            ratings={ratings}
          />
        </div>
        <div className="md:pl-2 space-y-5  md:col-span-4 w-full">
          <div className="space-y-5 md:space-y-2  ">
            {reviews
              ?.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
              .map((item, index: any) => (
                <RatingCard
                  key={index}
                  title={item.title?.en}
                  name={item?.name?.en}
                  star={item.rating}
                  review={item.text?.en}
                  country={
                    'https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?q=10&h=200'
                  }
                  date={item.time?.en}
                />
              ))}
          </div>
          <Pagination
            currentPage={pageNumber}
            pageSize={pageSize}
            onChange={setPageNumber}
            total={reviews?.length || 0}
          />
        </div>

        {/* <div className="gap-y-3  lg:hidden grid-flow-row grid-cols-1 border">
          {reviews?.map((item: any, index: any) => {
            if (pageNumber * 3 >= index + 1 && pageNumber * 3 - 2 <= index + 1) {
              return (
                <RatingCard
                  key={index}
                  title={item.title?.en}
                  name={item?.name?.en}
                  star={5}
                  review={item.text?.en}
                  country={
                    'https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?q=10&h=200'
                  }
                  date={item.time?.en}
                />
              )
            }
          })}
          <Pagination
            currentPage={pageNumber}
            pageSize={pageSize}
            onChange={setPageNumber}
            total={reviews?.length || 0}
          />
        </div> */}
      </div>
    </Container>
  )
}

export default ReviewSection
