import Image from 'next/image'
import PortableText from 'react-portable-text'

import { Dot } from '@phosphor-icons/react'

export default function BriefSummary() {
  const myPortableTextComponents = {
    types: {
      layout_group: (props: any) => {
        console.log('layout_group->', props)
        return <div>layout_group</div>
      },
    },
  }

  return (
    <div className="bg-white flex flex-col py-20 gap-12 max-w-[1280px] w-[90%] mx-auto">
      <div className="flex gap-3 flex-col justify-center w-fit mx-auto items-center">
        <h1 className="text-blue text-base font-medium">OVERVIEW</h1>
        <div>
          <h2 className="text-black font-bold text-4xl">Brief Summary</h2>
          <hr className="lg:w-1/3 w-1/3 my-2 text-yellow m-auto  bg-yellow  rounded-full border-2" />
        </div>
      </div>
      <div className="text-black flex flex-col gap-8">
        <div></div>
        <div className="flex max-sm:flex-col gap-4">
          <div className="flex-1">
            <div>
              <p className="font-bold text-2xl">Cairo city of Egypt</p>
              <hr className="w-20 my-2 text-yellow bg-yellow  rounded-full border-2" />
            </div>
            <p>
              The main city of Egypt is Cairo. As the capital and largest city of the country, Cairo
              is a bustling metropolis that serves as the cultural, political, and economic hub of
              Egypt. It is located along the banks of the Nile River and is home to iconic landmarks
              such as the Great Pyramids of Giza and the Sphinx. Cairo boasts a vibrant atmosphere
              with its bustling markets, fascinating museums, and architectural wonders like the
              Citadel of Saladin and the Egyptian Museum. It is a city where ancient history
              seamlessly blends with modern urban life, offering a unique and captivating experience
              for visitors.
            </p>
            <p>
              Explore the marvels, mythology and mystery of Ancient Egypt, including the Pyramids at
              Giza and the tombs of iconic pharaohs in the Valley of the Kings, with expert guides
              providing a local insight.
            </p>
          </div>
          <div className="relative w-full h-[150px] sm:w-[200px] md:w-[300px] md:h-[230px] lg:w-[400px] lg:h-[310px]">
            <Image alt="" src={'/map_image.png'} fill className="object-contain" />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <div>
              <p className="font-bold text-2xl">Why you'll love this trip</p>
              <hr className="w-20 my-2 text-yellow bg-yellow  rounded-full border-2" />
            </div>
            <div className="flex flex-nowrap items-center text-base font-normal">
              {<Dot size={'30'} />} Brush shoulders with the locals and meet some of the many store
              owners as you stroll through the famous bazaars of Aswan, Luxor and Khan al-Khalili in
              Egypt’s capital, Cairo.
            </div>
            <div className="flex flex-nowrap items-center text-base font-normal">
              {<Dot size={'30'} />} Set sail down the Nile – one of the world’s most iconic rivers.
              Relax in comfort as scenes of everyday Egyptian life stream by and experience day turn
              to night from your sundeck.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
