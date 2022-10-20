import { GALACTUS_BASE_URL } from 'utils/env-vars'

import { allAddresses } from 'constants/collection-addresses'
import { GetServerSideProps } from 'next'

import assert from 'assert'

import * as Sentry from '@sentry/react'
import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'

const zdkFetchStrategy = new ZDKFetchStrategy('1', GALACTUS_BASE_URL)

export type NFTProps = {
  address: string
  tokenId: string
}

export interface NFTParamsProps extends GetServerSideProps<NFTProps> {
  params: NFTProps
}

export async function nftService({ params }: NFTParamsProps) {
  assert(params, 'Page template must provide a params object')

  const tokenAddress = params ? params.address : undefined
  const tokenId = params ? params.tokenId : undefined

  if (!tokenAddress || !tokenId) return false

  // Ensure token is a nounish collection/dao
  if (tokenAddress && !allAddresses.includes(tokenAddress.toLowerCase())) {
    return {
      notFound: true,
    }
  }

  try {
    const nft = prepareJson(await zdkFetchStrategy.fetchNFT(tokenAddress, tokenId))
    return {
      props: {
        nft,
        tokenAddress: tokenAddress,
        tokenId: tokenId,
      },
    }
  } catch (err) {
    Sentry.captureException(err)
    Sentry.captureMessage(
      `NFTService error! tokenAddress=${tokenAddress} tokenId=${tokenId}: ${err}`
    )

    return {
      props: {
        nft: null,
        tokenAddress: tokenAddress,
        tokenId: tokenId,
      },
    }
  }
}
