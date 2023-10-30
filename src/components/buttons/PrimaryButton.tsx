import React from 'react'

const PrimaryButton = ({ title }: { title: string }) => {
  return (
    <button className="bg-blue  text-[14px] md:text-[16px] leading-[24px] rounded-[30px] px-4 py-2 md:px-9 md:py-3 bg-blue-500 font-medium md:font-bold flex items-center justify-center h-10 md:h-12">
      {title}
    </button>
  )
}

export default PrimaryButton
