import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { useEffect } from 'react'
import { MarketStats } from '@market/components/MarketStats'
import { CollectionHeader } from 'components/CollectionHeader'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { Seo } from 'components/Seo'
import { Collections } from 'compositions/Collections'
import { CollectionFilterProvider } from '@filter'

/* @ts-ignore */
const Collection = ({
  initialPage,
  contractAddress,
  seo,
  aggregateStats,
  collection,
}: CollectionServiceProps) => {
  const { setCurrentCollection } = useCollectionsContext()

  useEffect(() => {
    if (collection && collection?.name) setCurrentCollection(collection.name)
    return () => {
      setCurrentCollection('Explore')
    }
  }, [collection])

  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Seo title={seo.title} description={seo.description} />
      <CollectionHeader collection={collection} aggregateStats={aggregateStats} />
      <MarketStats aggregateStats={aggregateStats} />
      {contractAddress && (
        <CollectionFilterProvider
          contractAddress={contractAddress}
          initialPage={initialPage}
          useCollectionProperties={{
            header: 'Traits',
            selector: 'nouns-market-traits',
            hideBorder: true,
          }}
          filtersVisible
          usePriceRange={{
            label: 'Price',
            defaultState: 'open',
            hideBorder: true,
            hideCurrencySelect: true,
          }}
        >
          <Collections />
        </CollectionFilterProvider>
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
