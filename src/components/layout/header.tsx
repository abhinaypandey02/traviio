import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import LocaleContext, { LocalizedString, localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityGlobals } from '@/sanity/types'

import Container from '@/components/Container'

import ButtonTwo from '../buttons/ButtonTwo'

import HeaderLink from './components/HeaderLink'
import LanguageDropdown from './components/LanguageDropdown'

const Header = ({ navbar }: { navbar: SanityGlobals['navbar'] }) => {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [open])
  const { locale } = useContext(LocaleContext)

  return (
    <div>
      <div className="w-full z-50 hidden bg-white lg:block h-[100px] relative">
        <div className="bg-primary py-1 ">
          <a target={'_blank'} href={'whatsapp://+919456679268'}>
            <Container className="flex justify-end gap-1">
              <Image src="/whatsapp_logo.svg" height={18} width={18} alt="Whatsapp logo" />
              <p className={'text-sm font-medium leading-[22px]'}>+1 0000 000 000</p>
            </Container>
          </a>
        </div>
        <div className="bg-white">
          <Container className="py-[15px] bg-white flex gap-[138px] items-center">
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
            <div className="flex gap-3 items-stretch ml-auto">
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
      <div className="w-full lg:hidden z-50 h-[80px]">
        <div className="px-5 flex justify-between w-full bg-white relative py-5 z-[50]">
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
          className={`relative transition-all text-darkblue text-xl ease-in-out duration-700 py-10 bg-white flex flex-col gap-2 w-full justify-center items-center z-[15] ${
            open ? '' : '-translate-y-full'
          }`}
          onClick={() => {
            setOpen(false)
          }}
        >
          {navbar?.links?.map((item, index) => {
            return <HeaderLink item={item} key={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Header
