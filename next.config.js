const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      // For debugging images
      'source.unsplash.com',
      'zora-dev.mypinata.cloud',
    ],
  },
}

module.exports = withVanillaExtract(nextConfig)
