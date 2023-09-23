import React from 'react'

const SecondaryButton = ({ title }: { title: string }) => {
  return (
    <button className="bg-secondaryDarkBlue rounded-[30px] px-[36px] py-[12px] h-[48px] bg-blue-500 text-[16px] font-[700] leading-[24px] flex items-center justify-center">
      {title}
    </button>
  )
}

export default SecondaryButton
