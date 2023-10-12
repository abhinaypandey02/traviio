import React from 'react'
import Link from 'next/link'

const TOURS = [
  {
    name: 'Egypt Travel Guide',
    link: '/egypt-travel-guide',
  },
  {
    name: 'Egypt Oases',
    link: '/egypt-oases',
  },
  {
    name: 'Egypt Nile Cruises',
    link: '/egypt-nile-cruises',
  },
  {
    name: 'Red Sea and Sinai',
    link: '/red-sea-and-sinai',
  },
  {
    name: 'Egypt Travel Guide',
    link: '/egypt-travel-guide',
  },
  {
    name: 'Egypt Oases',
    link: '/egypt-oases',
  },
  {
    name: 'Egypt Nile Cruises',
    link: '/egypt-nile-cruises',
  },
  {
    name: 'Red Sea and Sinai',
    link: '/red-sea-and-sinai',
  },
  {
    name: 'Egypt Travel Guide',
    link: '/egypt-travel-guide',
  },
  {
    name: 'Egypt Oases',
    link: '/egypt-oases',
  },
  {
    name: 'Egypt Nile Cruises',
    link: '/egypt-nile-cruises',
  },
  {
    name: 'Transportation guide in Egypt',
    link: '/red-sea-and-sinai',
  },
  {
    name: 'Egypt Travel Guide',
    link: '/egypt-travel-guide',
  },
  {
    name: 'Egypt Oases',
    link: '/egypt-oases',
  },
  {
    name: 'History of Egypt',
    link: '/egypt-nile-cruises',
  },
  {
    name: 'Red Sea and Sinai',
    link: '/red-sea-and-sinai',
  },
  {
    name: 'Alexandria Attractions',
    link: '/egypt-travel-guide',
  },
  {
    name: 'Egypt Pyramids',
    link: '/egypt-oases',
  },
  {
    name: 'Cairo Attractions',
    link: '/egypt-nile-cruises',
  },
  {
    name: 'Red Sea and Sinai',
    link: '/red-sea-and-sinai',
  },
]

const PopularTours = () => {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="font-semibold text-black text-xl">Popular Tours</h1>
      <hr className="lg:w-1/12 w-1/3 my-2 text-yellow  bg-yellow  rounded-full border-2" />
      <div className="flex flex-wrap my-2">
        {TOURS.map((item, index) => {
          return (
            <div key={index} className="flex my-2">
              <Link href={item.link} className="py-1">
                {item?.name}
              </Link>
              {index !== TOURS.length - 1 && (
                <hr className="h-[70%] my-auto w-[2px] mx-1 bg-none border-gray border-r-[2px] border-0 opacity-60" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PopularTours
