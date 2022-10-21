const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()
const { withSentryConfig } = require('@sentry/nextjs')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const { NEXT_PUBLIC_SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: true,
  },
  // experimental: {  // @BJ: disabled due to out-of-mem errors
  //   esmExternals: false,
  // },

  images: {
    domains: [
      // For debugging images
      'source.unsplash.com',
      'zora-dev.mypinata.cloud',
    ],
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(ts)?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.(md|mdx)?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {},
        },
      ],
    })
    if (NEXT_PUBLIC_SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          urlPrefix: '~/_next',
        })
      )
    }
    return config
  },
}

const sentryWebpackPluginOptions = {
  silent: false,
}

module.exports = withVanillaExtract(
  withSentryConfig(nextConfig, sentryWebpackPluginOptions)
)
