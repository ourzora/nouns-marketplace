import useSWR from 'swr'
import { NounishAuctionsQuery } from 'types/zora.api.generated'

import { NOUNISH_AUCTIONS_QUERY } from 'data/nounishAuctions'

import { useMemo, useState } from 'react'
import { TypeSafeNounsAuction, verifyAuction } from 'validators/auction'

import { zoraApiFetcher } from '@shared'

export function useNounishAuctionQuery({
  collectionAddress,
}: {
  collectionAddress: string
}) {
  const [cached, setCache] = useState<TypeSafeNounsAuction | undefined>(undefined)
  const { data, error, ...rest } = useSWR<NounishAuctionsQuery>(
    `nounish-auction-${collectionAddress}`,
    async () =>
      zoraApiFetcher(NOUNISH_AUCTIONS_QUERY, {
        collectionAddress,
      }),
    {
      onErrorRetry: (_, _1, _2, revalidate, { retryCount }) => {
        // Only retry up to 10 times.
        if (retryCount >= 10) return
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
      dedupingInterval: 5000,
      refreshInterval: 5000,
    }
  )

  const activeAuction: TypeSafeNounsAuction | undefined = useMemo(() => {
    const newData = data?.nouns?.nounsActiveMarket

    if (newData) {
      const verifiedData = verifyAuction(newData)
      setCache(verifiedData)
      return verifiedData
    } else {
      return cached
    }
    // no need to update when cache changed!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.nouns?.nounsActiveMarket])

  const hasActiveAuction = !!activeAuction

  return {
    activeAuction,
    auctionContractAddress: activeAuction?.address,
    hasActiveAuction,
    error,
  }
}
