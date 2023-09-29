import React, { ReactNode } from 'react'
import localFont from 'next/font/local'

import { SanityGlobals } from '@/sanity/types'

import Footer from './footer'
import Header from './header'
const myFont = localFont({ src: '../../../public/Satoshi-Variable.ttf' })
const Layout = ({ children, globals }: { children: ReactNode; globals?: SanityGlobals }) => {
  return (
    <div className={myFont.className}>
      <div className="overflow-x-hidden bg-white text-black min-h-screen">
        <Header navbar={globals?.navbar} />
        <main>{children}</main>
        <Footer footer={globals?.footer} />
      </div>
    </div>
  )
}

export default Layout
