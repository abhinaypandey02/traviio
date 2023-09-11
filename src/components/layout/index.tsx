import React, { ReactNode } from 'react'

import Footer from './footer'
import Header from './header'

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
