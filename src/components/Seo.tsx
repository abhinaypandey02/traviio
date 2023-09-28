import Head from 'next/head'

const siteMetadata = {
  title: 'Traviio Tours',
  description: 'Traviio Tours',
  keywords: 'traviio, tours',
  url: 'https://rapid-boost.com',
  image: 'https://rapid-boost.com/logo.png',
}
export default function SEO({
  title,
  description,
  image,
}: {
  title?: string
  description?: string
  image?: string
}) {
  const TITLE = title || siteMetadata.title
  const DESCRIPTION = description || siteMetadata.description
  return (
    <Head>
      <title>{TITLE}</title>
      <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#3322d0" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content={DESCRIPTION} />
      <meta name="keywords" content={siteMetadata.keywords} />
      <meta property="og:site_name" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:title" content={TITLE} />
      <meta
        property="og:image"
        content={image || siteMetadata.image}
        key={image || siteMetadata.image}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={image || siteMetadata.image} />
    </Head>
  )
}
