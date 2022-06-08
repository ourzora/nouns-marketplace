import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { useEffect } from 'react'
import { NFTGrid } from '@media/NFTGrid'
import { manageNftsService, ManageNFTsServiceProps } from 'services/manageNftsService'
import { collectionAddresses } from 'utils/collection-addresses'
import { ManageHeader } from 'components/ManageHeader'

/* @ts-ignore */
const Manage: NextPage = ({ initialPage, ownerAddress }: ManageNFTsServiceProps) => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <ManageHeader ownerAddress={ownerAddress} />
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
