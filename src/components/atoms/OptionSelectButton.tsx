import React from 'react'

export default function OptionSelectButton({
  height = '20px',
  width = '20px',
  value,
}: {
  height?: any
  width?: any
  value: boolean
}) {
  return (
    <div
      className="flex flex-col rounded-full border border-gray p-[5px]"
      style={{ width, height }}
    >
      <div className={`rounded-full w-full h-full ${value ? 'bg-blue' : 'bg-white'}`} />
    </div>
  )
}
