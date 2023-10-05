import React from 'react'

const PrimaryButton = ({ title }: { title: string }) => {
  return (
    <button className="bg-blue rounded-[30px] px-9 py-3 bg-blue-500 font-bold flex items-center justify-center">
      {title}
    </button>
  )
}

export default PrimaryButton
