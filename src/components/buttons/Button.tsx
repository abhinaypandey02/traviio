import React from 'react'

const variant={
    'primary':'bg-blue'
}
const Button = ({text,variant, className}:{
  text: string,
  variant?: 'primary' | 'secondary',
  className?: string
}) => {
  return (
    <div className={'bg-blue text-center  rounded-full py-2 font-bold my-2 text-sm text-white w-fit px-5 ' + className}>
      {text}
    </div>
  )
}

export default Button
