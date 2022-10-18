import { zoraApiFetcher } from '@shared'
import {
  offchainOrderForToken,
  OFFCHAIN_ORDER_FOR_TOKEN_QUERY,
} from 'data/offchainOrders'

export async function fetchOfflineOrdersForToken(
  tokenAddress: string,
  tokenId: string
): Promise<any> {
  const resp: any = await zoraApiFetcher(() =>
    offchainOrderForToken(tokenAddress, tokenId)
  )

  console.log('OFFCHAIN ORDERS: ', resp?.data.offchainOrders.nodes)

  return resp?.data?.offchainOrders?.nodes ?? []
}
