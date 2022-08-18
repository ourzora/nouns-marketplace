import useSWR from 'swr'
import {
  NounAuctionQueryProps,
  nounAuctionQuery,
  zoraApiFetcher,
} from '@noun-auction/data'

export function useNounishAuctionQuery(params: NounAuctionQueryProps) {
  const { data: response, error } = useSWR(
    [`nounish-auction-${params.contractAddress}-${params.contractAddress}`, params],
    (_, params) => zoraApiFetcher(() => nounAuctionQuery(params))
  )

  return {
    params,
    data: response?.data ? response?.data : undefined,
    error,
  }
}
