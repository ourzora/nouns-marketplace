import { ManageHeader, PageWrapper, Seo } from 'components'
import { Collections } from 'compositions'
import { ManageNFTsServiceProps, manageNftsService } from 'services'

import { CollectionFilterProvider } from '@filter'
import { NFTCard, NFTGrid } from '@media'
import { nftGridWrapper } from '@media/NftMedia.css'
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
        // <CollectionFilterProvider
        //   ownerAddress={ownerAddress}
        //   contractAllowList={allAddresses}
        //   // useFilterOwnerCollections
        //   useSidebarFilter={false}
        // >
        // <Collections collectionAddress={collectionAddress} />
        <NFTGrid items={items} className={nftGridWrapper()} />
        // </CollectionFilterProvider>
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = manageNftsService

export default Manage
