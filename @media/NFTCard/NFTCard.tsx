import { useMemo } from 'react'
import { Stack, Box, Flex, Heading, Separator } from '@zoralabs/zord'
import { Link } from 'components/Link'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCardMarket } from '@market'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import {
  cardWrapper,
  titleWrapper,
  titleScroll,
  titleHeading,
  cardImageWrapper,
} from '@media/NftMedia.css'
import { CollectionThumbnail } from '@media/CollectionThumbnail'

export function NFTCard({ nftData }: { nftData: NFTObject }) {
  const { metadata, media, nft } = nftData
  const { image } = useRawImageTransform(media?.thumbnail?.uri)

  const srcImg = useMemo(() => {
    if (media?.mimeType === 'image/svg+xml') {
      return media?.image?.uri
    } else {
      return media?.poster?.uri
    }
  }, [image, media])

  const useTitleScroll = useMemo(() => {
    if (metadata && metadata?.name) {
      return metadata?.name.split('').length > 25
    }
  }, [metadata])

  if (!nft) {
    return null
  }

  return (
    <Stack w="100%" position="relative" overflow="hidden" className={cardWrapper}>
      <Link href={`/collections/${nft?.contract.address}/${nft?.tokenId}`}>
        <Box w="100%" className={cardImageWrapper} backgroundColor="tertiary">
          <Box
            as="img"
            src={srcImg}
            w="100%"
            h="100%"
            position="absolute"
            inset="x0"
            objectFit="cover"
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
            {metadata?.name}
          </Heading>
        </Flex>
        <Flex align="center" gap="x2" justify="space-between">
          <Link href={`/collections/${nft?.contract.address}`}>
            <Flex align="center" gap="x2">
              <CollectionThumbnail
                collectionAddress={nft?.contract.address}
                radius="round"
                size="xs"
              />
              <Heading size="xs">{nft?.contract.name}</Heading>
            </Flex>
          </Link>
        </Flex>
        <Separator mt="x1" />
        <NFTCardMarket nftData={nftData} />
      </Stack>
    </Stack>
  )
}
