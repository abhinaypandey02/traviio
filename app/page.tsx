import { SectionMap } from '@/lib/components/sections'
import client from '@/lib/sanity/client'
import Slicer from '@/lib/sanity/slicer'
import { SanityPage } from '@/lib/sanity/types'

export default async function Home() {
  const data = await fetchPageData()

  return <Slicer components={SectionMap} sections={data.sections} />
}

async function fetchPageData(): Promise<SanityPage> {
  const page = (await client.fetch(`*[_type == "page"  && slug.current == "/"][0]`)) as SanityPage

  return page
}
