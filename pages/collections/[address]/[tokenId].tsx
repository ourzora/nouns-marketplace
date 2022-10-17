import { PageWrapper, Seo } from 'components'
import { nftService } from 'services/nftService'
import { NFTObject } from '@zoralabs/nft-hooks'
import { NFTPageHero, NFTSidebar, NFTAttributes, NFTHistory } from 'compositions/NFTPage'
import { Box, Grid, Stack } from '@zoralabs/zord'
import { NFTProvider } from '@shared/providers/NFTProvider'
import { NounishAuctionProvider } from '@noun-auction'
import { returnDao } from 'constants/collection-addresses'
import { useMemo, useRef } from 'react'
import * as styles from 'compositions/NFTPage/NFTPage.css'
import { Text, Heading, Paragraph, Span } from 'components/typography/Text'

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
  const testRef = useRef(null)

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
              <Heading as="h1" ref={testRef} size="xl">
                Heading XL
              </Heading>
              <Heading as="h2" size="lg">
                Heading LG
              </Heading>
              <Heading as="h3">Heading (default)</Heading>
              <Heading as="h4" size="md">
                Heading MD
              </Heading>
              <Heading as="h5" size="sm">
                Heading SM
              </Heading>
              <Heading as="h6" size="xs">
                Heading XS
              </Heading>
              <Text>Text</Text>
              <Paragraph>Paragraph</Paragraph>
              <Paragraph size="sm" color="text2">
                Paragraph SM
              </Paragraph>
              <Span color="text2">Span</Span>
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
