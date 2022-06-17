import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { NFTGrid } from '@media/NFTGrid'
import { manageNftsService, ManageNFTsServiceProps } from 'services/manageNftsService'
import { collectionAddresses } from 'utils/collection-addresses'
import { ManageHeader } from 'components/ManageHeader'
import { Seo } from 'components/Seo'
import { Collections } from 'compositions/Collections'

/* @ts-ignore */
const Manage: NextPage = ({ initialPage, ownerAddress }: ManageNFTsServiceProps) => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Seo title={`Manage | ${ownerAddress}`}></Seo>
      <ManageHeader ownerAddress={ownerAddress} />
      {ownerAddress && (
        <Collections ownerAddress={ownerAddress} initialPage={initialPage} />
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = manageNftsService

export default Manage
