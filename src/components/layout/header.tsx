import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import LocaleContext, { LocalizedString, localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityGlobals } from '@/sanity/types'

import Container from '@/components/Container'

import ButtonTwo from '../buttons/ButtonTwo'

import HeaderLink from './components/HeaderLink'
import LanguageDropdown from './components/LanguageDropdown'

const Header = ({ navbar }: { navbar: SanityGlobals['navbar'] }) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [openDropDown, setOpenDropDown] = useState(false)
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [open])
  const { locale } = useContext(LocaleContext)

  // The Dropdownlist

  const dropdownList = ['Egypt', 'Dubai', 'Isreal']

  return (
    <div>
      <div className="w-full z-50 hidden bg-white lg:block h-[100px] relative">
        <div className={'bg-primary h-[30px]'}>
          <Container className="py-1">
            <div className="main-content-wrapper">
              <a target={'_blank'} href={'whatsapp://+919456679268'}>
                <div className="flex justify-end gap-1">
                  <Image src="/whatsapp_logo.svg" height={18} width={18} alt="Whatsapp logo" />
                  <p className={'text-sm font-medium leading-[22px]'}>+1 0000 000 000</p>
                </div>
              </a>
            </div>
          </Container>
        </div>
        <div className="bg-white h-[70px] flex flex-col items-center justify-center">
          <Container className="main-content-wrapper flex gap-[138px] items-center">
            <Link href={'/'}>
              <Image
                className={'h-10 w-[172px]'}
                src="/company_logo.svg"
                height={40}
                width={172}
                alt="Company logo"
              />
            </Link>
            <div className="flex gap-[38px] justify-evenly text-darkblue">
              {navbar?.links?.map((item, index) => {
                return <HeaderLink item={item} key={index} />
              })}
            </div>
            <div className="flex flex-none gap-3 items-stretch ml-auto">
              <Link href={navbar?.cta?.url || '/'}>
                <ButtonTwo className="flex gap-2.5 items-center">
                  {navbar?.cta?.icon && (
                    <Image
                      height={24}
                      width={24}
                      src={urlFor(navbar?.cta?.icon)}
                      alt={localizedString(navbar.cta.icon.alt, locale)}
                    />
                  )}
                  <LocalizedString text={navbar?.cta?.label} />
                </ButtonTwo>
              </Link>
              <LanguageDropdown />
            </div>
          </Container>
        </div>
      </div>
      <div className="w-full lg:hidden z-50 lg:h-[80px] h-[60px] p-base">
        <div className="px-5 flex justify-between items-center w-full bg-white relative h-full  py-[16px] md:py-5 z-[50]">
          <Image src="/company_logo.svg" height={24} width={103} alt="Company logo" />
          <div className="flex gap-3 h-[24px]  items-center">
            <Image src="/whatsapp_logo.svg" height={24} width={24} alt="Whatsapp logo" />
            {/* Language selector */}
            <LanguageDropdown />
            <button onClick={() => setOpen(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 7H20C20.2652 7 20.5196 6.89464 20.7071 6.70711C20.8946 6.51957 21 6.26522 21 6C21 5.73478 20.8946 5.48043 20.7071 5.29289C20.5196 5.10536 20.2652 5 20 5H4C3.73478 5 3.48043 5.10536 3.29289 5.29289C3.10536 5.48043 3 5.73478 3 6C3 6.26522 3.10536 6.51957 3.29289 6.70711C3.48043 6.89464 3.73478 7 4 7ZM20 17H13C12.7348 17 12.4804 17.1054 12.2929 17.2929C12.1054 17.4804 12 17.7348 12 18C12 18.2652 12.1054 18.5196 12.2929 18.7071C12.4804 18.8946 12.7348 19 13 19H20C20.2652 19 20.5196 18.8946 20.7071 18.7071C20.8946 18.5196 21 18.2652 21 18C21 17.7348 20.8946 17.4804 20.7071 17.2929C20.5196 17.1054 20.2652 17 20 17ZM20 11H4C3.73478 11 3.48043 11.1054 3.29289 11.2929C3.10536 11.4804 3 11.7348 3 12C3 12.2652 3.10536 12.5196 3.29289 12.7071C3.48043 12.8946 3.73478 13 4 13H20C20.2652 13 20.5196 12.8946 20.7071 12.7071C20.8946 12.5196 21 12.2652 21 12C21 11.7348 20.8946 11.4804 20.7071 11.2929C20.5196 11.1054 20.2652 11 20 11Z"
                  fill="#726E83"
                />
              </svg>
            </button>
            {/* <Image
              src="/menu_icon.svg"
              height={24}
              width={24}
              alt="Menu Icon"
              onClick={() => }
            /> */}
          </div>
        </div>

        {/* Menu For Mobile */}
        <div className="flex flex-col justify-end pr-3  items-end">
          <div
            className={`relative rounded-[16px] shadow-md text-base transition-all p-5  text-darkblue lg:first-letter:text-xl ease-in-out duration-700  bg-white w-[70%]  flex flex-col gap-2 justify-start items-start z-[15] ${
              open ? 'translate-y-1 ' : '-translate-y-full opacity-0'
            }`}
          >
            {navbar?.links?.map((item, index) => (
              <div className="w-full" key={index}>
                {item?._type === 'link' && (
                  <div
                    onClick={() => {
                      setOpen(false)
                    }}
                    className=" p-[12px] font-[500] text-[16px] px-[18px] "
                  >
                    <Link
                      href={item.url || '/'}
                      className={
                        'font-medium ' +
                        ((item.url || '/') === router.asPath ? 'text-blue' : 'text-darkblue')
                      }
                    >
                      <LocalizedString text={item.text} />
                    </Link>
                  </div>
                )}
                {item?._type === 'tour_dropdown' && (
                  <div>
                    <span
                      onClick={() => setOpenDropDown(!openDropDown)}
                      className="flex bg-primary rounded-[8px] text-blue  p-[12px] text-[16px] px-[18px] items-center justify-between cursor-pointer"
                    >
                      <p className={'font-medium'}>Destinations</p>
                      <Image
                        src="/down_icon.svg"
                        height="16"
                        width="16"
                        alt=""
                        className={`ml-1 ${openDropDown && '-rotate-180'} transition-all`}
                      ></Image>
                    </span>
                    {openDropDown && (
                      <div>
                        {dropdownList.map((item, index) => (
                          <div>
                            <label
                              className="flex items-center gap-3 text-[#726E83] p-[10px] px-[24px]"
                              htmlFor={'nav-sub-item' + index}
                            >
                              <input type="radio" name="nav-sub-item" id={'nav-sub-item' + index} />
                              <Link key={index} href={'/'}>
                                {' '}
                                {item}
                              </Link>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Menu for Desktop */}
        <div className="hidden lg:block">
          {navbar?.links?.map((item, index) => {
            return <HeaderLink item={item} key={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Header
