import useSWR from 'swr'
import { OneNounsDaoQuery } from 'types/zora.api.generated'

import { ONE_NOUNS_DAO } from 'data/oneNounceDao'

import { useMemo, useState } from 'react'
import { TypeSafeDao, verifyDao } from 'validators/dao'

import { zoraApiFetcher } from '@shared'

export function useOneNounsDao({ contractAddress }: { contractAddress: string }) {
  const [cached, setCache] = useState<TypeSafeDao | undefined>()

  const { data, error } = useSWR<OneNounsDaoQuery>(
    [`nounish-auction-${contractAddress}`],
    () => zoraApiFetcher(ONE_NOUNS_DAO, { contractAddress })
  )
  const dao = useMemo(() => {
    const newData = data?.nouns?.nounsDaos?.nodes[0]

    if (typeof newData !== 'undefined') {
      const verifiedData = verifyDao(newData)
      setCache(verifiedData)
      return verifiedData
    } else {
      return cached
    }
    // no need to update when cache changed!
  }, [data?.nouns?.nounsDaos?.nodes])

  return {
    dao,
    error,
  }
}
