import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { useEffect } from 'react'
import { NFTGrid } from '@media/NFTGrid'
import { manageNftsService, ManageNFTsServiceProps } from 'services/manageNftsService'
import { collectionAddresses } from 'utils/collection-addresses'

/* @ts-ignore */
const Manage: NextPage = ({ initialPage, ownerAddress }: ManageNFTsServiceProps) => {
  useEffect(() => {
    console.log(initialPage, ownerAddress)
  }, [initialPage, ownerAddress])

  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      {ownerAddress && (
        <NFTGrid
          ownerAddress={ownerAddress}
          initialPage={initialPage}
          contractAddress={collectionAddresses}
        />
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = manageNftsService

export default Manage
