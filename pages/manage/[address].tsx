import { ManageHeader, PageWrapper, Seo } from 'components'
import { ManageNFTsServiceProps, manageNftsService } from 'services'

import { useTokensByAddress } from 'hooks/useTokensByAddress'

import { NFTGrid2 } from '@media/NFTGrid2'
import { nftGridWrapper } from '@media/NftMedia.css'
import { Separator } from '@zoralabs/zord'

const Manage = ({ ownerAddress }: ManageNFTsServiceProps) => {
  const { tokensByAddress } = useTokensByAddress({ ownerAddress })
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
      <NFTGrid2 items={tokensByAddress} className={nftGridWrapper()} isOwner={true} />
    </PageWrapper>
  )
}

export const getServerSideProps = manageNftsService

export default Manage
