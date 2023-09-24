import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import ButtonTwo from '../buttons/ButtonTwo'

import Card from './components/Card'
import HeaderLink from './components/HeaderLink'
import LanguageDropdown from './components/LanguageDropdown'
import Selector from './components/Selector'

type TLink = {
  name: string
  type: 'link'
  route: string
}

type TDropdown = {
  name: string
  type: 'dropdown'
  children: ReactNode[]
}

const LINKS: (TLink | TDropdown)[] = [
  {
    route: '/',
    name: 'Home',
    type: 'link',
  },
  {
    name: 'Destinations',
    type: 'dropdown',
    children: [
      <Selector
        items={['Egypt', 'Jordan', 'Dubai', 'Saudi Arabia', 'Israel', 'Turkey']}
        selectedItem="Egypt"
        selectedItemToggle={() => {}}
        title="Destinations"
      />,
      <Selector
        items={[
          'Top tours in Egypt',
          'Tours Review',
          'Facts about Egypt',
          'Things to do in Egypt',
          'Best Tours of Egypt',
          'Frequently asked questions',
          'Blog',
        ]}
        selectedItem="Things to do in Egypt"
        selectedItemToggle={() => {}}
        title="Egypt"
      />,
      <Card
        title="Nile River: Take a Nile River Cruise"
        excerpt="Nile cruises offer a wide range of tour package options that let you explore Egypt to the full. Tourists can have a wonderful time on our world-class Nile cruise"
        image="https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60"
        link="/"
      />,
      <Card
        title="Nile River: Take a Nile River Cruise"
        excerpt="Nile cruises offer a wide range of tour package options that let you explore Egypt to the full. Tourists can have a wonderful time on our world-class Nile cruise"
        image="https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60"
        link="/"
      />,
      <Card
        title="Nile River: Take a Nile River Cruise"
        excerpt="Nile cruises offer a wide range of tour package options that let you explore Egypt to the full. Tourists can have a wonderful time on our world-class Nile cruise"
        image="https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&q=60"
        link="/"
      />,
    ],
  },
  {
    route: '/demo',
    name: 'Demo',
    type: 'link',
  },
  {
    route: '/about',
    name: 'About',
    type: 'link',
  },
  {
    route: '/about',
    name: 'About',
    type: 'link',
  },
]

const Header = () => {
  const [collapse, setCollapse] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    function handleResize() {
      setCollapse(window.innerWidth < 1024)
    }
    setCollapse(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [open])
  return (
    <>
      {/* For larger screens */}
      {!collapse && (
        <div className="h-[112px] fixed w-full bg-white z-50">
          <div className="bg-primary flex justify-end py-1 px-10 gap-2">
            <Image src="/whatsapp_logo.svg" height={18} width={18} alt="Whatsapp logo" />
            <p>+1 0000 000 000</p>
          </div>
          <div className="py-3 bg-white flex justify-between items-center px-10">
            <Image src="/company_logo.svg" height={40} width={172} alt="Company logo" />
            <div className="flex gap-10 justify-evenly text-darkblue">
              {LINKS.map((item, index) => {
                return <HeaderLink item={item} key={index} />
              })}
            </div>
            <div className="flex gap-2 items-center">
              <Link href="/my-bookings">
                <ButtonTwo className="flex gap-2 px-4 items-center">
                  <Image height={24} width={24} src="/bookings_icon.svg" alt="" />
                  <p>My Bookings</p>
                </ButtonTwo>
              </Link>
              <LanguageDropdown />
            </div>
          </div>
        </div>
      )}
      {/* For smaller screens */}
      {collapse && (
        <div className="fixed w-full z-50 h-[80px]">
          <div className="px-5 flex justify-between w-full bg-white relative py-5 z-10">
            <Image src="/company_logo.svg" height={40} width={172} alt="Company logo" />
            <div className="flex gap-3">
              <Image src="/whatsapp_logo.svg" height={24} width={24} alt="Whatsapp logo" />
              {/* Language selector */}
              <Image
                src="/menu_icon.svg"
                height={24}
                width={24}
                alt="Menu Icon"
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
          <div
            className={`relative transition-all text-darkblue text-xl ease-in-out duration-700 py-10 bg-white flex flex-col gap-2 w-full justify-center items-center z-[5] ${
              open ? '' : '-translate-y-full'
            }`}
            onClick={() => {
              setOpen(false)
            }}
            onMouseLeave={() => {
              setOpen(false)
            }}
          >
            {LINKS.map((item, index) => {
              return <HeaderLink item={item} key={index} />
            })}
          </div>
        </div>
      )}
      <div className={collapse ? 'h-[80px]' : 'h-[112px]'}></div>
    </>
  )
}

export default Header
