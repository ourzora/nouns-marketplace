import { DAO_PAGE_LIMIT } from 'constants/pagination'
import useSWR from 'swr'
import { NounsDaosQuery } from 'types/zora.api.generated'

import { NOUNS_DAOS_QUERY } from 'data/nounsDaos'

import { useMemo, useState } from 'react'
import { TypeSafeDao, verifyDao } from 'validators/dao'

import { zoraApiFetcher } from '@shared'

interface NounsDaos {
  limit?: number
  after?: string
  keyModifier?: string // optionally add a specific modifier to ensure that the SWR results cache does not inadvertently change the result counts in other places on the site
  refreshInterval?: number
  fallbackData?: NounsDaosQuery
}

export function useNounsDaos({
  limit = DAO_PAGE_LIMIT,
  after = '',
  refreshInterval = 30000,
  fallbackData,
  keyModifier = '',
}: NounsDaos) {
  const [cached, setCache] = useState([] as TypeSafeDao[])
  // const [cached, setCache] = useState<NounsDaosQuery|undefined>(undefined)

  const { data, isValidating } = useSWR<NounsDaosQuery>(
    [keyModifier ? `nounsDaos-${keyModifier}` : `nounsDaos`],
    () =>
      zoraApiFetcher(NOUNS_DAOS_QUERY, {
        limit,
        after,
      }),
    {
      fallbackData,
      refreshInterval,
      // dedupingInterval: 0,
      onErrorRetry: (_, _1, _2, revalidate, { retryCount }) => {
        // Only retry up to 10 times.
        if (retryCount >= 10) return
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 10000)
      },
    }
  )

  const daos = useMemo(() => {
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

  console.log('HOOK DAOS', daos)

  return {
    // response: data,
    daos,
    pageInfo: data?.nouns.nounsDaos.pageInfo,
    isValidating,
  }
}
