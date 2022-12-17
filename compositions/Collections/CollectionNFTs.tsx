import { Collections } from 'compositions/Collections'

import React from 'react'

import { CollectionFilterProvider } from '@filter'
import { useWindowWidth } from '@shared'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { GridProps } from '@zoralabs/zord'

export interface CollectionAboutProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
}

export const CollectionNFTs = ({ fallback }: { fallback: any }) => {
  const { contractAddress: collectionAddress, collection, initialPage } = fallback
  const { isLarge } = useWindowWidth()

  return (
    <CollectionFilterProvider
      initialPage={initialPage}
      enableSidebarClearButton
      filtersVisible={isLarge}
      contractAddress={collectionAddress}
      enableSortDropdown
      useCollectionProperties={{
        header: 'Traits',
        selector: 'nouns-market-traits',
      }}
      strings={{
        NO_FILTER_RESULTS_COPY: `Sorry no ${collection?.name} NFTs are available for purchase on chain.`,
      }}
    >
      <Collections collectionAddress={collectionAddress} />
    </CollectionFilterProvider>
  )
}
