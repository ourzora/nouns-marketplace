import { Stack } from '@zoralabs/zord'
import { PageHeader, PageWrapper, Seo } from 'components'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { DaoTable } from 'compositions/Daos'

/* @ts-ignore */
const Home = () => {
  return (
    <PageWrapper direction="column" gap="x6">
      <Seo />
      <PageHeader headline="The Nouns Marketplace" />
      <Stack px="x4">
        <DaoTable />
        <CollectionRanking />
      </Stack>
    </PageWrapper>
  )
}

export default Home
