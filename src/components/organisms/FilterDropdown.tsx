import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FilterDropdownProps {
  items: {
    title: string
    link: string
  }[]
  className?: string
}

function FilterItem(props: { title: string; link: string }) {
  return (
    <div className="flex flex-col w-full rounded-xl shadow shadow-[#e9e9e9] bg-white">
      {/* Selector */}
      <Link
        className="rounded-t-xl bg-primary flex justify-between p-5 cursor-pointer"
        href={props.link}
      >
        <p className="font-[500] text-[18px]"> {props.title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.7671 8.60002C11.903 8.59922 12.0378 8.62569 12.1636 8.67792C12.2894 8.73015 12.4038 8.8071 12.5003 8.90436L18.6963 15.2011C18.8908 15.3987 19 15.6668 19 15.9462C19 16.2257 18.8908 16.4937 18.6963 16.6914C18.5018 16.889 18.2381 17 17.9631 17C17.6881 17 17.4244 16.889 17.2299 16.6914L11.7671 11.1292L6.30436 16.6809C6.10681 16.8528 5.8527 16.9426 5.59281 16.9324C5.33291 16.9222 5.08637 16.8127 4.90246 16.6258C4.71855 16.4389 4.61081 16.1884 4.60077 15.9243C4.59073 15.6601 4.67913 15.4019 4.84831 15.2011L11.0443 8.90436C11.2366 8.71048 11.4962 8.60118 11.7671 8.60002Z"
            fill="#140D31"
          />
        </svg>
      </Link>
      <div className="grid grid-cols-2 justify-center">
        <div className="flex flex-row gap-3 p-5 justify-start items-center">
          <input type="radio" className="text-blue" />
          <p>Egypt</p>
        </div>
        <div className="flex flex-row gap-3 p-5 justify-start items-center">
          <input type="radio" className="text-blue" />
          <p>Egypt</p>
        </div>
        <div className="flex flex-row gap-3 p-5 justify-start items-center">
          <input type="radio" className="text-blue" />
          <p>Egypt</p>
        </div>
        <div className="flex flex-row gap-3 p-5 justify-start items-center">
          <input type="radio" className="text-blue" />
          <p>Egypt</p>
        </div>
        <div className="flex flex-row gap-3 p-5 justify-start items-center">
          <input type="radio" className="text-blue" />
          <p>Egypt</p>
        </div>
        <div className="flex flex-row gap-3 p-5 justify-start items-center">
          <input type="radio" className="text-blue" />
          <p>Egypt</p>
        </div>
      </div>
    </div>
  )
}

function FilterDropdown(props: FilterDropdownProps) {
  return (
    <div className={'flex flex-col gap-5 ' + props.className}>
      {props.items.map((item, index) => {
        return <FilterItem title={item.title} link={item.link} key={index} />
      })}
    </div>
  )
}

export default FilterDropdown
