import { Heading, Stack, Flex, Button, StackProps } from '@zoralabs/zord'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useNFTProvider, useTitleWithFallback } from '@shared'
import { Link } from 'components'
import { clickAnimation, mediumFont } from 'styles/styles.css'
import { NFTMarket } from './NFTMarket'
import { useNounishAuctionProvider } from '@noun-auction'
import * as styles from './NFTPage.css'
import { NFTProvenance } from './NFTProvenance'
import { DescriptionWithMaxLines } from '@shared/components/DescriptionWithMaxLines/DescriptionWithMaxLines'
import { useTokenHelper } from '@shared/hooks'

export interface NFTSidebarProps extends StackProps {}

export function NFTSidebar({ className, ...props }: NFTSidebarProps) {
  const { primarySalePrice } = useNounishAuctionProvider()
  const { nft, tokenId: tokenIdString, contractAddress } = useNFTProvider()
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
    <Stack
      id="nft-info-sidebar"
      className={[styles.nftInfoSidebar, className]}
      {...props}
    >
      <Flex>
        <Link href={`/collections/${nft?.nft?.contract.address}`}>
          <CollectionThumbnail
            initialNFT={nft}
            collectionAddress={nft?.nft?.contract.address}
            useTitle
            size="xxs"
            radius="round"
            p="x2"
            pr="x5"
            backgroundColor="background2"
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
            className={[styles.nftNextButton]}
            disabled={!hasPreviousNFT}
            onClick={handlePrev}
            variant="circle"
          >
            ←
          </Button>
          <Button
            className={[styles.nftNextButton]}
            disabled={!hasNextNFT}
            onClick={handleNext}
            variant="circle"
          >
            →
          </Button>
        </Flex>
      </Flex>
      {nft?.metadata?.description && (
        <DescriptionWithMaxLines
          baseLineheight={30}
          maxLines={2}
          paragraphClassName={mediumFont}
          overflowY="hidden"
        >
          {nft?.metadata?.description}
        </DescriptionWithMaxLines>
      )}
      {nft?.nft && ( // Clamp to bottom of container
        <Stack gap="x4" mt="auto">
          {primarySalePrice && <NFTProvenance nft={nft} />}
          <NFTMarket
            contractAddress={nft.nft.contract.address}
            tokenId={nft.nft.tokenId}
            nft={nft}
          />
        </Stack>
      )}
    </Stack>
  )
}
