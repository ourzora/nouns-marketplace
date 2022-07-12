import { PageWrapper } from 'components/PageWrapper'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { DaoTable } from 'compositions/Daos'

const Collections = () => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <DaoTable />
      <CollectionRanking />
    </PageWrapper>
  )
}

export default Collections
