import { PageWrapper } from 'components/PageWrapper'
import { Heading } from '@zoralabs/zord'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { PageHeader } from 'components/PageHeader'

const Collections = () => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <PageHeader
        headline="Ranking"
        copy="Nouns are an experimental attempt to improve the formation of on-chain avatar communities. While projects such as Cryptopunks have attempted to bootstrap digital community and identity."
      />
      <CollectionRanking />
    </PageWrapper>
  )
}

export default Collections
