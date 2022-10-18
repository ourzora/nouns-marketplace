import useSWR from 'swr'
import { fetchOfflineOrdersForToken } from 'services/offchainOrdersService'
import { NFTObject } from '@zoralabs/nft-hooks'

export function useOffchainOrders(nft?: NFTObject) {
  const { data, error } = useSWR(
    [`offchain-order_${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`],
    () => fetchOfflineOrdersForToken(nft?.nft?.contract.address!, nft?.nft?.tokenId!),
    {
      refreshInterval: 30000,
    }
  )

  return {
    data: data,
    error,
  }
}
