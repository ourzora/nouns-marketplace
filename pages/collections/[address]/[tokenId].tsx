import { PageWrapper, Seo } from 'components'
import { NFTAttributes, NFTHistory, NFTPageHero, NFTSidebar } from 'compositions'
import * as styles from 'compositions/NFTPage/NFTPage.css'
import { returnDao } from 'constants/collection-addresses'
import { nftService } from 'services'

import { useMemo } from 'react'

import { NounishAuctionProvider } from '@noun-auction'
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
  const dao = useMemo(() => returnDao(tokenAddress), [tokenAddress])

  return (
    <PageWrapper direction="column">
      <Seo
        title={nft?.metadata?.name}
        description={nft?.metadata?.description}
        ogImage={nft?.media?.poster?.uri}
      />
      <NFTProvider initialData={nft} contractAddress={tokenAddress} tokenId={tokenId}>
        <Grid className={styles.nftPageWrapper}>
          <NFTPageHero />
          {dao ? (
            <NounishAuctionProvider daoConfig={dao} tokenId={tokenId}>
              <NFTSidebar />
            </NounishAuctionProvider>
          ) : (
            <NFTSidebar />
          )}
          <Stack className={styles.attributesHistoryWrapper}>
            <NFTHistory />
            <NFTAttributes />
          </Stack>
        </Grid>
      </NFTProvider>
    </PageWrapper>
  )
}

export const getServerSideProps = nftService

export default NFT
