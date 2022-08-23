import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { useEffect } from 'react'
import { MarketStats } from 'components/MarketStats/MarketStats'
import { Seo } from 'components'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import {
  Collections,
  CollectionActivityHeader,
  CollectionHeader,
} from 'compositions/Collections'
import { CollectionFilterProvider } from '@filter'
import { Stack, Separator } from '@zoralabs/zord'
import { useCollection } from '@filter/hooks/useCollection'
import { returnDao } from 'constants/collection-addresses'
import { useWindowWidth } from '@shared'
import { ActiveAuctionCard } from '@noun-auction'
import { useAggregate } from 'hooks'

const Collection = ({ contractAddress, seo, collection }: CollectionServiceProps) => {
  const { setCurrentCollection, setCurrentCollectionCount } = useCollectionsContext()
  const { isLarge } = useWindowWidth()
  const { aggregate } = useAggregate(contractAddress)

  const dao = returnDao(contractAddress)

  useEffect(() => {
    if (collection && collection?.name) {
      setCurrentCollection(collection.name)
      setCurrentCollectionCount(
        aggregate?.aggregateStat.nftCount
          ? `${aggregate?.aggregateStat.nftCount} NFTs`
          : '... NFTs'
      )
    }
    return () => {
      setCurrentCollection('Explore...')
      setCurrentCollectionCount(undefined)
    }
  }, [aggregate, collection, setCurrentCollection, setCurrentCollectionCount])

  const { data } = useCollection(contractAddress)

  return (
    <PageWrapper direction="column" gap="x4">
      <Seo title={seo.title} description={seo.description} />
      <CollectionHeader
        collection={collection}
        layout={dao ? 'dao' : 'collection'}
        currentAuction={dao ? <ActiveAuctionCard daoConfig={dao} /> : null}
      >
        <MarketStats contractAddress={contractAddress} />
      </CollectionHeader>
      {contractAddress && (
        <CollectionFilterProvider
          useSidebarClearButton
          filtersVisible={isLarge ? true : false}
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
            NO_FILTER_RESULTS_COPY: `Sorry no ${data?.name} NFTs are available for purchase on chain.`,
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
