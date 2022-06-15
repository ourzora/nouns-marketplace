import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { identity, pickBy, truncate } from 'lodash'
import { NETWORK_CHAIN_ID } from 'utils/env-vars'
import {
  OG_IMAGE,
  APP_DESCRIPTION,
  APP_TITLE,
  TWITTER_HANDLE,
  BASE_URL,
} from 'utils/env-vars'

export const DEFAULT_SEO = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_TITLE,
    type: 'website',
    locale: 'en_IE',
    url: BASE_URL,
    site_name: APP_TITLE,
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
      content: APP_TITLE,
    },
  ],
}

export type SeoProps = {
  title?: string
  description?: string
  url?: string
  image?: string
  twitterImageUrl?: string
}

export function buildMetaTags({
  title: rawTitle = APP_TITLE,
  description = APP_DESCRIPTION,
  url = BASE_URL,
  image = OG_IMAGE,
  twitterImageUrl,
}: SeoProps) {
  const title = rawTitle

  return [
    {
      name: 'title',
      content: title,
    },
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:url',
      content: url,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: image,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:site',
      content: TWITTER_HANDLE,
    },
    {
      name: 'twitter:url',
      content: url,
    },
    {
      name: 'twitter:image',
      content: twitterImageUrl || image,
    },
  ]
}

export function buildGalactusNFTSeo(nft: NFTObject, path: string): SeoProps {
  const description = nft.metadata
    ? truncate(nft.metadata.description || '', { length: 120 })
    : ''

  const image = nft.media?.image?.uri || nft.media?.thumbnail?.uri || OG_IMAGE
  const contractName = nft.nft?.contract.name

  return {
    title: (nft.metadata?.name || `#${nft.nft?.tokenId}`) + ` | ${contractName}`,
    description,
    image,
    url: `${BASE_URL}/${path}`,
    twitterImageUrl: encodeURI(image),
  }
}

export async function buildCollectionSEO(
  collectionName?: string | null,
  symbol?: string | null,
  iconURL?: string | null
): Promise<SeoProps> {
  const title = `${symbol ? symbol + ': ' : ''}${collectionName} NFT Marketplace`
  const description = `${
    symbol ? symbol + ': ' : ''
  }Buy, sell and explore ${collectionName} NFTs`
  const image = iconURL ? iconURL : OG_IMAGE

  return pickBy(
    {
      title,
      description,
      image: image,
      url: `${BASE_URL}/${NETWORK_CHAIN_ID}/${collectionName}`,
    },
    identity
  )
}
