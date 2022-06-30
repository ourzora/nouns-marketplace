import { Flex, Label } from '@zoralabs/zord'
import { Link, PageHeader, PageWrapper, Seo } from 'components'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { COLLECTIONS_INDEX_COPY } from 'constants/copy'

/* @ts-ignore */
const Home = () => {
  return (
    <PageWrapper direction="column" gap="x6">
      <Seo />
      <PageHeader
        headline="The Nouns Marketplace"
        headlineSize="lg"
        copy={COLLECTIONS_INDEX_COPY}
      />
      <Flex w="100%" justify="center">
        <Link href="/collections">
          <Flex
            align="center"
            borderRadius="curved"
            backgroundColor="tertiary"
            m="auto"
            px="x6"
          >
            <Label
              py={{
                '@initial': 'x1',
                '@1024': 'x2',
              }}
              as="span"
              size="lg"
              color="secondary"
            >
              Explore
            </Label>
          </Flex>
        </Link>
      </Flex>
      <CollectionRanking />
    </PageWrapper>
  )
}

export default Home
