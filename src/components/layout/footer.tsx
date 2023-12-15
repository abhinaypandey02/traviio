import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { localizedString } from '@/contexts/LocaleProvider'
import { urlFor } from '@/sanity/client'
import { SanityGlobals } from '@/sanity/types'

import Container from '@/components/Container'

import Address from './components/Address'
import Footer__links from './components/Footer__links'

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/promotravels',
    icon: '/fb_logo.svg',
    alt: 'Facebook',
  },
  {
    href: 'https://www.facebook.com/promotravels',
    icon: '/insta.svg',
    alt: 'Facebook',
  },
  {
    href: 'https://www.facebook.com/promotravels',
    icon: '/twitter.svg',
    alt: 'Facebook',
  },
  {
    href: 'https://www.facebook.com/promotravels',
    icon: '/youtube.svg',
    alt: 'Facebook',
  },
  {
    href: 'https://www.facebook.com/promotravels',
    icon: '/random.svg',
    alt: 'Facebook',
  },
]

const CARDS = [
  '/visa_card.png',
  '/mastercard.png',
  '/amex.png',
  '/discover.png',
  '/paypal.png',
  '/bank-transfer.png',
]

const Footer = ({ footer }: { footer: SanityGlobals['footer'] }) => {
  const ADDRESSES = (footer?.locations as SanityGlobals['footer'])?.locations || []
  const LINKS = footer?.link_groups || []
  return (
    <div className="w-full bg-primary ">
      <Container>
        <div className="flex max-lg:flex-wrap justify-between gap-10 lg:gap-[166px] py-5 lg:py-20">
          {/* Left side */}
          <div className="flex flex-col gap-2 mb-0 md:max-w-[364px]">
            <div className="flex flex-col-reverse lg:flex-col justify-start items-start">
              <div className="mt-9 lg:mt-0">
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="relative bg-red-400 w-36 flex items-start justify-start md:w-[220px] h-[38px] md:h-[52px]">
                    <Image
                      src={(footer?.logo && urlFor(footer?.logo)) || ''}
                      className=""
                      layout="fill"
                      alt="Company logo"
                    ></Image>
                  </div>
                  <p>
                    <Link
                      href="/"
                      className="text-sm md:text-base md:font-normal font-medium leading-normal text-blue"
                    >
                      {localizedString(footer?.title)}
                    </Link>
                  </p>
                </div>

                <p className="text-gray text-sm md:text-base font-medium md:font-normal leading-[24px] mt-5">
                  {localizedString(footer?.description)}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 md:gap-6 lg:mt-10 mt-0 w-full justify-center lg:justify-start">
                {SOCIAL_LINKS.map((item, index) => {
                  return (
                    <Link href={item.href} key={index}>
                      <Image width={20} height={20} src={item.icon} alt={item.alt} />
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="lg:flex hidden  flex-wrap gap-2 px-4 md:px-0 mt-auto">
              {CARDS.map((item, index) => {
                return (
                  <Image
                    width={50}
                    height={32}
                    src={item}
                    alt=""
                    key={index}
                    className="w-[50px]  h-[32px]"
                  />
                )
              })}
            </div>
          </div>
          {/* Right side */}
          <div className="grow flex flex-col gap-4 text-darkblue">
            <div className="grid grid-cols-3 gap-3 justify-between">
              {LINKS.map((item, index) => {
                return (
                  <Footer__links
                    heading={localizedString(item.title)}
                    items={item.links || []}
                    key={index}
                  />
                )
              })}
            </div>
            <hr className="hidden md:block border-gray opacity-20" />
            <p className="psb-2 font-bold text-base md:text-lg leading-[24px] pt-7">Contact Us</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {ADDRESSES.map((item, index) => {
                return (
                  <Address
                    address={localizedString(item.address)}
                    email={item.email || ''}
                    heading={localizedString(item.title)}
                    number={localizedString(item.phone_number)}
                    key={index}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:hidden  py-5 px-4 md:px-0 gap-2 mt-auto">
          {CARDS.map((item, index) => {
            return (
              <Image
                width={50}
                height={32}
                src={item}
                alt=""
                key={index}
                className="w-[40px] md:w-[50px] h-[26px] md:h-[32px]"
              />
            )
          })}
        </div>
      </Container>
      <hr className="border-blue/20" />
      <p className="text-xs md:text-base leading-[20px] md:leading-[24px] text-center py-3 text-[#726E83]">
        {localizedString(footer?.copyright_text)}
      </p>
    </div>
  )
}

export default Footer
