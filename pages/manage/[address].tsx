import { PageWrapper } from 'components/PageWrapper'
import { manageNftsService, ManageNFTsServiceProps } from 'services/manageNftsService'
import { collectionAddresses } from 'utils/collection-addresses'
import { ManageHeader } from 'components/ManageHeader'
import { Seo } from 'components/Seo'
import { Collections } from 'compositions/Collections'
import { CollectionFilterProvider } from '@filter'

const Manage = ({ ownerAddress }: ManageNFTsServiceProps) => {
  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Seo title={`Manage | ${ownerAddress}`}></Seo>
      <ManageHeader ownerAddress={ownerAddress} />
      {ownerAddress && (
        <CollectionFilterProvider
          ownerAddress={ownerAddress}
          contractWhiteList={collectionAddresses}
          filtersVisible
          useFilterOwnerCollections
        >
          <Collections />
        </CollectionFilterProvider>
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = manageNftsService

export default Manage
