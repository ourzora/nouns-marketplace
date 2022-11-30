import { GALACTUS_BASE_URL } from 'utils/env-vars'

import { GetServerSideProps } from 'next'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import assert from 'assert'

import { isSeaportOrderValid } from '@market/modules/Seaport/utils/'
import * as Sentry from '@sentry/react'
import { asyncFilter } from '@shared/utils'
import { prepareJson } from '@zoralabs/nft-hooks/dist/fetcher/NextUtils'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'

import { fetchOffchainOrdersForToken } from './offchainOrdersService'

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

  try {
    const nft = prepareJson(await zdkFetchStrategy.fetchNFT(tokenAddress, tokenId))

    // Fetch offchain orders via Seaport. Unfortunately, dirty data, so we must validate each order to determine whether it's been filled :(
    const [allOffchainOrders] = await Promise.all([
      fetchOffchainOrdersForToken(tokenAddress, tokenId),
    ])

    // Filter resolved promises
    const validOffchainOrders: OffchainOrderWithToken[] = await asyncFilter(
      allOffchainOrders,
      async (order: OffchainOrderWithToken) => await isSeaportOrderValid(order)
    )

    // technically in order to serve ONLY NOUNS we need to fetch all nouns builder address
    // upfront, but it makes little to no sense to penalty the performance of app
    // so we only return 404 when backend does not return valid data
    if (!nft) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        nft,
        tokenAddress: tokenAddress,
        tokenId: tokenId,
        offchainOrders: validOffchainOrders,
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
        offchainOrders: null,
      },
    }
  }
}
