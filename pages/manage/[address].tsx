import { PageWrapper } from 'components/PageWrapper'
import { manageNftsService, ManageNFTsServiceProps } from 'services/manageNftsService'
import { allAddresses } from 'constants/collection-addresses'
import { ManageHeader } from 'components/ManageHeader'
import { Seo } from 'components/Seo'
import { Collections } from 'compositions/Collections'
import { CollectionFilterProvider } from '@filter'
import { Separator } from '@zoralabs/zord'

const Manage = ({ ownerAddress }: ManageNFTsServiceProps) => {
  return (
    <PageWrapper direction="column" gap="x4">
      <Seo title={`Manage | ${ownerAddress}`}></Seo>
      <ManageHeader ownerAddress={ownerAddress} />
      <Separator
        mt={{
          '@initial': 'x4',
          '@1024': 'x12',
        }}
        mb={{
          '@initial': 'x0',
          '@1024': 'x2',
        }}
      />
      {ownerAddress && (
        <CollectionFilterProvider
          ownerAddress={ownerAddress}
          contractWhiteList={allAddresses}
          // useFilterOwnerCollections
          useSidebarFilter={false}
        >
          <Collections />
        </CollectionFilterProvider>
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = manageNftsService

export default Manage
