import useSWR from 'swr'

import { nounishAuctionVolume } from 'data'

import { zoraApiFetcher } from '@shared'

export type AuctionVolumeReturnType =
  | {
      chainTokenPrice: number
      totalCount: number
      usdcPrice: number
    }
  | undefined

export function useAuctionVolume(
  collectionAddress: string,
  salesType?: 'NOUNS_AUCTION_SALE' | 'LIL_NOUNS_AUCTION_SALE'
) {
  // const { data, error } = useSWR(
  //   [`active-nounish-auction_${salesType}-${collectionAddress}`],
  //   () => zoraApiFetcher(() => nounishAuctionVolume(salesType, collectionAddress)),
  //   {
  //     refreshInterval: 1500,
  //   }
  // )

  // return {
  //   data: data?.data?.aggregateStat?.salesVolume as AuctionVolumeReturnType,
  //   error,
  // }

  return null
}
