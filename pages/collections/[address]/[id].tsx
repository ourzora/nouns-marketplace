import type { NextPage } from 'next'
import { RawDisplayer } from 'components/utils'
import { PageWrapper } from 'components/PageWrapper'
import { Heading } from '@zoralabs/zord'

const NFT: NextPage = () => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Heading>NFT</Heading>
    </PageWrapper>
  )
}

export default NFT
