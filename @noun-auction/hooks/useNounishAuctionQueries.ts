import { utils } from 'ethers'
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
        // collectionAddress: utils.getAddress(collectionAddress),
        collectionAddress,
      })
  )

  console.log(error)

  if (collectionAddress === '0xccbb1b4d6bab4e3e4f1aaa1c92c6f2d42ce255d3') {
    console.log({ data, rest })
  }

  const activeAuction = useMemo(() => {
    const newData = data?.nouns?.nounsActiveMarket

    if (newData) {
      const verifiedData = verifyAuction(newData)
      setCache(verifiedData)
      return verifiedData
    } else {
      return cached
    }
    // no need to update when cache changed!
  }, [data?.nouns?.nounsActiveMarket])

  return {
    activeAuction,
    error,
  }
}
