import React from 'react'

const PrimaryButton = ({ title }: { title: string }) => {
  return (
    <button className="bg-blue text-sm md:text-base rounded-[30px] px-4 md:px-9 py-2 md:py-3 font-medium md:font-bold flex items-center justify-center">
      {title}
    </button>
  )
}

export default PrimaryButton
