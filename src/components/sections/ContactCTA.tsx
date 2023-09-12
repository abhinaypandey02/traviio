import React from 'react'
import Image from 'next/image'
import Button from '../buttons/Button'

const ContactCTA = () => {
  return (
    <div className="md:w-[90%] w-full bg-blue bg-opacity-20 rounded-xl grid grid-cols-1 md:grid-cols-2 p-10 my-10 mx-auto h-[500px] overflow-hidden">
      <div className="flex flex-col gap-5 justify-evenly h-full">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-black leading-relaxed">
          Let us take care of the hassle and enjoy your vacation that you deserve
        </h1>
        <Button text="Contact One of Our Tour Agents" className='!px-10'></Button>
      </div>
      <div className="relative rounded-full overflow-hidden aspect-square mt-10">
        <Image src="/temp.jpg" fill alt=""></Image>
      </div>
    </div>
  )
}

export default ContactCTA
