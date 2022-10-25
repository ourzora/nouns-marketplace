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

export function useNounsDaos() {
  const [cached, setCache] = useState([] as TypeSafeDao[])
  const { data, error } = useSWR<NounsDaosQuery>([`noundsDaos`], () =>
    zoraApiFetcher(NOUNS_DAOS_QUERY)
  )

  const daos = useMemo(() => {
    const newData = data?.nouns?.nounsDaos?.nodes

    if (typeof newData !== 'undefined') {
      if ((newData?.length ?? []) > 0) {
        const verifiedData = newData.map(verifyDao)
        setCache(verifiedData)
        return verifiedData
      } else {
        return cached.length > 0 ? cached : []
      }
    } else {
      return []
    }
    // no need to update when cache changed!
  }, [data?.nouns?.nounsDaos?.nodes])

  return {
    daos,
    error,
  }
}
