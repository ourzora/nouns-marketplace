import { useMemo } from 'react'
import { Stack } from '@zoralabs/zord'
import { RawDisplayer } from 'components/utils'
import { useCollectionFilters } from './providers/CollectionFilterProvider'
import { NFTObject } from '@zoralabs/nft-hooks'
import { FilterCollectionListItem } from './FilterCollectionListItem'

export function FilterOwnerCollections() {
  const { items } = useCollectionFilters()

  const collections = useMemo(() => {
    return Object.values(
      items.reduce((c: any, e: any) => {
        if (!c[e.nft?.contract?.address]) c[e.nft?.contract?.address] = e
        return c
      }, {})
    ) as NFTObject[]
  }, [items])

  return (
    <Stack>
      {collections.map((item) => (
        <FilterCollectionListItem
          key={`${item?.nft?.contract?.address}${item?.nft?.tokenId}`}
          tokenAddress={item.nft?.contract?.address as string}
          tokenName={item.nft?.contract?.name as string}
        />
      ))}
    </Stack>
  )
}
