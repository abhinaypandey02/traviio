import React, { ReactNode } from 'react'

import Header from './header'
import Footer from './footer'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen overflow-x-hidden min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
