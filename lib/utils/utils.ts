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
