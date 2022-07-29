import { Flex, Label, Stack } from '@zoralabs/zord'
import { Link, PageHeader, PageWrapper, Seo } from 'components'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { DaoTable } from 'compositions/Daos'
import { COLLECTIONS_INDEX_COPY } from 'constants/copy'

/* @ts-ignore */
const Home = () => {
  return (
    <PageWrapper direction="column" gap="x6">
      <Seo />
      <PageHeader
        headline="The Nouns Marketplace"
        copy={COLLECTIONS_INDEX_COPY}
        px="x4"
        gap="x4"
      />
      <Stack px="x4">
        <DaoTable />
        <CollectionRanking />
      </Stack>
    </PageWrapper>
  )
}

export default Home
