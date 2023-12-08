import client from '@/sanity/client'
import { SanityMetaData, SanitySlug } from '@/sanity/types'

export function joinStrings(separator: string, ...strings: string[]): string {
  return strings.filter(Boolean).join(` ${separator.trim()} `)
}

export function displayNumber(
  count: number | undefined,
  singular: string,
  plural: string = singular + 's'
): string {
  return count !== undefined ? `${count} ${count === 1 ? singular : plural}` : `No ${plural}`
}

export function sanitizeSlug(slug: string): string {
  // Remove leading and trailing slashes and sanitize the slug
  return slug
    .replace(/^\/|\/$/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function getSlugsFromPath(path: string): string[] {
  // remove leading and trailing slashes
  const sanitizedPath = sanitizeSlug(path)
  return sanitizedPath.split('/').filter(Boolean)
}

export function getSanitySlugFromSlugs(slugs: string | string[] | undefined): string {
  // Assuming that sanity contains only a leading slash
  if (slugs === undefined) {
    return '/'
  }
  const sanitizedSlugs = Array.isArray(slugs) ? slugs : [slugs]
  return '/' + sanitizedSlugs.map(sanitizeSlug).join('/')
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'November',
  'December',
]

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec']

export default function DateFormat(date: Date, short: boolean = false) {
  if (short) return date.getDate() + ' ' + shortMonths[date.getMonth() - 1] + ' ' + date.getFullYear()
  return months[date.getMonth() - 1] + ' ' + date.getDate() + ', ' + date.getFullYear()
}
const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/

const decodeAssetId = (id: string) => {
  const [, assetId, dimensions, format] = pattern.exec(id) || []
  const [width, height] = dimensions.split('x').map((v) => parseInt(v, 10))

  return {
    assetId,
    dimensions: { width, height },
    format,
  }
}

export function getFirstDayOfMonth(month: number) {
  const firstDay = new Date()
  firstDay.setMonth(month)
  firstDay.setDate(1)
  return firstDay
}

export type PageData = {
  _id: string
  _type: string
  slug: SanitySlug
  meta_data: SanityMetaData
}

export async function getAllPages(): Promise<PageData[]> {
  const pageTypes = [
    'blog_page',
    'destination_page',
    'page',
    'tailor_your_tour',
    'tour_page',
    'travel_guide',
    'travel_wiki',
  ]
  const pages = await client.fetch(`
    *[_type in ${JSON.stringify(pageTypes)}]{
        _id,
        _type,
        slug,
        meta_data
      }
  `)
  return pages
}
