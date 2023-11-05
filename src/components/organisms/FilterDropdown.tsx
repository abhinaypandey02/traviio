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
    <div className="flex flex-col rounded-md shadow-md bg-white">
      {/* Selector */}
      <Link
        className="rounded-t-md bg-primary flex justify-between p-5 cursor-pointer"
        href={props.link}
      >
        <Image src={'/blue_bullet.svg'} height={28} width={28} alt="bullet" />
        <p className="font-[500] text-[18px]"> {props.title}</p>
      </Link>
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
