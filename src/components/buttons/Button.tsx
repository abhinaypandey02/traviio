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
  style,
  disabled,
}: {
  text: any
  varient?: keyof typeof BUTTON_VARIANT
  ref?: any
  className?: string
  onClick?: any
  style?: any
  disabled?: boolean
}) => {
  return (
    <button
      ref={ref}
      className={`bg-blue text-center w-full rounded-full py-2 font-bold my-2 text-sm disabled:opacity-70 ${BUTTON_VARIANT[varient]} ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
