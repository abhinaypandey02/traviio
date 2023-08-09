import client from '@/lib/sanity/client'
import { SanityPage } from '@/lib/sanity/types'

type PageStaticProps = {
  slug: string
}

type PageProps = {
  params: PageStaticProps
}

export default async function Page({ params }: PageProps) {
  const pageData: SanityPage = await client.fetch(
    `*[_type == "page" && slug.current == "/${params.slug}"][0]`
  )

  console.log({ pageData })

  return <div>{JSON.stringify({ slug: params.slug, pageData })}</div>
}

export async function generateStaticParams(): Promise<PageStaticProps[]> {
  const slugs = (await client.fetch(`*[_type == "page"]{slug}`)) as SanityPage['slug'][]
  return slugs.map((slug) => ({
    slug: slug.current,
  }))
}
