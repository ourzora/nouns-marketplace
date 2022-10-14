import { RawDisplayer } from 'components/utils'

import { useMemo } from 'react'

import { NFTObject } from '@zoralabs/nft-hooks'
import { Accordion, Stack } from '@zoralabs/zord'

import { FilterCollectionListItem } from './FilterCollectionListItem'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

export function FilterOwnerCollections() {
  const { items } = useCollectionFilters()

  const collections = useMemo(
    () =>
      Object.values(
        items.reduce((c: any, e: any) => {
          if (!c[e.nft?.contract?.address]) c[e.nft?.contract?.address] = e
          return c
        }, {})
      ) as NFTObject[],
    [items]
  )

  return (
    <Accordion label="Collections">
      <Stack gap="x2" pb="x2">
        {collections.map((item) => (
          <FilterCollectionListItem
            key={`${item?.nft?.contract?.address}${item?.nft?.tokenId}`}
            tokenAddress={item.nft?.contract?.address as string}
            tokenName={item.nft?.contract?.name as string}
          />
        ))}
      </Stack>
    </Accordion>
  )
}
