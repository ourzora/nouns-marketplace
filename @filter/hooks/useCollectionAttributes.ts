import useSWR from 'swr'

import { AGGREGATE_ATTRIBUTE_QUERY } from 'data'

import { zoraApiFetcher } from '@shared'

export function useCollectionAttributes(addresses: string) {
  return useSWR(
    [`collectionAttributes-${addresses}`],
    () => zoraApiFetcher(AGGREGATE_ATTRIBUTE_QUERY, { addresses }),
    {
      refreshInterval: 300000,
    }
  )
}
