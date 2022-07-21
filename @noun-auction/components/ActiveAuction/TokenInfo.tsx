import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Stack, Flex, Heading, Button, Box } from '@zoralabs/zord'
import { useNFT } from '@zoralabs/nft-hooks'
import { TokenInfoConfig } from './../NounishAuction'
import { CollectionThumbnail, returnThumbnailSize } from '@media/CollectionThumbnail'
import { tokenInfoWrapper } from '@noun-auction/styles/NounishStyles.css'
import { useNounishAuctionProvider } from '@noun-auction/providers'

// @shared (or zord)
import { lightFont } from 'styles/styles.css'

export interface TokenInfoProps extends TokenInfoConfig {
  contractAddress?: string
  tokenId?: string
}

export function TokenInfo({
  contractAddress,
  tokenId,
  thumbnailSize,
  hideThumbnail,
  hideCollectionTitle,
  hideTitle,
  routePrefix,
  ...props
}: TokenInfoProps) {
  const router = useRouter()
  const { auctionData, daoConfig } = useNounishAuctionProvider()
  const { data } = useNFT(contractAddress, tokenId)

  // console.log(auctionData?.rpcData, daoConfig)

  /* Make this router pattern optional / customizeable */
  const contractLinkHandler = useCallback((e) => {
    e.preventDefault()
    router.push(`/${routePrefix}/${contractAddress}`)
  }, [])

  const tokenLinkHandler = useCallback((e) => {
    e.preventDefault()
    router.push(`/${routePrefix}/${contractAddress}/${tokenId}`)
  }, [])

  return (
    <Flex className={['nounish-auction__token-info', tokenInfoWrapper]} {...props}>
      {data && (
        <>
          {!hideThumbnail && (
            <Button
              onClick={tokenLinkHandler}
              variant="unset"
              h={returnThumbnailSize(thumbnailSize)}
              style={{ aspectRatio: '1/1' }}
            >
              <CollectionThumbnail
                collectionAddress={contractAddress}
                tokenId={tokenId}
                size={thumbnailSize}
                h="100%"
                style={{ aspectRatio: '1/1' }}
              />
            </Button>
          )}
          <Stack justify="space-between">
            {!hideTitle && (
              <Heading size="sm" as="h3">
                {data?.metadata?.name
                  ? data?.metadata?.name
                  : `${data?.nft?.contract?.name} ${data?.nft?.tokenId}`}
              </Heading>
            )}
            {!hideCollectionTitle && (
              <Box mb="x1">
                <Button
                  onClick={contractLinkHandler}
                  variant="unset"
                  color="tertiary"
                  className={[lightFont]}
                >
                  {data?.nft?.contract?.name}
                </Button>
              </Box>
            )}
          </Stack>
        </>
      )}
    </Flex>
  )
}
