import { createClient } from 'next-sanity'

import imageUrlBuilder from '@sanity/image-url'

import { SanityPhoto } from './types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2021-10-21',
  useCdn: true,
})
export default client
export function urlFor(source: SanityPhoto): string {
  if (!source) return ''
  return imageUrlBuilder(client).image(source).url()
}
const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/
export const decodeAssetId = (id: string) => {
  const patternExec = pattern.exec(id)
  if (!patternExec) {
    return {}
  }
  const [, assetId, dimensions, format] = patternExec
  const [width, height] = dimensions.split('x').map((v) => parseInt(v, 10))

  return {
    assetId,
    dimensions: { width, height },
    format,
  }
}
