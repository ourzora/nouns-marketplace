import useSWR from 'swr'
import { NounsDaosQuery } from 'types/zora.api.generated'

import { NOUNS_DAOS_QUERY } from 'data/nounsDaos'

import { useMemo, useState } from 'react'
import { TypeSafeDao, verifyDao } from 'validators/dao'

import { zoraApiFetcher } from '@shared'

export type AuctionVolumeReturnType =
  | {
      chainTokenPrice: number
      totalCount: number
      usdcPrice: number
    }
  | undefined

interface NounsDaos {
  limit?: number
}

export function useNounsDaos({ limit = 30 }: NounsDaos) {
  const [cached, setCache] = useState([] as TypeSafeDao[])
  const { data } = useSWR<NounsDaosQuery>(
    [`nounsDaos`],
    () =>
      zoraApiFetcher(NOUNS_DAOS_QUERY, {
        limit,
      }),
    {
      refreshInterval: 30000,
      onErrorRetry: (_, _1, _2, revalidate, { retryCount }) => {
        // Only retry up to 10 times.
        if (retryCount >= 10) return
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
    }
  )

  return useMemo(() => {
    const newData = data?.nouns?.nounsDaos?.nodes

    if (newData && newData.length > 0) {
      const verifiedData = newData.map(verifyDao)
      setCache(verifiedData)
      return verifiedData
    } else {
      return cached.length > 0 ? cached : []
    }
    // no need to update when cache changed!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.nouns?.nounsDaos?.nodes])
}
