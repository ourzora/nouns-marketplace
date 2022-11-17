import { OffchainOrderForTokenQuery } from 'types/zora.api.generated'

import { OFFCHAIN_ORDER_FOR_TOKEN_QUERY } from 'data/offchainOrders'

import { zoraApiFetcher } from '../@shared/utils'

export async function fetchOffchainOrdersForToken(
  tokenAddress: string,
  tokenId: string
): Promise<any> {
  const resp: OffchainOrderForTokenQuery = await zoraApiFetcher(
    OFFCHAIN_ORDER_FOR_TOKEN_QUERY,
    {
      tokenAddress,
      tokenId,
    }
  )

  return resp?.offchainOrders?.nodes ?? []
}
