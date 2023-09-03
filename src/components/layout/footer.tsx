import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer__links from './components/Footer__links'
import Address from './components/Address'

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

const LINKS = [
  {
    heading: 'Company',
    items: [
      {
        href: '/review',
        title: 'Review',
      },
      {
        href: '/group-tours',
        title: 'Group Tours',
      },
      {
        href: '/destinations',
        title: 'Destinations',
      },
      {
        href: '/about-us',
        title: 'About Us',
      },
    ],
  },
  {
    heading: 'Company',
    items: [
      {
        href: '/review',
        title: 'Review',
      },
      {
        href: '/group-tours',
        title: 'Group Tours',
      },
      {
        href: '/destinations',
        title: 'Destinations',
      },
      {
        href: '/about-us',
        title: 'About Us',
      },
    ],
  },
  {
    heading: 'Company',
    items: [
      {
        href: '/review',
        title: 'Review',
      },
      {
        href: '/group-tours',
        title: 'Group Tours',
      },
      {
        href: '/destinations',
        title: 'Destinations',
      },
      {
        href: '/about-us',
        title: 'About Us',
      },
    ],
  },
]

const ADDRESSES = [
  {
    heading: 'Egypt Address',
    address: '48 Thawra st., Mohandessen, Giza, 12611, Egypt.',
    number: '+2012 2211 5485',
    email: 'medhat@promotravel-eg.com',
  },
  {
    heading: 'Egypt Address',
    address: '48 Thawra st., Mohandessen, Giza, 12611, Egypt.',
    number: '+2012 2211 5485',
    email: 'medhat@promotravel-eg.com',
  },
  {
    heading: 'Egypt Address',
    address: '48 Thawra st., Mohandessen, Giza, 12611, Egypt.',
    number: '+2012 2211 5485',
    email: 'medhat@promotravel-eg.com',
  },
]

const Footer = () => {
  return (
    <div className="mt-auto w-screen bg-primary flex flex-col">
      <div className="px-10 mt-12 flex flex-wrap justify-between gap-5 py-5">
        {/* Left side */}
        <div className="flex flex-col gap-5 mb-12 md:w-[30%]">
          <div className="flex flex-col">
            <Image src="/company_logo.svg" width={260} height={80} alt="Company logo"></Image>
            <p>
              A company by{' '}
              <Link href="/" className="font-semibold text-blue">
                Promo Travels
              </Link>
            </p>
          </div>
          <p className="leading-relaxed lg:max-w-[60%] mt-3">
            With 30 years of dedicated experience, our travel agency is here to curate your dream
            trip, ensuring exceptional service at every step.
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
              return <Image width={50} height={32} src={item} alt="" key={index} className='w-[50px] h-[32px]'/>
            })}
          </div>
        </div>
        {/* Right side */}
        <div className="grow flex flex-col gap-3 text-darkblue md:w-[66%]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-between">
            {LINKS.map((item, index) => {
              return <Footer__links heading={item.heading} items={item.items} key={index} />
            })}
          </div>
          <hr className="border-gray opacity-20" />
          <p className="font-semibold text-xl">Contact Us</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ADDRESSES.map((item, index) => {
              return (
                <Address
                  address={item.address}
                  email={item.email}
                  heading={item.heading}
                  number={item.number}
                  key={index}
                />
              )
            })}
          </div>
        </div>
      </div>
      <hr className="opacity-30 border-blue" />
      <p className="text-center py-3">Copyright © Promo Travel | 2017 All Rights Reserved</p>
    </div>
  )
}

export default Footer
