import { PageWrapper } from 'components/PageWrapper'
import { COLLECTIONS_INDEX_HEADLINE, COLLECTIONS_INDEX_COPY } from 'constants/copy'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { PageHeader } from 'components/PageHeader'
import { Seo } from 'components/Seo'

const Collections = () => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <CollectionRanking />
    </PageWrapper>
  )
}

export default Collections
