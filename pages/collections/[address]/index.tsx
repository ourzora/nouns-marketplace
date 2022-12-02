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
import * as styles from 'styles/styles.css'

import { useAggregate } from 'hooks'

import { useEffect, useMemo } from 'react'

import { CollectionFilterProvider } from '@filter'
import { useCollection } from '@filter/hooks/useCollection'
import {
  ActiveAuctionCard, // useOneNounsDao
} from '@noun-auction'
import { useWindowWidth } from '@shared'
import { Grid, Separator, Stack } from '@zoralabs/zord'

const Collection = ({ fallback }: { fallback: CollectionServiceProps }) => {
  const { setCurrentCollection, setCurrentCollectionCount } = useCollectionsContext()
  const { contractAddress: collectionAddress, seo } = fallback
  // const { dao } = useOneNounsDao({ collectionAddress })

  const { isLarge } = useWindowWidth()
  const { nftCount } = useAggregate(collectionAddress)
  // wrapper for useSWR
  const { data } = useCollection(collectionAddress)
  const collection = useMemo(
    () => data || fallback?.collection,
    [data, fallback?.collection]
  )

  console.log('COLLECTION PAGE')

  useEffect(() => {
    // console.log('useEffect')
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
      {/* <Grid
        className={[styles.pageGrid]}
        px={{ '@initial': 'x0', '@1024': 'x8' }}
        gap="x2"
        alignSelf="center"
      >
        <CollectionHeader
          collection={collection}
          layout={'dao'}
          currentAuction={
            <ActiveAuctionCard layout={'row'} collectionAddress={collectionAddress} />
          }
        >
          <MarketStats contractAddress={collectionAddress} />
        </CollectionHeader>
      </Grid> */}
      <CollectionFilterProvider
        enableSidebarClearButton
        filtersVisible={isLarge}
        contractAddress={collectionAddress}
        enableSortDropdown
        // enableSelectedFiltersPanel
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

export const getServerSideProps = collectionService

export default Collection
