import { Seo } from 'components'
import { MarketStats } from 'components/MarketStats/MarketStats'
import { PageWrapper } from 'components/PageWrapper'
import {
  ALL_COLLECTION_VIEWS,
  ActiveCollectionPageView, // CollectionActivityHeader,
  CollectionHeader,
  Collections,
} from 'compositions/Collections'
import { useRouter } from 'next/router'
import { useCollectionsContext } from 'providers/CollectionsProvider'

import { useAggregate } from 'hooks'

import React, { useEffect, useState } from 'react'

import { CollectionFilterProvider } from '@filter'
import { ActiveAuctionCard } from '@noun-auction'
import { Separator, Stack } from '@zoralabs/zord'

const Collection = ({ fallback }: { fallback: any }) => {
  const { setCurrentCollection, setCurrentCollectionCount } = useCollectionsContext()
  const { contractAddress: collectionAddress, collection, seo } = fallback
  const [activeView, setActiveView] = useState<ActiveCollectionPageView>('about')
  const { nftCount } = useAggregate(collectionAddress)
  const { asPath } = useRouter()
  const router = useRouter()

  useEffect(() => {
    const urlHash = asPath.split('#')[1] as ActiveCollectionPageView
    const isValidHash = ALL_COLLECTION_VIEWS && ALL_COLLECTION_VIEWS.includes(urlHash)
    setActiveView(isValidHash ? urlHash : 'about')
    router.push(`/collections/${collectionAddress}/#${isValidHash ? urlHash : 'about'}`)
    // No deps, should only run on first load:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (collection?.name) {
      setCurrentCollection(collection.name)
      setCurrentCollectionCount(nftCount ? `${nftCount} NFTs` : '... NFTs')
    }
    return () => {
      setCurrentCollection('Explore...')
      setCurrentCollectionCount(undefined)
    }
  }, [nftCount, collection, setCurrentCollection, setCurrentCollectionCount])

  return (
    <PageWrapper direction="column" gap="x4">
      <Seo title={seo.title} description={seo.description} />

      <CollectionHeader
        collection={collection}
        currentAuction={
          <ActiveAuctionCard layout={'row'} collectionAddress={collectionAddress} />
        }
      >
        <MarketStats contractAddress={collectionAddress} />
      </CollectionHeader>

      <CollectionFilterProvider
        enableSidebarClearButton
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
        <Stack>
          <Separator />
          <Collections collectionAddress={collectionAddress} />
        </Stack>
      </CollectionFilterProvider>
    </PageWrapper>
  )
}

export default Collection
