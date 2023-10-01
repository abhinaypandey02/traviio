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
    icon: '/fb_logo.svg',
    alt: 'Facebook',
  },
  {
    href: 'https://www.facebook.com/promotravels',
    icon: '/fb_logo.svg',
    alt: 'Facebook',
  },
  {
    href: 'https://www.facebook.com/promotravels',
    icon: '/fb_logo.svg',
    alt: 'Facebook',
  },
  {
    href: 'https://www.facebook.com/promotravels',
    icon: '/fb_logo.svg',
    alt: 'Facebook',
  },
]

const CARDS = [
  '/visa_card.png',
  '/visa_card.png',
  '/visa_card.png',
  '/visa_card.png',
  '/visa_card.png',
  '/visa_card.png',
]

const Footer = ({ footer }: { footer: SanityGlobals['footer'] }) => {
  console.log('footer->', footer)
  const ADDRESSES = footer?.locations || []
  const LINKS = footer?.link_groups || []
  return (
    <div className="mt-auto w-screen bg-primary flex flex-col text-gray">
      <Container>
        <div className="mt-12 flex flex-wrap justify-between gap-5 py-5">
          {/* Left side */}
          <div className="flex flex-col gap-5 mb-12 md:w-[30%]">
            <div className="flex flex-col">
              <Image
                src={(footer?.logo && urlFor(footer?.logo)) || ''}
                width={260}
                height={80}
                alt="Company logo"
              ></Image>
              <p>
                <Link href="/" className="font-semibold text-blue">
                  {localizedString(footer?.title)}
                </Link>
              </p>
            </div>
            <p className="leading-relaxed lg:max-w-[60%] mt-3">
              {localizedString(footer?.description)}
            </p>
            <div className="flex flex-wrap gap-6 mt-5">
              {SOCIAL_LINKS.map((item, index) => {
                return (
                  <Link href={item.href} key={index}>
                    <Image width={20} height={20} src={item.icon} alt={item.alt} />
                  </Link>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
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
          </div>
          {/* Right side */}
          <div className="grow flex flex-col gap-3 text-darkblue md:w-[66%]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-between">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
        <hr className="opacity-30 border-blue" />
        <p className="text-center py-3 opacity-50">{localizedString(footer?.copyright_text)}</p>
      </Container>
    </div>
  )
}

export default Footer
