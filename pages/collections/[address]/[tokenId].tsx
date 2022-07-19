import { PageWrapper, Seo } from 'components'
import { nftService } from 'services/nftService'
import { NFTObject } from '@zoralabs/nft-hooks'
import {
  NFTPageHero,
  NFTInfoSidebar,
  NFTAttributes,
  NFTHistory,
} from 'compositions/NFTPage'
import { Grid, Stack } from '@zoralabs/zord'
import {
  attributesHistoryWrapper,
  nftPageWrapper,
} from 'compositions/NFTPage/NFTPage.css'
import { NFTProvider } from '@shared/providers/NFTProvider'
import { NounishAuctionProvider } from '@noun-auction'
import { returnDao } from 'constants/collection-addresses'

const NFT = ({ nft }: { nft: NFTObject }) => {
  const dao = returnDao(nft?.nft?.contract?.address)

  return (
    <PageWrapper direction="column">
      <Seo
        title={nft?.metadata?.name}
        description={nft?.metadata?.description}
        ogImage={nft?.media?.poster?.uri}
      />
      <NFTProvider
        initialData={nft}
        contractAddress={nft?.nft?.contract?.address}
        tokenId={nft?.nft?.tokenId}
      >
        <Grid className={nftPageWrapper}>
          <NFTPageHero />
          {dao ? (
            <NounishAuctionProvider daoConfig={dao} tokenId={nft?.nft?.tokenId}>
              <NFTInfoSidebar />
            </NounishAuctionProvider>
          ) : (
            <NFTInfoSidebar />
          )}
          <Stack className={attributesHistoryWrapper}>
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
