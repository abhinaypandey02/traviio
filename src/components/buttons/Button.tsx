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
      className={`bg-blue text-center px-[48px] md:w-[170px] flex flex-row justify-center items-center  gap-3 w-full rounded-full py-2 font-bold my-2 text-sm disabled:opacity-70 ${BUTTON_VARIANT[varient]} ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {text}
      <svg
        className=" md:hidden block"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
      >
        <path
          d="M5.57085 17.3052C5.57109 17.305 5.57137 17.3049 5.57161 17.3046L9.76516 13.8348C10.0793 13.5748 10.0781 13.1544 9.76242 12.8956C9.44674 12.6369 8.93613 12.6379 8.62194 12.8978L5.80645 15.2275L5.80645 1.16406C5.80645 0.7973 5.4454 0.5 5 0.5C4.5546 0.5 4.19355 0.7973 4.19355 1.16406L4.19355 15.2275L1.37806 12.8979C1.06387 12.6379 0.553264 12.6369 0.237578 12.8957C-0.0781885 13.1544 -0.0792767 13.5749 0.234836 13.8348L4.42839 17.3047C4.42863 17.3049 4.42891 17.305 4.42915 17.3053C4.74439 17.5653 5.25665 17.5645 5.57085 17.3052Z"
          fill="white"
        />
      </svg>
    </button>
  )
}

export default Button
