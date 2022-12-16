import { Seo } from 'components'
import { MarketStats } from 'components/MarketStats/MarketStats'
import { PageWrapper } from 'components/PageWrapper'
import {
  // CollectionActivityHeader,
  CollectionHeader,
  Collections,
} from 'compositions/Collections'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { CollectionServiceProps, collectionService } from 'services/collectionService'

import { useAggregate } from 'hooks'

import { useEffect, useMemo } from 'react'

import { CollectionFilterProvider } from '@filter'
import {
  ActiveAuctionCard, // useOneNounsDao
} from '@noun-auction'
import { useWindowWidth } from '@shared'
import { Grid, Separator, Stack } from '@zoralabs/zord'

const Collection = ({ fallback }: { fallback: CollectionServiceProps }) => {
  const { setCurrentCollection, setCurrentCollectionCount } = useCollectionsContext()
  const { contractAddress: collectionAddress, collection, initialPage, seo } = fallback

  const { isLarge } = useWindowWidth()
  const { nftCount } = useAggregate(collectionAddress)

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
        layout={'dao'}
        currentAuction={
          <ActiveAuctionCard layout={'row'} collectionAddress={collectionAddress} />
        }
      >
        <MarketStats contractAddress={collectionAddress} />
      </CollectionHeader>

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
        // enablePriceRange={{
        //   label: 'Price',
        //   defaultState: 'open',
        //   hideCurrencySelect: true,
        // }}
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

export const getServerSideProps = collectionService

export default Collection
