import type { AppProps } from 'next/app'

import UserProvider from '@/contexts/UserProvider'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
