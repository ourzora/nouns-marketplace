import { fetchOffchainOrdersForToken } from 'services/offchainOrdersService'
import useSWR from 'swr'

export function useOffchainOrders(contractAddress: string, tokenId: string) {
  const { data, error } = useSWR(
    [`offchain-order_${contractAddress}-${tokenId}`],
    () => fetchOffchainOrdersForToken(contractAddress, tokenId),
    {
      refreshInterval: 30000,
    }
  )

  return {
    data: data,
    error,
  }
}
