import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { CollectionHeader, Seo } from 'components'
import { CollectionFilterProvider } from '@filter'
import { useCollection } from '@filter/hooks/useCollection'
import { RawDisplayer, CollectionsTest } from 'components/utils'
import { Accordion, Separator, Stack } from '@zoralabs/zord'
import { useNounAuction } from '@noun-auction'

const Collection = ({
  initialPage,
  contractAddress,
  seo,
  aggregateStats,
  collection,
}: CollectionServiceProps) => {
  const { data } = useCollection(contractAddress)

  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Seo title={seo.title} description={seo.description} />
      <CollectionHeader collection={collection} aggregateStats={aggregateStats} />
      {data ? (
        <Stack pb="x2">
          <Accordion label="Collection Data">
            <RawDisplayer data={data} />
          </Accordion>
          <Separator mt="x2" />
        </Stack>
      ) : (
        <div>Loading...</div>
      )}
      {contractAddress && (
        <CollectionFilterProvider
          contractAddress={contractAddress}
          initialPage={initialPage}
          useSidebarFilter={false}
        >
          <CollectionsTest collectionAddress={contractAddress} />
        </CollectionFilterProvider>
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
