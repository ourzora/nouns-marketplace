import { PageWrapper } from 'components/PageWrapper'
import { collectionService } from 'services/collectionService'
import { Heading } from '@zoralabs/zord'

const Collections = () => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Heading>Collections</Heading>
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collections
