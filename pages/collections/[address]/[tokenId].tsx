import { PageWrapper, Seo } from 'components'
import { nftService } from 'services/nftService'
import { NFTObject } from '@zoralabs/nft-hooks'
import { NFTPageHero, NFTInfoSidebar, NFTAttributes } from 'compositions/NFTPage'
import { Grid } from '@zoralabs/zord'
import { nftPageWrapper } from 'compositions/NFTPage/NFTPage.css'
import { NFTProvider } from '@media/providers/NFTPovider'
import { useEffect } from 'react'

const NFT = ({ nft }: { nft: NFTObject }) => {
  useEffect(() => console.log(nft), [])

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
          <NFTInfoSidebar />
          <NFTAttributes />
        </Grid>
      </NFTProvider>
    </PageWrapper>
  )
}

export const getServerSideProps = nftService

export default NFT
