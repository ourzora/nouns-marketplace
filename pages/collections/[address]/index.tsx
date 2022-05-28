import type { NextPage } from 'next'
import { RawDisplayer } from 'components/utils'
import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { Heading } from '@zoralabs/zord/elements'
import { NFTGrid } from '@media/NFTGrid'
import { MarketStats } from 'components/MarketStats'
import { CollectionHeader } from 'components/CollectionHeader'

/* @ts-ignore */
const Collection: NextPage = ({
  initialPage,
  contractAddress,
  seo,
  aggregateStats,
  collection,
}: CollectionServiceProps) => {
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
