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
