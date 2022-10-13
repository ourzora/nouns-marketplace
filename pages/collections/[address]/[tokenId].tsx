import { PageWrapper, Seo } from 'components'
import { nftService } from 'services/nftService'
import { NFTObject } from '@zoralabs/nft-hooks'
import { NFTPageHero, NFTSidebar, NFTAttributes, NFTHistory } from 'compositions/NFTPage'
import { Box, Grid, Stack } from '@zoralabs/zord'
import { NFTProvider } from '@shared/providers/NFTProvider'
import { NounishAuctionProvider } from '@noun-auction'
import { returnDao } from 'constants/collection-addresses'
import { useMemo } from 'react'
import * as styles from 'compositions/NFTPage/NFTPage.css'
import { Text, Heading, Paragraph } from 'components/typography/Text'

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
            <Box>
              <Heading size="xl">Heading</Heading>
              <Heading size="lg">Heading</Heading>
              <Heading>Heading</Heading>
              <Heading size="sm">Heading</Heading>
              <Heading size="xs">Heading</Heading>
              <Text>Text</Text>
              <Paragraph>Paragraph</Paragraph>
            </Box>

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
