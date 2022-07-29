import useSWR from 'swr'
import { ContractAuctionData } from '@noun-auction/typings'

export function useAuctionRPC(auctionContract?: string) {
  const { data, error } = useSWR<ContractAuctionData>(`/api/auction/${auctionContract}`, {
    refreshInterval: 750,
  })

  return {
    data,
    error,
  }
}
