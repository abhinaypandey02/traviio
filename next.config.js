/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'es'], // @/src/sanity/schemas/atoms/locale/index
    defaultLocale: 'en',
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'node-fetch']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
