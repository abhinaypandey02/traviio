import { createContext, HTMLAttributes, ReactNode, use, useContext } from 'react'

import { SanityLocale, SanityLocaleNumber, SanityLocaleString } from '@/sanity/types'

export type LocaleContextType = {
  locale: SanityLocale
}

export type PropsWithLocale<T> = T & { locale: SanityLocale }

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
}: { text?: SanityLocaleString } & HTMLAttributes<HTMLSpanElement>) {
  const { locale } = useContext(LocaleContext)
  return <span {...props}>{text?.[locale]}</span>
}

export function localizedString(text?: SanityLocaleString, locale?: SanityLocale) {
  if (!text) return ''
  return text?.[locale ?? 'en'] || ''
}

export function localizedNumber(text?: SanityLocaleNumber, locale?: SanityLocale) {
  if (!text) return 0
  return text?.[locale ?? 'en'] || 0
}

export default LocaleContext
