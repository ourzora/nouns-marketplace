import { PageWrapper, Seo } from 'components'
import { NFTAttributes, NFTPageHero, NFTSidebar } from 'compositions'
import * as styles from 'compositions/NFTPage/NFTPage.css'
import { nftService } from 'services'

import { NFTProvider } from '@shared/providers/NFTProvider'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Grid, Stack } from '@zoralabs/zord'

const NFT = ({
  nft,
  tokenAddress,
  tokenId,
}: {
  nft: NFTObject | undefined
  tokenAddress: string
  tokenId: string
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
          <NFTSidebar collectionAddress={tokenAddress} tokenId={tokenId} />
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
