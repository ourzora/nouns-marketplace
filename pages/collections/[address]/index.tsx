import { Seo } from 'components'
import { MarketStats } from 'components/MarketStats/MarketStats'
import { PageWrapper } from 'components/PageWrapper'
import {
  CollectionActivityHeader,
  CollectionHeader,
  Collections,
} from 'compositions/Collections'
import { returnDao } from 'constants/collection-addresses'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { CollectionServiceProps, collectionService } from 'services/collectionService'
import * as styles from 'styles/styles.css'

import { useAggregate } from 'hooks'

import { useEffect } from 'react'

import { CollectionFilterProvider } from '@filter'
import { useCollection } from '@filter/hooks/useCollection'
import { ActiveAuctionCard } from '@noun-auction'
import { useWindowWidth } from '@shared'
import { Grid, Separator, Stack } from '@zoralabs/zord'

const Collection = ({ fallback }: { fallback: CollectionServiceProps }) => {
  const { contractAddress, seo } = fallback
  const { setCurrentCollection, setCurrentCollectionCount } = useCollectionsContext()
  const dao = returnDao(contractAddress)
  const { isLarge } = useWindowWidth()
  const { aggregate } = useAggregate(contractAddress)
  // wrapper for useSWR
  const { data } = useCollection(contractAddress)
  const collection = data || fallback?.collection

  useEffect(() => {
    if (collection?.name) {
      const nftCount = aggregate?.aggregateStat.nftCount
      setCurrentCollection(collection.name)
      setCurrentCollectionCount(nftCount ? `${nftCount} NFTs` : '... NFTs')
    }
    return () => {
      setCurrentCollection('Explore...')
      setCurrentCollectionCount(undefined)
    }
  }, [aggregate, collection, setCurrentCollection, setCurrentCollectionCount])

  return (
    <PageWrapper direction="column" gap="x4">
      <Seo title={seo.title} description={seo.description} />
      <Grid
        className={[styles.pageGrid]}
        px={{ '@initial': 'x0', '@1024': 'x8' }}
        gap="x2"
        alignSelf="center"
      >
        {collection && (
          <CollectionHeader
            collection={collection}
            layout={dao ? 'dao' : 'collection'}
            currentAuction={dao ? <ActiveAuctionCard daoConfig={dao} /> : null}
          >
            <MarketStats contractAddress={contractAddress} />
          </CollectionHeader>
        )}
      </Grid>
      {contractAddress && (
        <CollectionFilterProvider
          useSidebarClearButton
          filtersVisible={isLarge}
          contractAddress={contractAddress}
          useSortDropdown
          useCollectionProperties={{
            header: 'Traits',
            selector: 'nouns-market-traits',
            hideBorder: true,
          }}
          usePriceRange={{
            label: 'Price',
            defaultState: 'open',
            hideBorder: true,
            hideCurrencySelect: true,
          }}
          strings={{
            NO_FILTER_RESULTS_COPY: `Sorry no ${collection?.name} NFTs are available for purchase on chain.`,
          }}
        >
          <Stack>
            {dao ? <Separator /> : <CollectionActivityHeader />}
            <Collections collectionAddress={contractAddress} />
          </Stack>
        </CollectionFilterProvider>
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
