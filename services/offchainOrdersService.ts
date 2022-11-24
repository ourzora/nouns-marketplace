import { Chain, Network, OffchainOrderForTokenQuery } from 'types/zora.api.generated'

import { OFFCHAIN_ORDER_FOR_TOKEN_QUERY } from 'data/offchainOrders'

import { zoraApiFetcher } from '../@shared/utils'

export async function fetchOffchainOrdersForToken(
  tokenAddress: string,
  tokenId: string,
  network?: Network,
  chain?: Chain
): Promise<any> {
  const resp: OffchainOrderForTokenQuery = await zoraApiFetcher(
    OFFCHAIN_ORDER_FOR_TOKEN_QUERY,
    {
      tokenAddress,
      tokenId,
      network: network ?? Network.Ethereum,
      chain: chain ?? Chain.Mainnet,
    }
  )

  return resp?.offchainOrders?.nodes ?? []
}
