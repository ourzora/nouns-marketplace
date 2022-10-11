import { PageWrapper } from 'components/PageWrapper'
import { COLLECTIONS_INDEX_HEADLINE, COLLECTIONS_INDEX_COPY } from 'constants/copy'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { PageHeader } from 'components/PageHeader'
import { Seo } from 'components/Seo'
import { zdk } from '@shared'
import { collectionAddresses } from 'constants/collection-addresses'
import { CollectionSortKey, SortDirection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { CollectionParsed } from 'pages'

const Collections = (props: { collections: CollectionParsed }) => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Seo title={COLLECTIONS_INDEX_HEADLINE} description={COLLECTIONS_INDEX_COPY} />
      <PageHeader headline={COLLECTIONS_INDEX_HEADLINE} copy={COLLECTIONS_INDEX_COPY} />
      <CollectionRanking collections={props.collections} />
    </PageWrapper>
  )
}

export async function getStaticProps() {
  const data = await zdk.collections({
    where: { collectionAddresses: collectionAddresses },
    sort: { sortDirection: SortDirection.Asc, sortKey: CollectionSortKey.None },
  })

  const collections = data.collections

  return {
    props: {
      collections: collections.nodes,
    },
  }
}

export default Collections
