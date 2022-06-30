import { Box, Flex, Label, BoxProps } from '@zoralabs/zord'
import { nftThumbnail } from './NftMedia.css'
import { useNFT } from '@zoralabs/nft-hooks'
import { useMemo } from 'react'
import { useRawImageTransform } from './hooks/useRawImageTransform'

export interface CollectionThumbnailProps extends BoxProps {
  collectionAddress: string | undefined
  tokenId?: string
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
  radius?: 'curved' | 'round' | 'phat'
  useTitle?: boolean
}

export function CollectionThumbnail({
  collectionAddress,
  tokenId = '1',
  size = 'md',
  radius = 'curved',
  useTitle = false,
  ...props
}: CollectionThumbnailProps) {
  const { data } = useNFT(collectionAddress, tokenId)
  const { image } = useRawImageTransform(data?.media?.image?.uri)

  const thumbnailSize = useMemo(() => {
    switch (size) {
      case 'xxs':
        return 'x8'
      case 'xs':
        return 'x10'
      case 'sm':
        return 'x14'
      case 'md':
        return 'x20'
      case 'lg':
        return 'x30'
      default:
        return 'x14'
    }
  }, [size])

  if (!collectionAddress) return null

  return (
    <Flex align="center" gap="x4" {...props}>
      <Box
        w={thumbnailSize}
        h={thumbnailSize}
        position="relative"
        overflow="hidden"
        borderRadius={radius}
        className={nftThumbnail}
        backgroundColor="tertiary"
      >
        {data?.media?.image?.uri && (
          <Box as="img" inset="x0" w="100%" h="100%" position="absolute" src={image} />
        )}
      </Box>
      {useTitle && <Label size="lg">{data?.nft?.contract?.name}</Label>}
    </Flex>
  )
}
