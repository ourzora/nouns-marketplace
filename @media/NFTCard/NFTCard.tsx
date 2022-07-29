import { useMemo } from 'react'
import { Stack, Box, Flex, Heading, Separator } from '@zoralabs/zord'
import { Link } from 'components/Link'
import { NFTCardMarket } from '@market'
import { useTitleWithFallback } from 'hooks'
import {
  cardWrapper,
  titleWrapper,
  titleScroll,
  titleHeading,
  cardImageWrapper,
} from '@media/NftMedia.css'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { ImageWithNounFallback } from 'components'
import { useNFTProvider } from '@shared'

export function NFTCard() {
  const {
    hooksData: { data },
    contractAddress,
    tokenId,
  } = useNFTProvider()

  if (!data || !contractAddress || !tokenId) return null

  const { fallbackTitle } = useTitleWithFallback(
    contractAddress,
    tokenId,
    data?.metadata?.name
  )

  const srcImg = useMemo(() => {
    if (data?.media?.mimeType === 'image/svg+xml') {
      return data?.media?.image?.uri
    } else {
      return data?.media?.poster?.uri
    }
  }, [data?.media])

  const useTitleScroll = useMemo(() => {
    if (data?.metadata && data?.metadata?.name) {
      return data?.metadata?.name.split('').length > 25
    }
  }, [data?.metadata])

  return (
    <Stack w="100%" position="relative" overflow="hidden" className={cardWrapper}>
      <Link href={`/collections/${contractAddress}/${tokenId}`}>
        <Box w="100%" className={cardImageWrapper} backgroundColor="tertiary">
          <ImageWithNounFallback
            tokenContract={contractAddress}
            tokenId={tokenId}
            srcImg={srcImg}
          />
        </Box>
      </Link>
      <Stack gap="x2" mt="x2" px="x4" pb="x4">
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
                radius="round"
                size="xs"
              />
              <Heading size="xs">{data?.nft?.contract.name}</Heading>
            </Flex>
          </Link>
        </Flex>
        <Separator mt="x1" />
        <NFTCardMarket nftData={data} />
      </Stack>
    </Stack>
  )
}
