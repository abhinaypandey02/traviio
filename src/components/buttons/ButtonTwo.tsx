import React, { ReactNode } from 'react'

<<<<<<< HEAD
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
=======
const ImageButton = ({onClick, className, children} : {onClick?: () => void, className?: string, children: ReactNode}) => {
  return (
    <button className={`bg-blue text-center rounded-full py-2 font-bold my-2 text-sm text-white ${className}`} onClick={onClick}>
>>>>>>> deep
      {children}
    </button>
  )
}

<<<<<<< HEAD
export default ImageButton
=======
export default ImageButton
>>>>>>> deep
