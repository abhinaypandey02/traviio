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
      className={`bg-blue text-center rounded-full py-2 font-bold my-2 text-sm text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ImageButton
