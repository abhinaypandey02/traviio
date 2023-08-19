/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'es'], // @/src/sanity/schemas/atoms/locale/index
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
