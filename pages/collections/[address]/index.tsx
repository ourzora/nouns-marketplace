import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { useEffect } from 'react'
import { MarketStats } from '@market/components/MarketStats'
import { CollectionHeader, Seo } from 'components'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { Collections, CollectionActivityHeader } from 'compositions/Collections'
import { CollectionFilterProvider } from '@filter'
import { Stack } from '@zoralabs/zord'
import { useCollection } from '@filter/hooks/useCollection'

const Collection = ({
  initialPage,
  contractAddress,
  seo,
  aggregateStats,
  collection,
}: CollectionServiceProps) => {
  const { setCurrentCollection, setCurrentCollectionCount } = useCollectionsContext()

  useEffect(() => {
    if (collection && collection?.name) {
      setCurrentCollection(collection.name)
      setCurrentCollectionCount(`${aggregateStats.aggregateStat.nftCount} NFTs`)
    }
    return () => {
      setCurrentCollection('Explore Collections...')
      setCurrentCollectionCount(undefined)
    }
  }, [aggregateStats, collection, setCurrentCollection, setCurrentCollectionCount])

  const { data } = useCollection(contractAddress)

  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Seo title={seo.title} description={seo.description} />
      <CollectionHeader collection={collection} aggregateStats={aggregateStats} />
      <MarketStats aggregateStats={aggregateStats} />
      {contractAddress && (
        <CollectionFilterProvider
          useSidebarClearButton
          contractAddress={contractAddress}
          initialPage={initialPage}
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
            <CollectionActivityHeader />
            <Collections collectionAddress={contractAddress} />
          </Stack>
        </CollectionFilterProvider>
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
