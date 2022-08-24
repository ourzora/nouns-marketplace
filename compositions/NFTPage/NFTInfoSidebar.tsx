import { Heading, Stack, Flex, Paragraph, Box, BoxProps, Button } from '@zoralabs/zord'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { FillV3AskInfo } from '@market'
import { useNFTProvider, useIsOwner, useTitleWithFallback } from '@shared'
import { Link } from 'components'
import { clickAnimation } from 'styles/styles.css'
import {
  nftInfoSidebar,
  nftInfoSidebarWrapper,
  askInfoWrapper,
  nftNextButton,
} from './NFTPage.css'
import {} from './NFTPage.css'
import { MarketUi } from './MarketUi'
import { useNounishAuctionProvider } from '@noun-auction'

import { lightFont } from '@shared'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface NFTInfoSidebar extends BoxProps {}

export function NFTInfoSidebar({ ...props }: NFTInfoSidebar) {
  const router = useRouter()
  const { initialData: nft, tokenId, contractAddress } = useNFTProvider()
  const { isOwner } = useIsOwner(nft!)
  const { isComplete, activeAuctionId } = useNounishAuctionProvider()

  const hasNextNft = useMemo(() => {
    return tokenId && activeAuctionId
      ? !!(parseInt(tokenId) < parseInt(activeAuctionId))
      : false
  }, [activeAuctionId, tokenId])

  const hasPrevoiusNft = useMemo(() => {
    return tokenId && parseInt(tokenId) >= 0
  }, [tokenId])

  const handleNext = useCallback(() => {
    if (hasNextNft) {
      tokenId && router.push(`/collections/${contractAddress}/${parseInt(tokenId) + 1}`)
    }
  }, [hasNextNft, tokenId, router, contractAddress])

  const handlePrev = useCallback(() => {
    tokenId && router.push(`/collections/${contractAddress}/${parseInt(tokenId) - 1}`)
  }, [contractAddress, tokenId, router])

  const { fallbackTitle } = useTitleWithFallback({
    contractAddress,
    tokenId,
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
              disabled={hasPrevoiusNft}
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
        {!isOwner && isComplete && (
          <Stack className={askInfoWrapper}>
            <FillV3AskInfo showBalance={false} nft={nft} />
          </Stack>
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
