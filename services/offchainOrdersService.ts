import { DocumentNode } from 'graphql'

import { OFFCHAIN_ORDER_FOR_TOKEN_QUERY } from 'data/offchainOrders'

import * as Sentry from '@sentry/react'

import { client } from '../@shared/utils'

// ↓↓↓ Oleg's re-implementation of zoraApiFetcher. Used here, for now, but he has replaced it elsewhere in the app in an upcoming PR. This can be removed and replaced when he's done so.

export async function zoraApiFetcher(query: DocumentNode, providedVariables?: any) {
  let variables = {
    network: { chain: 'MAINNET', network: 'ETHEREUM' },
    ...providedVariables,
  }

  try {
    const response = await client.request(query, variables)
    return response
  } catch (err) {
    Sentry.captureException(err)
  }
}
// ↑↑↑ Oleg's re-implementation of zoraApiFetcher.

export async function fetchOffchainOrdersForToken(
  tokenAddress: string,
  tokenId: string
): Promise<any> {
  const resp: any = await zoraApiFetcher(OFFCHAIN_ORDER_FOR_TOKEN_QUERY, {
    tokenAddress,
    tokenId,
  })

  return resp?.offchainOrders?.nodes ?? []
}
