import React from 'react'

<<<<<<< HEAD
const varient = {
  primary: 'bg-blue',
}
const Button = ({ text, varient }: any) => {
  return (
    <div className="bg-blue text-center  rounded-full py-2 font-bold my-2 text-sm text-white">
=======
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
>>>>>>> deep
      {text}
    </div>
  )
}

export default Button
