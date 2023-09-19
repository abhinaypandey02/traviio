import React, { useState } from 'react'
import Pagination from 'rc-pagination'
import { Circle, Line } from 'rc-progress'

import { SanityReviewsSection } from '@/sanity/types'
export type ReviewSectionProps = {
  data: SanityReviewsSection
}

const Filter = () => {
  return (
    <div className="rounded-xl shadow-xl w-full ">
      <div className=" py-3 font-medium rounded-t-2xl px-4 bg-[#ecf4ff] ">Filter by Rating</div>
      <div className="grid px-4 grid-flow-row grid-cols-1 py-6 gap-y-7">
        <div className=" flex gap-x-2 justify-center items-center">
          <input type="checkbox" className="w-fit" />
          <span className="text-sm w-20  opacity-60 font-medium">5 Star</span>
          <Line
            percent={80}
            strokeWidth={6}
            trailWidth={6}
            trailColor="#ecf4ff"
            strokeColor="#f5b536"
          />
          <span className="text-sm opacity-60 font-medium">1969</span>
        </div>
        <div className=" flex gap-x-2 justify-center items-center">
          <input type="checkbox" className="w-fit" />
          <span className="text-sm w-20  opacity-60 font-medium">4 Star</span>
          <Line
            percent={40}
            strokeWidth={6}
            trailWidth={6}
            trailColor="#ecf4ff"
            strokeColor="#f5b536"
          />
          <span className="text-sm opacity-60 font-medium">102</span>
        </div>
        <div className=" flex gap-x-2 justify-center items-center">
          <input type="checkbox" className="w-fit" />
          <span className="text-sm w-20  opacity-60 font-medium">3 Star</span>
          <Line
            percent={20}
            strokeWidth={6}
            trailWidth={6}
            trailColor="#ecf4ff"
            strokeColor="#f5b536"
          />
          <span className="text-sm opacity-60 font-medium">26</span>
        </div>
        <div className=" flex gap-x-2 justify-center items-center">
          <input type="checkbox" className="w-fit" />
          <span className="text-sm w-20  opacity-60 font-medium">2 Star</span>
          <Line
            percent={8}
            strokeWidth={6}
            trailWidth={6}
            trailColor="#ecf4ff"
            strokeColor="#f5b536"
          />
          <span className="text-sm opacity-60 font-medium">11</span>
        </div>
        <div className=" flex gap-x-2 justify-center items-center">
          <input type="checkbox" className="w-fit" />
          <span className="text-sm w-20  opacity-60 font-medium">1 Star</span>
          <Line
            percent={1}
            strokeWidth={6}
            trailWidth={6}
            trailColor="#ecf4ff"
            strokeColor="#f5b536"
          />
          <span className="text-sm opacity-60 font-medium">4</span>
        </div>
      </div>
    </div>
  )
}

const RatingCard = ({ title, review, country, name, date, star, varient }: any) => {
  return (
    <div className={'w-full rounded-2xl  border-gray  px-5 py-2 shadow-xl'}>
      {/* <ReactStars
        count={5} onChange={()=>{}} value={star} size={24} color2={'#ffd700'} /> */}

      <div className="flex gap-x-2 text-xl my-3">⭐ ⭐ ⭐ ⭐ ⭐</div>
      <h3 className="text-lg font-medium">{title.substring(0, 33)}...</h3>
      <h5 className="text-base font-medium my-2 opacity-60">{review.substring(0, 190)}...</h5>
      <div className="flex gap-x-3 my-4">
        <div>
          <img src={country} className="rounded-full h-12 w-12" alt="" />
        </div>
        <div className="ml-2 ">
          <h6 className="font-semibold">{name}</h6>
          <h6 className="text-sm opacity-60">{date}</h6>
        </div>
      </div>
    </div>
  )
}

const ReviewSection = (props: ReviewSectionProps) => {
  const {
    data: { title, tagline, reviews },
  } = props

  const buttonItemRender = (current: any, type: String, element: any) => {
    if (type === 'prev') {
      return (
        <button className="opacity-50 border-[1px] rounded-full px-6 py-2" type="button">
          Prev
        </button>
      )
    }
    if (type === 'next') {
      return (
        <button className="bg-black text-white rounded-full px-6 py-2" type="button">
          Next
        </button>
      )
    }
    // if(type==='cuurent')return <button>{current}</button>
    return null
  }

  const [pageNumber, setPageNumber] = useState(1)
  return (
    <div className="lg:px-20 px-10 py-10  bg-white text-black">
      <h2 className="text-blue text-base font-medium text-center">{tagline?.en}</h2>
      <h4 className="text-3xl font-medium text-center">{title?.en}</h4>
      <hr className="lg:w-1/12 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />

      <div className="lg:flex  gap-x-10">
        <div className="lg:w-1/5 w-full ">
          <Filter />
        </div>
        <div className="gap-y-3 hidden  lg:grid grid-flow-row grid-cols-1">
          {reviews?.map((item: any, index: any) => {
            if (pageNumber * 3 >= index + 1 && pageNumber * 3 - 2 <= index + 1) {
              return (
                <RatingCard
                  key={index}
                  title={item.title?.en}
                  name={item.name?.en}
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
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              padding: '15px',
            }}
            pageSize={3}
            onChange={(current: any, pageSize: any) => {
              setPageNumber(current)
            }}
            total={reviews?.length}
            itemRender={buttonItemRender}
          />
        </div>

        <div className="gap-y-3  lg:hidden grid-flow-row grid-cols-1">
          {reviews?.map((item: any, index: any) => {
            if (pageNumber * 3 >= index + 1 && pageNumber * 3 - 2 <= index + 1) {
              return (
                <RatingCard
                  key={index}
                  title={item.title?.en}
                  name={item.name?.en}
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
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              padding: '15px',
            }}
            pageSize={2}
            onChange={(current: any, pageSize: any) => {
              setPageNumber(current)
            }}
            total={reviews?.length}
            itemRender={buttonItemRender}
          />
        </div>
      </div>
    </div>
  )
}

export default ReviewSection
