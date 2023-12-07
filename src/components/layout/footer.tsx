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
    <div className="w-full bg-primary">
      <Container>
        <div className="lg:mt-4 flex max-lg:flex-wrap justify-between gap-7 lg:gap-[166px] py-5">
          {/* Left side */}
          <div className="flex flex-col gap-2 mb-12 md:mt-5 max-w-[364px]">
            <div className="flex flex-col-reverse lg:flex-col justify-start items-start">
              <div className=" lg:mt-0 mt-10 ">
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="relative bg-red-400 w-36 flex items-start justify-start md:w-[220px] h-[38px] md:h-[52px]">
                    <Image src="/traviio.png" className="" layout="fill" alt="Company logo"></Image>
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

                <p className="text-gray text-sm md:text-base font-medium md:font-normal leading-normal mt-5">
                  {localizedString(footer?.description)}
                </p>
              </div>
              <div className="flex flex-wrap gap-6 lg:mt-5 mt-0 w-full justify-center lg:justify-start">
                {SOCIAL_LINKS.map((item, index) => {
                  return (
                    <Link href={item.href} key={index}>
                      <Image width={20} height={20} src={item.icon} alt={item.alt} />
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="lg:flex hidden  flex-wrap gap-2 mt-auto">
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
            <div className="grid  grid-cols-3 gap-3 justify-between">
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
            <hr className="border-gray opacity-20" />
            <p className="font-semibold text-xl">Contact Us</p>
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
        <div className="flex flex-wrap lg:hidden  py-5 gap-2 mt-auto">
          {CARDS.map((item, index) => {
            return (
              <Image
                width={50}
                height={32}
                src={item}
                alt=""
                key={index}
                className="w-[50px] h-[32px]"
              />
            )
          })}
        </div>
      </Container>
      <hr className="opacity-30 border-blue/20" />
      <p className="text-center py-4 text-[#726E83] opacity-50">
        {localizedString(footer?.copyright_text)}
      </p>
    </div>
  )
}

export default Footer
