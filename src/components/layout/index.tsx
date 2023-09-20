import React, { ReactNode } from 'react'
import localFont from 'next/font/local'

import Footer from './footer'
import Header from './header'
const myFont = localFont({ src: '../../../public/Satoshi-Variable.ttf' })
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={myFont.className}>
      <div className="w-screen overflow-x-hidden min-h-screen flex flex-col bg-white text-black">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
