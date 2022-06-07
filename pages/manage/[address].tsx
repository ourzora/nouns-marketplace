import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { useEffect } from 'react'
// import { NFTGrid } from '@media/NFTGrid'
import { manageNftsService, ManageNFTsServiceProps } from 'services/manageNftsService'

/* @ts-ignore */
const Manage: NextPage = ({ initialPage, userAddress }: ManageNFTsServiceProps) => {
  useEffect(() => {
    console.log(initialPage, userAddress)
  }, [initialPage, userAddress])

  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      {/*contractAddress && (
        <NFTGrid contractAddress={[contractAddress]} initialPage={initialPage} />
      )*/}
    </PageWrapper>
  )
}

export const getServerSideProps = manageNftsService

export default Manage
