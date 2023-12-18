import React, { ReactNode } from 'react'

const ImageButton = ({
  onClick,
  className,
  children,
}: {
  onClick?: () => void
  className?: string
  children: ReactNode
}) => {
  return (
    <button
      className={`bg-blue text-center rounded-full leading-[24px] py-2 px-6 font-bold text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ImageButton
