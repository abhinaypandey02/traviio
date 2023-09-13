import React from 'react'
import ReactStars from 'react-stars'
const RatingCard = ({ title, review, country, name, date, star, varient }: any) => {
  return (
    <div
      className={varient == 1 ? 'w-full' : 'w-full rounded-2xl  border-gray  px-5 py-2 shadow-xl'}
    >
      <ReactStars count={5} onChange={() => {}} value={star} size={24} color2={'#ffd700'} />
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

export default RatingCard
