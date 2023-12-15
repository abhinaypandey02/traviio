import React from 'react'
import Image from 'next/image'

const LANGUAGES = [
  {
    image: '/en_icon.svg',
    title: 'English',
  },
  {
    image: '/en_icon.svg',
    title: 'adsfasdfasdfdsf',
  },
  {
    image: '/en_icon.svg',
    title: 'English',
  },
]

const LanguageDropdown = () => {
  const [curr, setCurr] = React.useState('English')
  const [currimg, setCurrimg] = React.useState('/en_icon.svg')
  const [open, setOpen] = React.useState(false)
  return (
    <div className="relative">
      <div
        className="rounded-full bg-opacity-5 bg-[#325EFB] border-[#325EFB] border border-opacity-10 py-1 md:py-[8px] px-1 md:px-[10px] flex items-center cursor-pointer gap-1 md:gap-2.5"
        onClick={() => setOpen(!open)}
      >
        <Image className='hidden md:block' height={24} width={24} alt={curr} src={currimg} />
        <Image className='hidden md:block' height={16} width={16} alt="" src="/down_icon.svg" />
        <Image className='block md:hidden' height={16} width={16} alt={curr} src={currimg} />
        <Image className='block md:hidden' height={12} width={12} alt="" src="/down_icon.svg" />
      </div>
      {open && (
        <div className="absolute pt-3 px-2 border-blue bg-blue rounded-xl min-w-max right-0 my-2">
          {LANGUAGES.map((item, index) => {
            return (
              <div
                className="flex cursor-pointer mb-3 gap-2"
                key={index}
                onClick={() => {
                  setCurr(item.title)
                  setCurrimg(item.image)
                  setOpen(false)
                }}
              >
                <Image height={24} width={24} alt={item.title} src={item.image} />
                <p>{item.title}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
