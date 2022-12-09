import { PageHeader, PageWrapper, Seo } from 'components'
import { COLLECTIONS_INDEX_COPY, COLLECTIONS_INDEX_HEADLINE } from 'constants/copy'
import { CollectionParsed } from 'pages'

const Collections = ({}: { fallback: CollectionParsed }) => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Seo title={COLLECTIONS_INDEX_HEADLINE} description={COLLECTIONS_INDEX_COPY} />
      <PageHeader headline={COLLECTIONS_INDEX_HEADLINE} copy={COLLECTIONS_INDEX_COPY} />
    </PageWrapper>
  )
}

export default Collections
