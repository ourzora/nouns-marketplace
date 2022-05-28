import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { Seo } from 'components/Seo'
import { NFTGrid } from '@media/NFTGrid'

import { collections } from 'collections'

/* @ts-ignore */
const Home: NextPage = ({
  initialPage,
  contractAddress,
  seo,
  aggregateStats,
  collection,
}: CollectionServiceProps) => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Seo
        title={seo.title}
        description={seo.description}
        url={seo.url}
        twitterImageUrl={seo.twitterImageUrl}
      />
      <NFTGrid contractAddress={collections} initialPage={initialPage} />
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Home
