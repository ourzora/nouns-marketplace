import type { NextPage } from 'next'
import { RawDisplayer } from 'components/utils'
import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { Heading, Paragraph } from '@zoralabs/zord'

const Collections: NextPage = () => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Heading>Collections</Heading>
      <Paragraph>Map over collections</Paragraph>
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collections
