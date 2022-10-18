import { PageWrapper, Seo } from 'components'
import { nftService } from 'services/nftService'
import { NFTObject } from '@zoralabs/nft-hooks'
import { NFTPageHero, NFTSidebar, NFTAttributes, NFTHistory } from 'compositions/NFTPage'
import { Button, Grid, Stack } from '@zoralabs/zord'
import { NFTProvider } from '@shared/providers/NFTProvider'
import { NounishAuctionProvider } from '@noun-auction'
import { returnDao } from 'constants/collection-addresses'
import { useCallback, useMemo, useState } from 'react'
import * as styles from 'compositions/NFTPage/NFTPage.css'

// const NEXT_PUBLIC_REFRESH_METADATA_URL_ROOT = 'http://api.zora.co/refresh-nft-metadata'
const REFRESH_METADATA_URL_ROOT = 'https://api.zora.co/refresh-nft-metadata'
// const REFRESH_METADATA_URL_ROOT = 'http://api.zora.co'

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
  // headers: {
  //   'Content-Type': 'application/json',
  //   'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
  // },
  const [isUpdatingToken, setIsUpdatingToken] = useState<boolean>(false)
  const [isUpdatingContract, setIsUpdatingContract] = useState<boolean>(false)
  const handleUpdateTokenMetadata = useCallback(async () => {
    setIsUpdatingToken(true)
    try {
      console.log('TRYING')

      const rawResponse = await fetch(
        // `${REFRESH_METADATA_URL_ROOT}/queueMetadataRefreshForToken`,
        `${REFRESH_METADATA_URL_ROOT}/${tokenAddress}/${tokenId}`,
        {
          method: 'POST',
          /* @ts-ignore */
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
          },
          // body: JSON.stringify({
          //   nftContractAddress: tokenAddress,
          //   tokenId: tokenId,
          // }),
        }
      )
      const content = await rawResponse.json()

      console.log('CONTENT', content)

      // const response = await fetch(
      //   `${REFRESH_METADATA_URL_ROOT}/${tokenAddress}/${tokenId}`,
      //   {
      //     method: 'POST',
      //     payload:
      //   }
      // )

      // if (!response.ok) {
      //   throw new Error(`Error! status: ${response.status}`)
      // }
    } catch (err: any) {
      console.log('CATCHING')
      console.error(err.message)
    } finally {
      setIsUpdatingToken(false)
    }
  }, [tokenAddress, tokenId])
  const handleUpdateContractMetadata = useCallback(async () => {
    setIsUpdatingContract(true)
    try {
      console.log('TRYING')

      const rawResponse = await fetch(
        // `${REFRESH_METADATA_URL_ROOT}/queueMetadataRefreshForContractAddress`,
        `${REFRESH_METADATA_URL_ROOT}/${tokenAddress}`,
        {
          method: 'POST',
          /* @ts-ignore */
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
          },
          // body: JSON.stringify({
          //   nftContractAddress: tokenAddress,
          // }),
        }
      )
      const content = await rawResponse.json()

      console.log('CONTENT', content)

      // const response = await fetch(
      //   `${REFRESH_METADATA_URL_ROOT}/${tokenAddress}/${tokenId}`,
      //   {
      //     method: 'POST',
      //     payload:
      //   }
      // )

      // if (!response.ok) {
      //   throw new Error(`Error! status: ${response.status}`)
      // }
    } catch (err: any) {
      console.log('CATCHING')
      console.error(err.message)
    } finally {
      setIsUpdatingContract(false)
    }
  }, [tokenAddress])
  console.log(nft)
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
            <Button onClick={handleUpdateTokenMetadata} loading={isUpdatingToken}>
              REFRESH TOKEN
            </Button>
            <Button onClick={handleUpdateContractMetadata} loading={isUpdatingContract}>
              REFRESH CONTRACT
            </Button>

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
