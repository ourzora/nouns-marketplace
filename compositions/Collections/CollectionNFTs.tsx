import { Collections } from 'compositions/Collections'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { CollectionServiceProps } from 'services/collectionService'

import { useAggregate } from 'hooks'

import React, { useEffect } from 'react'

import { CollectionFilterProvider } from '@filter'
import { useWindowWidth } from '@shared'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { GridProps, Separator, Stack } from '@zoralabs/zord'

export interface CollectionAboutProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
}

export const CollectionNFTs = ({ fallback }: { fallback: CollectionServiceProps }) => {
  const { contractAddress: collectionAddress, collection, initialPage } = fallback
  const { isLarge } = useWindowWidth()

  return (
    <CollectionFilterProvider
      initialPage={initialPage}
      enableSidebarClearButton
      filtersVisible={isLarge}
      contractAddress={collectionAddress}
      enableSortDropdown
      // enableSidebarFilter={false}
      enableSelectedFiltersPanel
      useCollectionProperties={{
        header: 'Traits',
        selector: 'nouns-market-traits',
      }}
      enablePriceRange={{
        label: 'Price',
        defaultState: 'open',
        hideCurrencySelect: true,
      }}
      strings={{
        NO_FILTER_RESULTS_COPY: `Sorry no ${collection?.name} NFTs are available for purchase on chain.`,
      }}
    >
      {/* <Stack>
        <Separator /> */}
      <Collections collectionAddress={collectionAddress} />
      {/* </Stack> */}
    </CollectionFilterProvider>
  )
}
