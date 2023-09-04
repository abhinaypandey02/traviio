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
        className="rounded-full bg-opacity-5 w-fit bg-blue border-blue border border-opacity-10 p-2 h-min flex items-center cursor-pointer gap-2"
        onClick={() => setOpen(!open)}
      >
        <Image height={24} width={24} alt={curr} src={currimg} />
        <Image height={16} width={16} alt="" src="/down_icon.svg" />
      </div>
      {open && (
        <div className="absolute bg-opacity-60 pt-3 px-2 border-blue bg-blue rounded-xl min-w-max right-0 my-2">
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
