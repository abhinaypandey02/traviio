import { createContext, HTMLAttributes, ReactNode, use, useContext } from 'react'

import { SanityLocale, SanityLocaleString } from '@/sanity/types'

export type LocaleContextType = {
  locale: SanityLocale
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
})

export function LocaleProvider({
  children,
  locale,
}: {
  children: ReactNode
  locale: SanityLocale
}) {
  return <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>
}

export function LocalizedString({
  text,
  ...props
}: { text: SanityLocaleString } & HTMLAttributes<HTMLSpanElement>) {
  const { locale } = useContext(LocaleContext)
  return <span {...props}>{text[locale]}</span>
}

export function localizedString(text: SanityLocaleString, locale?: SanityLocale) {
  return text[locale ?? 'en']
}

export default LocaleContext
