/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'es'], // @/src/sanity/schemas/atoms/locale/index
    defaultLocale: 'en',
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'node-fetch'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
  },
  reactStrictMode: false,
}
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true,
// })
module.exports = nextConfig
