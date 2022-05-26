export const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || ''
export const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || ''
export const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE || ''
export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || ''
export const OG_IMAGE = process.env.NEXT_PUBLIC_OG_IMAGE || ''

export const DEFAULT_SEO = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    type: 'website',
    locale: 'en_IE',
    url: WEBSITE_URL,
    site_name: SITE_TITLE,
    images: [
      {
        url: OG_IMAGE,
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
    ],
  },
  twitter: {
    handle: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
    cardType: 'summary_large_image',
  },
  httpEquiv: '',
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'generator',
      content: 'ZORA',
    },
  ],
}
