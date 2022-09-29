import { Heading, Stack, Flex, Paragraph, Box, BoxProps, Button } from '@zoralabs/zord'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useNFTProvider, useTitleWithFallback } from '@shared'
import { Link } from 'components'
import { clickAnimation } from 'styles/styles.css'
import { nftInfoSidebarWrapper, nftNextButton, nftInfoSidebar } from './NFTPage.css'
import { MarketUi } from './MarketUi'

import { lightFont } from '@shared'
import { useTokenHelper } from '@shared/hooks'

export interface NFTInfoSidebar extends BoxProps {}

export function NFTInfoSidebar({ ...props }: NFTInfoSidebar) {
  const { initialData: nft, tokenId: tokenIdString, contractAddress } = useNFTProvider()
  const { tokenID, hasPreviousNFT, hasNextNFT, handlePrev, handleNext } = useTokenHelper(
    nft!
  )

  const { fallbackTitle } = useTitleWithFallback({
    contractAddress,
    tokenId: tokenIdString,
    defaultTitle: nft?.metadata?.name,
  })

  if (!nft || !tokenID || !contractAddress) return null

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
              disabled={!hasPreviousNFT}
              onClick={handlePrev}
              variant="circle"
            >
              ←
            </Button>
            <Button
              className={[nftNextButton]}
              disabled={!hasNextNFT}
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
