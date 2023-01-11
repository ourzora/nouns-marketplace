import useSWR from 'swr'
import { SearchResult, SearchableEntity } from 'types/zora.api.generated'

import { zdk } from '@shared'

export function useSearchQuery(query: string, entityType: SearchableEntity) {
  const { data, ...rest } = useSWR(
    query ? ['collectionSearch', query] : null,
    (_, query) =>
      zdk
        .search({
          pagination: {},
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
