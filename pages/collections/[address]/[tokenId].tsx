import { PageWrapper, Seo } from 'components'
import { NFTAttributes, NFTPageHero, NFTSidebar } from 'compositions'
import * as styles from 'compositions/NFTPage/NFTPage.css'
import { nftService } from 'services'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { NFTProvider } from '@shared/providers/NFTProvider'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Grid, Stack } from '@zord'

const NFT = ({
  nft,
  tokenAddress,
  tokenId,
  offchainOrders,
}: {
  nft: NFTObject
  tokenAddress: string
  tokenId: string
  offchainOrders: OffchainOrderWithToken[]
}) => {
  return (
    <PageWrapper direction="column">
      <Seo
        title={nft?.metadata?.name}
        description={nft?.metadata?.description}
        ogImage={nft?.media?.poster?.uri}
      />
      <NFTProvider initialData={nft} contractAddress={tokenAddress} tokenId={tokenId}>
        <Grid className={styles.nftPageWrapper}>
          <NFTPageHero collectionAddress={tokenAddress} tokenId={tokenId} />
          <NFTSidebar
            collectionAddress={tokenAddress}
            tokenId={tokenId}
            offchainOrders={offchainOrders}
          />
          <Stack className={styles.attributesHistoryWrapper}>
            {/* <NFTHistory collectionAddress={tokenAddress} tokenId={tokenId} /> */}
            <NFTAttributes />
          </Stack>
        </Grid>
      </NFTProvider>
    </PageWrapper>
  )
}

export const getServerSideProps = nftService

export default NFT
