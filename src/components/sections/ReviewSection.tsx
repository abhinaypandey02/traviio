import React, { useState } from 'react'
// import Pagination from 'rc-pagination'
import { Circle, Line } from 'rc-progress'

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
    <div className="rounded-xl shadow-xl w-[300px] my-2 ">
      <div className=" py-[16px] tracking-wide font-medium rounded-t-2xl px-[18px] bg-[#ecf4ff] ">
        Filter by Rating
      </div>
      <div className="flex flex-col px-6 py-4 gap-y-8">
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
    <div className={'w-full rounded-2xl  border-gray   px-[20px] py-[30px] pb-7  shadow-xl'}>
      <div className="flex  text-xl my-2">
        {Array.from(Array(star).keys()).map((x) => (
          <Star />
        ))}
      </div>
      <h3 className="text-lg  font-medium">{title.substring(0, 33)}...</h3>
      <h5 className="text-sm font-medium my-1 opacity-60">{review}...</h5>
      <div className="flex gap-x-2 mt-5">
        <div>
          <img src={country} className="rounded-full h-9 w-9" alt="" />
        </div>
        <div className="ml-2 ">
          <h6 className="font-semibold text-[14px]">{name}</h6>
          <h6 className="text-xs opacity-60 ">{date}</h6>
        </div>
      </div>
    </div>
  )
}

const ReviewSection = (props: ReviewSectionProps) => {
  let {
    data: { title, tagline, reviews },
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
    <Container className=" py-10  bg-white text-black">
      <h2 className="text-[#3FA9F5] text-[16px]   font-[500] text-center">{tagline?.en}</h2>
      <h4 className="text-[40px] mt-2 font-[700] tracking-[0.5px] text-center">{title?.en}</h4>
      <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />

      <div className="flex gap-x-5 mt-8">
        <div className="w-[430px] ">
          <Filter
            addSelectedRating={(rating) => setSelectedRating((old) => [...old, rating])}
            removeSelectedRating={(rating) =>
              setSelectedRating((old) => old.filter((x) => x !== rating))
            }
            selectedRating={selectedRating}
            ratings={ratings}
          />
        </div>
        <div className="gap-y-2 pl-2 col-span-4">
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
          <Pagination
            currentPage={pageNumber}
            pageSize={pageSize}
            onChange={setPageNumber}
            total={reviews?.length || 0}
          />
        </div>

        <div className="gap-y-3  lg:hidden grid-flow-row grid-cols-1">
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
        </div>
      </div>
    </Container>
  )
}

export default ReviewSection
