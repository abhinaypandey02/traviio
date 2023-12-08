import React from 'react'

const SecondaryButton = ({ title }: { title: string }) => {
  return (
    <button className="bg-secondaryDarkBlue rounded-[30px]  px-4 py-2  md:px-9 md:py-3 h-10 md:h-12 bg-blue-500 text-[14px]  md:text-[16px] font-medium md:font-bold leading-[24px] flex items-center justify-center">
      {title}
    </button>
  )
}

export default SecondaryButton
