import { PageWrapper } from 'components/PageWrapper'
import { COLLECTIONS_INDEX_HEADLINE, COLLECTIONS_INDEX_COPY } from 'constants/copy'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { PageHeader } from 'components/PageHeader'
import { Seo } from 'components/Seo'
import { CollectionParsed } from 'pages'
import { collectionsService } from 'services/collectionsService'
import useSWR from 'swr'

const Collections = ({ fallback }: { fallback: CollectionParsed }) => {
  const { data } = useSWR('collections', collectionsService)
  const collections = data?.props?.fallback || fallback

  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Seo title={COLLECTIONS_INDEX_HEADLINE} description={COLLECTIONS_INDEX_COPY} />
      <PageHeader headline={COLLECTIONS_INDEX_HEADLINE} copy={COLLECTIONS_INDEX_COPY} />
      <CollectionRanking collections={collections} />
    </PageWrapper>
  )
}

export const getServerSideProps = collectionsService

export default Collections
