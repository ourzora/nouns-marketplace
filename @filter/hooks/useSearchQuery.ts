import useSWR from 'swr'
import { zdk } from '@shared'
import { SearchableEntity, SearchResult } from '@zoralabs/zdk/dist/queries/queries-sdk'

export function useSearchQuery(query: string, entityType: SearchableEntity) {
  const { data, ...rest } = useSWR(
    query ? ['collectionSearch', query] : null,
    (_, query) =>
      zdk
        .search({
          pagination: {},
          /* @ts-ignore */
          query: query,
          filter: { entityType },
        })
        .then((resp) => resp.search.nodes)
  )
  return {
    data: data as SearchResult[],
    ...rest,
  }
}
