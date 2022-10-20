import { ManageHeader, PageWrapper, Seo } from 'components'
import { Collections } from 'compositions'
// apparently 'constants' is reserved in Next.js (?)
import { allAddresses } from 'constants/collection-addresses'
import { ManageNFTsServiceProps, manageNftsService } from 'services'

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
          contractAllowList={allAddresses}
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
