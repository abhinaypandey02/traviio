import React from 'react'
import Image from 'next/image'

const LANGUAGES = [
  {
    image: '/en_icon.svg',
    title: 'English',
  },
  {
    image: '/en_icon.svg',
    title: 'English',
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
        className="rounded-full bg-opacity-5 bg-blue border-blue border border-opacity-10 p-2 h-min flex items-center cursor-pointer gap-2"
        onClick={() => setOpen(!open)}
      >
        <Image height={24} width={24} alt={curr} src={currimg} />
        <Image height={16} width={16} alt="" src="/down_icon.svg" />
      </div>
      {open && (
        <div className="absolute top-[100%] right-0 p-5 bg-opacity-10 border-blue bg-blue gap-3 rounded-xl flex flex-col justify-center">
          {LANGUAGES.map((item, index) => {
            return (
              <div
                className="flex gap-2 cursor-pointer"
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
