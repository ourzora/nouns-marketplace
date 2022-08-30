import { Heading, Stack, Flex, Paragraph, Box, BoxProps, Button } from '@zoralabs/zord'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useNFTProvider, useTitleWithFallback } from '@shared'
import { Link } from 'components'
import { clickAnimation } from 'styles/styles.css'
import { nftInfoSidebarWrapper, nftNextButton, nftInfoSidebar } from './NFTPage.css'
import { MarketUi } from './MarketUi'

import { lightFont } from '@shared'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useNounishAuctionProvider } from '@noun-auction'

export interface NFTInfoSidebar extends BoxProps {}

export function NFTInfoSidebar({ ...props }: NFTInfoSidebar) {
  const router = useRouter()
  const { initialData: nft, tokenId: tokenIdString, contractAddress } = useNFTProvider()
  const { data } = useNounishAuctionProvider()

  const tokenId = useMemo(
    () => (tokenIdString ? parseInt(tokenIdString) : undefined),
    [tokenIdString]
  )

  const tokenWithIdOfZeroExists = useMemo(
    () => data?.hasTokenWithIdOfZero?.token?.tokenId === '0',
    [data]
  )

  const hasNextNft = useMemo(() => {
    // !0 === true
    if (tokenId === undefined) return false
    const lastTokenId = data?.numberOfTokens.nftCount - (tokenWithIdOfZeroExists ? 1 : 0)
    return lastTokenId > tokenId
  }, [data?.numberOfTokens, tokenId, tokenWithIdOfZeroExists])

  const hasPreviousNft = useMemo(() => {
    // !0 === true
    if (tokenId === undefined) return false

    return tokenWithIdOfZeroExists ? tokenId > 0 : tokenId > 1
  }, [tokenId, tokenWithIdOfZeroExists])

  const handleNext = useCallback(() => {
    if (hasNextNft) {
      tokenId && router.push(`/collections/${contractAddress}/${tokenId + 1}`)
    }
  }, [hasNextNft, tokenId, router, contractAddress])

  const handlePrev = useCallback(() => {
    tokenId && router.push(`/collections/${contractAddress}/${tokenId - 1}`)
  }, [contractAddress, tokenId, router])

  const { fallbackTitle } = useTitleWithFallback({
    contractAddress,
    tokenId: tokenIdString,
    defaultTitle: nft?.metadata?.name,
  })

  if (!nft || !tokenId || !contractAddress) return null

  return (
    <Box id="nft-info-sidebar" className={nftInfoSidebar} {...props}>
      <Stack className={nftInfoSidebarWrapper}>
        <Flex>
          <Link href={`/collections/${nft?.nft?.contract.address}`}>
            <CollectionThumbnail
              collectionAddress={nft?.nft?.contract.address}
              useTitle
              size="xxs"
              radius="round"
              p="x2"
              pr="x5"
              backgroundColor="tertiary"
              borderRadius="round"
              className={clickAnimation}
            />
          </Link>
        </Flex>
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="xl">
            {fallbackTitle}
          </Heading>
          <Flex w="x20">
            <Button
              className={[nftNextButton]}
              disabled={!hasPreviousNft}
              onClick={handlePrev}
              variant="circle"
            >
              ←
            </Button>
            <Button
              className={[nftNextButton]}
              disabled={!hasNextNft}
              onClick={handleNext}
              variant="circle"
            >
              →
            </Button>
          </Flex>
        </Flex>
        {nft?.metadata?.description && (
          <Paragraph size="lg" className={lightFont}>
            {nft?.metadata?.description}
          </Paragraph>
        )}
        {nft?.nft && (
          <MarketUi
            contractAddress={nft.nft.contract.address}
            tokenId={nft.nft.tokenId}
            nft={nft}
          />
        )}
      </Stack>
    </Box>
  )
}
