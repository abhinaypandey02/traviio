import { createContext, HTMLAttributes, ReactNode, use, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  SanityLocale,
  SanityLocaleNumber,
  SanityLocaleString,
  SanityLocaleText,
} from '@/sanity/types'

export type LocaleContextType = {
  locale: SanityLocale
}

export type PropsWithLocale<T> = T & { locale: SanityLocale }

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
})
export const getRedirectLanguage = () => {
  if (typeof navigator === `undefined`) {
    return 'en'
  }
  const lang = navigator && navigator.language && navigator.language.split('-')[0]
  if (!lang) return 'en'
  return lang
}
export function LocaleProvider({
  children,
  locale,
}: {
  children: ReactNode
  locale: SanityLocale
}) {
  // const router = useRouter()
  // useEffect(() => {
  //   const redirect_language = getRedirectLanguage()
  //   if (redirect_language != locale) {
  //     router.push(router.asPath, { pathname: router.asPath }, { locale: redirect_language })
  //   }
  // }, [])
  return <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>
}

export function LocalizedString({
  text,
  ...props
}: { text?: SanityLocaleString | SanityLocaleText } & HTMLAttributes<HTMLSpanElement>) {
  const { locale } = useContext(LocaleContext)
  return <span {...props}>{text?.[locale]}</span>
}

export function localizedString(
  text?: SanityLocaleString | SanityLocaleText,
  locale?: SanityLocale
) {
  if (!text) return ''
  return text?.[locale ?? 'en'] || ''
}

export function localizedNumber(text?: SanityLocaleNumber, locale?: SanityLocale) {
  if (!text) return 0
  return text?.[locale ?? 'en'] || 0
}

export default LocaleContext
