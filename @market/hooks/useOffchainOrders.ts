import { fetchOffchainOrdersForToken } from 'services/offchainOrdersService'
import useSWR from 'swr'

import { NFTObject } from '@zoralabs/nft-hooks'

export function useOffchainOrders(nft?: NFTObject) {
  const { data, error } = useSWR(
    [`offchain-order_${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`],
    () => fetchOffchainOrdersForToken(nft?.nft?.contract.address!, nft?.nft?.tokenId!),
    {
      refreshInterval: 30000,
    }
  )

  return {
    data: data,
    error,
  }
}
