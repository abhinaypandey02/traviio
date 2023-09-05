import React from 'react'

const varient = {
  primary: 'bg-blue',
}
const Button = ({ text, varient }: any) => {
  return (
    <div className="bg-blue text-center  rounded-full py-2 font-bold my-2 text-sm text-white">
      {text}
    </div>
  )
}

export default Button
