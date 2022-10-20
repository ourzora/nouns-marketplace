import { useState } from 'react'

import { SearchableEntity } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Accordion, InputField, Stack } from '@zoralabs/zord'

import { FilterCollectionListItem } from './FilterCollectionListItem'
import { useSearchQuery } from './hooks/useSearchQuery'

export function CollectionsFilterList() {
  const [query, setQuery] = useState<string>('')
  const { data = [] } = useSearchQuery(query, SearchableEntity.Collection)

  return (
    <Accordion label="Collections">
      <Stack gap="x2" pb="x2">
        <InputField
          icon="Search"
          name="search"
          placeholder="Search collections..."
          /* @ts-ignore */
          onChange={(e) => setQuery(e.target.value)}
          affix="search"
        />
        {data.map((result) => (
          <FilterCollectionListItem
            key={result.collectionAddress}
            tokenAddress={result.collectionAddress}
            tokenName={result?.name}
            count={
              (result.entity?.__typename === 'Collection' &&
                result.entity?.totalSupply) ||
              0
            }
          />
        ))}
      </Stack>
    </Accordion>
  )
}
