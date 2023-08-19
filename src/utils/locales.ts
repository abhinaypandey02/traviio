import { SanityLocale, SanityPage } from '@/sanity/types'

import { getSlugsFromPath } from './utils'

export type LocalePage = {
  locale: SanityLocale
}

export function getPaths(
  sanitySlugs: SanityPage['slug'][],
  locales: string[] | undefined
): {
  params: {
    slug: string[]
  }
  locale: string
}[] {
  return sanitySlugs
    .map((slug) =>
      (locales ?? []).map((locale) => ({
        params: {
          slug: getSlugsFromPath(slug.current),
        },
        locale,
      }))
    )
    .flat()
}
