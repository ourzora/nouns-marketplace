import useSWR from 'swr'
import {
  NounAuctionQueryProps,
  ContractMarketProps,
  nounAuctionQuery,
  activeAuction,
  zoraApiFetcher,
} from '@noun-auction/data'

export function useActiveNounishAuctionQuery(params: ContractMarketProps) {
  const { data: response, error } = useSWR(
    [`nounish-active-auction-${params.contractAddress}`, params],
    (_, params) => zoraApiFetcher(() => activeAuction(params))
  )

  return {
    activeToken: response?.data
      ? response?.data?.markets?.nodes[0]?.market?.tokenId
      : undefined,
    params,
    error,
  }
}

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
