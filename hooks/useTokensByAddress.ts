import useSWR from 'swr'
import { NounsTokensByOwnerAddressQuery } from 'types/zora.api.generated'

import { TOKENS_BY_ADDRESS_QUERY } from 'data/tokensByAddress'

import { zoraApiFetcher } from '@shared'

type Params = {
  ownerAddress: string
}

export function useTokensByAddress({ ownerAddress }: Params) {
  const { data, error } = useSWR<NounsTokensByOwnerAddressQuery>(
    [`${ownerAddress}`],
    () =>
      zoraApiFetcher(TOKENS_BY_ADDRESS_QUERY, {
        ownerAddress,
      }),
    {
      onErrorRetry: (_, _1, _2, revalidate, { retryCount }) => {
        // Only retry up to 1 times.
        if (retryCount >= 2) return
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
      dedupingInterval: 10000,
      refreshInterval: 5000,
    }
  )

  return {
    tokensByAddress: data?.tokens?.nodes ?? [],
    error,
  }
}
