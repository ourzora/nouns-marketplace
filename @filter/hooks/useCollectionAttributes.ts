import useSWR from 'swr'
import { AggregateAttribute } from 'types/zora.api.generated'

import { AGGREGATE_ATTRIBUTE_QUERY } from 'data'

import { zoraApiFetcher } from '@shared'

export function useCollectionAttributes({
  addresses,
  refreshInterval = 15000,
}: {
  addresses: string
  refreshInterval?: number
}) {
  const { data } = useSWR(
    [`collectionAttributes-${addresses}`],
    () => zoraApiFetcher(AGGREGATE_ATTRIBUTE_QUERY, { addresses }),
    {
      refreshInterval: refreshInterval,
    }
  )

  return {
    data: data,
    aggregateAttributes: data?.aggregateAttributes as AggregateAttribute[],
  }
}
