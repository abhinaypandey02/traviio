import React from 'react'

const BUTTON_VARIANT = {
  primary: 'bg-blue text-white',
  secondary: 'bg-yellow text-white',
  hollow: 'bg-white border border-gray text-gray',
}
const Button = ({
  text,
  varient = 'primary',
  ref,
  className = '',
  onClick,
}: {
  text: any
  varient?: keyof typeof BUTTON_VARIANT
  ref?: any
  className?: string
  onClick?: any
}) => {
  return (
    <button
      ref={ref}
      className={`bg-blue text-center w-full rounded-full py-2 font-bold my-2 text-sm ${BUTTON_VARIANT[varient]} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
