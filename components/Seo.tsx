import { APP_DESCRIPTION, APP_TITLE, BASE_URL, FAVICON, OG_IMAGE } from 'utils/env-vars'

import NextHead from 'next/head'

export const Seo = ({
  title,
  description,
  url,
  ogImage,
}: {
  title?: string
  description?: string
  url?: string
  ogImage?: string
}) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title ? `${title} | ${APP_TITLE}` : APP_TITLE}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description || APP_DESCRIPTION} />
    <link rel="icon" type="image/png" sizes="24x24" href={FAVICON} />
    <meta property="og:url" content={url || BASE_URL} />
    <meta property="og:title" content={title || ''} />
    <meta property="og:description" content={description || APP_DESCRIPTION} />
    <meta name="twitter:site" content={url || BASE_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage || OG_IMAGE} />
    <meta property="og:image" content={ogImage || OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
)
