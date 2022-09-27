import { Heading, Stack, Flex, Button, StackProps } from '@zoralabs/zord'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useNFTProvider, useTitleWithFallback } from '@shared'
import { Link } from 'components'
import { clickAnimation, mediumFont } from 'styles/styles.css'
import { NFTMarket } from './NFTMarket'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useNounishAuctionProvider } from '@noun-auction'
import * as styles from './NFTPage.css'
import { NFTProvenance } from './NFTProvenance'
import { DescriptionWithMaxLines } from '@shared/components/DescriptionWithMaxLines/DescriptionWithMaxLines'

export interface NFTSidebarProps extends StackProps {}

export function NFTSidebar({ className, ...props }: NFTSidebarProps) {
  const router = useRouter()
  const { initialData: nft, tokenId: tokenIdString, contractAddress } = useNFTProvider()
  const { data, primarySalePrice } = useNounishAuctionProvider()

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
            disabled={!hasPreviousNft}
            onClick={handlePrev}
            variant="circle"
          >
            ←
          </Button>
          <Button
            className={[styles.nftNextButton]}
            disabled={!hasNextNft}
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
