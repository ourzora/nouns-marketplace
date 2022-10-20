import useSWR from 'swr'
import { zoraApiFetcher } from '@shared'
import { NOUNISH_AUCTIONS_QUERY } from 'data/nounishAuctions'
import { NounishAuctionsQuery } from 'types/zora.api.generated'

export function useNounishAuctionQuery({
  collectionAddress,
}: {
  collectionAddress: string
}) {
  const { data, error } = useSWR<NounishAuctionsQuery>(
    [`nounish-auction-${collectionAddress}`],
    () => zoraApiFetcher(NOUNISH_AUCTIONS_QUERY, { collectionAddress })
  )

  if (error || !data) {
    error ? console.error(error) : console.error(`No data for ${collectionAddress}`)
    return {
      auction: undefined,
    }
  }

  // console.log(`useNounishAuctionQuery: ${collectionAddress}`, data)

  return {
    activeNounishAuction: data.nouns.nounsActiveMarket,
    error,
  }
}
