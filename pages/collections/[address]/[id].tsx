import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { Heading } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import { useNFT } from '@zoralabs/nft-hooks'
import { RawDisplayer } from 'components/utils'

const NFT: NextPage = () => {
  const { query } = useRouter()
  console.log(query)

  const { data } = useNFT(
    /* @ts-ignore */
    query.address,
    query.id
  )

  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Heading>{data?.metadata?.name}</Heading>
      <Heading>Last Refresh Time</Heading>
      <RawDisplayer data={data?.rawData?.APIIndexer?.lastRefreshTime} />
      <Heading>Markets</Heading>
      <RawDisplayer data={data?.markets} />
    </PageWrapper>
  )
}

export default NFT
