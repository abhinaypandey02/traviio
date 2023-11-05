import type { AppProps } from 'next/app'

const UserProvider = dynamic(() => import('@/contexts/UserProvider'))

import dynamic from 'next/dynamic'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
