import React from 'react'
import Link from "next/link";


interface item {
  href: string;
  title: string;
}

const Footer__links = ({
  heading,
  items,
}: {
  heading: string;
  items: item[];
}) => {
  return (
    <div className="flex gap-3 flex-col text-darkblue">
      <h1 className="pb-2 font-semibold text-xl">
        {heading}
      </h1>
      {items.map((item, index) => {
        return (
          <Link href={item.href} key={index} className='text-lg'>
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Footer__links;