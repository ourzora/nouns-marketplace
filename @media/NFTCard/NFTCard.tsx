import { useMemo } from 'react'
import { Stack, Box, Flex, Heading, Separator } from '@zoralabs/zord'
import { Link } from 'components/Link'
import { NFTCardMarket } from '@market'
import {
  cardWrapper,
  titleWrapper,
  titleScroll,
  titleHeading,
  cardImageWrapper,
} from '@media/NftMedia.css'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { ImageWithNounFallback } from 'components'
import { useNFTProvider, useTitleWithFallback } from '@shared'

export function NFTCard() {
  const { nft, contractAddress, tokenId } = useNFTProvider()

  const { fallbackTitle } = useTitleWithFallback({
    contractAddress,
    tokenId,
    defaultTitle: nft?.metadata?.name,
  })

  const srcImg = useMemo(
    () =>
      nft?.media?.mimeType === 'image/svg+xml'
        ? nft?.media?.image?.uri
        : nft?.media?.poster?.uri,
    [nft?.media]
  )

  const useTitleScroll = useMemo(() => {
    if (nft?.metadata && nft?.metadata?.name) {
      return nft?.metadata?.name.split('').length > 25
    }
  }, [nft?.metadata])

  if (!nft || !contractAddress || !tokenId) return null

  return (
    <Stack w="100%" position="relative" overflow="hidden" className={cardWrapper}>
      <Link href={`/collections/${contractAddress}/${tokenId}`}>
        <Box w="100%" className={cardImageWrapper} backgroundColor="background2">
          {contractAddress && tokenId && (
            <ImageWithNounFallback
              tokenContract={contractAddress}
              tokenId={tokenId}
              srcImg={srcImg}
            />
          )}
        </Box>
      </Link>
      <Stack gap="x2" mt="x2" px="x4" pb="x4" flex="1">
        <Flex
          className={[titleWrapper, useTitleScroll && titleScroll]}
          style={{
            /* @ts-ignore */
            '--titlePad': titleScroll ? '40px' : '0px',
          }}
        >
          <Heading as="h4" size="sm" className={titleHeading}>
            {fallbackTitle}
          </Heading>
        </Flex>
        <Flex align="center" gap="x2" justify="space-between">
          <Link href={`/collections/${contractAddress}`}>
            <Flex align="center" gap="x2">
              <CollectionThumbnail
                collectionAddress={contractAddress}
                initialNFT={nft}
                radius="round"
                size="xs"
              />
              <Heading size="xs">{nft?.nft?.contract.name}</Heading>
            </Flex>
          </Link>
        </Flex>
        <Separator mt="x1" />
        <NFTCardMarket nftObj={nft} />
      </Stack>
    </Stack>
  )
}
