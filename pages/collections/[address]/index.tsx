import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { useEffect } from 'react'
import { NFTGrid } from '@media/NFTGrid'
import { MarketStats } from 'components/MarketStats'
import { CollectionHeader } from 'components/CollectionHeader'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { useCollections } from 'hooks/zdk/useCollections'

/* @ts-ignore */
const Collection: NextPage = ({
  initialPage,
  contractAddress,
  seo,
  aggregateStats,
  collection,
}: CollectionServiceProps) => {
  const { setCurrentCollection } = useCollectionsContext()
  const { collections } = useCollections()
  useEffect(() => {
    console.log(collection?.name)
    if (collection && collection?.name) setCurrentCollection(collection.name)
  }, [collections])

  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <CollectionHeader collection={collection} />
      <MarketStats aggregateStats={aggregateStats} />
      <NFTGrid contractAddress={[contractAddress]} initialPage={initialPage} />
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
