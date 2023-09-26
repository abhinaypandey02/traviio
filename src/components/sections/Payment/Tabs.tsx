import React, { useState } from 'react'
import Image from 'next/image'

import Container from '@/components/molecule/Container'

export default function Tabs({ children }: { children?: any[] }) {
  const [page, setPage] = useState(1)
  return (
    <Container className="max-w-[1280px] w-[90%] h-[68px] flex flex-col gap-16">
      <div className="flex items-center gap-1 px-6 max-w-[800px] mx-auto w-full">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setPage(1)
          }}
        >
          <Image alt="" src={'/circleTick.svg'} height={36} width={36} />
          <p className="absolute top-[110%] -translate-x-1/4 text-blue text-base font-medium whitespace-nowrap">
            Trip Extra
          </p>
        </div>
        <hr className="flex-1 bg-yellow text-yellow h-[2px]" />
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setPage(2)
          }}
        >
          <Image alt="" src={'/circleTick.svg'} height={36} width={36} />
          <p className="absolute top-[110%] -translate-x-1/4 text-blue text-base font-medium whitespace-nowrap">
            Your Details
          </p>
        </div>
        <hr className="flex-1 bg-yellow text-yellow h-[2px]" />
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setPage(3)
          }}
        >
          <Image alt="" src={'/circleTick.svg'} height={36} width={36} />
          <p className="absolute top-[110%] -translate-x-1/4 text-blue text-base font-medium whitespace-nowrap">
            Payment
          </p>
        </div>
      </div>
      {children && children.length >= page ? children[page - 1] : <div>Under Construction</div>}
    </Container>
  )
}
