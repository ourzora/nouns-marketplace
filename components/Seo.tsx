import NextHead from 'next/head'
import { DEFAULT_SEO, SeoProps } from 'utils/seo'
import { FAVICON } from 'utils/env-vars'

export const Seo = ({
  title,
  description,
  url,
  twitterImageUrl,
}: SeoProps) => (
  <NextHead>
    <meta charSet='UTF-8' />
    <title>{title ? `${title} | ${DEFAULT_SEO.title}` : `${DEFAULT_SEO.title}`}</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='description' content={description || DEFAULT_SEO.description} />
    <link rel='icon' type='image/png' sizes='24x24' href={FAVICON} />
    <meta property='og:url' content={url || DEFAULT_SEO.openGraph.url} />
    <meta property='og:title' content={title || ''} />
    <meta property='og:description' content={description || DEFAULT_SEO.description}/>
    <meta name='twitter:site' content={url || DEFAULT_SEO.openGraph.url} />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:image' content={twitterImageUrl || DEFAULT_SEO.openGraph.images[0].url} />
    <meta property='og:image' content={twitterImageUrl || DEFAULT_SEO.openGraph.images[0].url} />
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='630' />
  </NextHead>
)
