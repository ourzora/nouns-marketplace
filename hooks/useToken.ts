import useSWR from 'swr'
import { TokenQuery } from 'types/zora.api.generated'

import { TOKEN_QUERY } from 'data/token'

import { useMemo, useState } from 'react'
import { TypeSafeToken, verifyToken } from 'validators/token'

import { zoraApiFetcher } from '@shared'

type Params = {
  collectionAddress: string
  tokenId: string
}

export function useToken({ collectionAddress, tokenId }: Params) {
  const [cached, setCache] = useState<TypeSafeToken | undefined>()
  const { data, error } = useSWR<TokenQuery>(
    [`${collectionAddress}-${tokenId}`],
    () =>
      zoraApiFetcher(TOKEN_QUERY, {
        collectionAddress,
        tokenId,
      }),
    {
      onErrorRetry: (_, _1, _2, revalidate, { retryCount }) => {
        // Only retry up to 10 times.
        if (retryCount >= 10) return
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
      dedupingInterval: 3000,
      refreshInterval: 5000,
    }
  )

  const token = useMemo(() => {
    const newData = data?.token?.token

    if (typeof newData !== 'undefined') {
      const verifiedData = verifyToken(newData)
      setCache(verifiedData)
      return verifiedData
    } else {
      return cached
    }
    // no need to update when cache changed!
  }, [data?.token?.token])

  return {
    token,
    error,
  }
}
