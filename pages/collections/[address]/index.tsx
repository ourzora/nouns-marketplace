import type { NextPage } from 'next'
import { RawDisplayer } from 'components/utils'
import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { Heading } from '@zoralabs/zord/elements'

/* @ts-ignore */
const Collection: NextPage = ({
  initialPage,
  contractAddress,
  seo,
  aggregateStats,
  collection
}: CollectionServiceProps) => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Heading as="h1">{collection.name}</Heading>
      <Heading>Collection Data</Heading>
      <RawDisplayer data={contractAddress} />
      <RawDisplayer data={collection} />
      <RawDisplayer data={seo} />
      <RawDisplayer data={aggregateStats} />
      <RawDisplayer data={initialPage} />
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
