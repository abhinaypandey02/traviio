import React, { ReactNode } from 'react'
import localFont from 'next/font/local'

import { SanityGlobals, SanityLocale, SanityPromoBanner } from '@/sanity/types'

import PromoBanner from '@/components/PromoBanner'

import Breadcrumbs, { Breadcrumb } from '@/components/atoms/Breadcrumbs'

import Footer from './footer'
import Header from './header'
const myFont = localFont({ src: '../../../public/Satoshi-Variable.woff2' })
const Layout = ({
  children,
  globals,
  breadcrumbs,
  promo_banner,
  locale,
  head,
}: {
  children: ReactNode
  globals?: SanityGlobals
  breadcrumbs: Breadcrumb[]
  promo_banner?: SanityPromoBanner
  locale: SanityLocale
  head?: any
}) => {
  return (
    <div className={myFont.className}>
      <div
        className="overflow-x-hidden bg-white text-black min-h-screen  flex flex-col"
        // style={{ width: process.env.NEXT_PUBLIC_DEVELOPMENT ? 1440 : '' }}
        style={{ width: process.env.NEXT_PUBLIC_DEVELOPMENT ? '' : '' }}
      >
        <Header navbar={globals?.navbar} />

        <main className={'grow'}>
          <Breadcrumbs paths={breadcrumbs} />
          <PromoBanner banner={promo_banner} locale={locale} />

          {children}
        </main>
        <Footer footer={globals?.footer} />
      </div>
    </div>
  )
}

export default Layout
