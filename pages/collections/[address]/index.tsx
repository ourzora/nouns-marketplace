import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { useEffect } from 'react'
import { NFTGrid } from '@media/NFTGrid'
import { MarketStats } from '@market/components/MarketStats'
import { CollectionHeader } from 'components/CollectionHeader'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { Seo } from 'components/Seo'

/* @ts-ignore */
const Collection: NextPage = ({
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
        <NFTGrid contractAddress={[contractAddress]} initialPage={initialPage} />
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
