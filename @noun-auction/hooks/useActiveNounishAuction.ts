import gql from 'graphql-tag'

import useSWR from 'swr'

import { activeNounishAuction } from '@noun-auction/data'
import { ActiveNounishAuctionResponse, NounishMarketTypes } from '@noun-auction/typings'
import { zoraApiFetcher } from '@shared'

export function useActiveOGNounishAuction(marketType?: NounishMarketTypes) {
  const { data: response, error } = useSWR(
    [`active-nounish-auction_${marketType}`],
    () =>
      zoraApiFetcher(
        gql`
          ${activeNounishAuction(marketType)}
        `
      ),
    {
      refreshInterval: 1500,
    }
  )

  return {
    data: response?.data?.market
      ? (response?.data?.market as ActiveNounishAuctionResponse)
      : undefined,
    error,
  }
}
