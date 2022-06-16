import useSWR from 'swr'
import { zdkService } from '@shared/utils/zdk'
import { SearchableEntity, SearchResult } from '@zoralabs/zdk/dist/queries/queries-sdk'

export function useSearchQuery(query: string, entityType: SearchableEntity) {
  const { data, ...rest } = useSWR(
    query ? ['collectionSearch', query] : null,
    (_, query) =>
      zdkService
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
