import { Box, Flex, Label, BoxProps, mixins } from '@zoralabs/zord'
import { nftThumbnail } from './NftMedia.css'
import { useNFT } from '@zoralabs/nft-hooks'
import { useMemo } from 'react'
import { useRawImageTransform } from './hooks/useRawImageTransform'

export type SizeProps = '100%' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | undefined

export const returnThumbnailSize = (size: SizeProps) => {
  switch (size) {
    case '100%':
      return '100%'
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
      return '100%'
  }
}

export interface CollectionThumbnailProps extends BoxProps {
  collectionAddress: string | undefined
  tokenId?: string
  size?: SizeProps
  radius?: 'curved' | 'round' | 'phat'
  useTitle?: boolean
  thumbnailStyle?: any
}

export function CollectionThumbnail({
  collectionAddress,
  tokenId = '1',
  size = 'md',
  radius = 'curved',
  useTitle = false,
  thumbnailStyle,
  ...props
}: CollectionThumbnailProps) {
  const { data } = useNFT(collectionAddress, tokenId)
  const { image } = useRawImageTransform(data?.media?.image?.uri)

  if (!collectionAddress) return null

  return (
    <Flex align="center" gap="x4" {...props}>
      <Box
        h={returnThumbnailSize(size)}
        borderRadius={radius}
        className={['zora-media__nft-thumbnail', nftThumbnail]}
      >
        {data?.media?.image?.uri ? (
          <Box as="img" inset="x0" w="100%" h="100%" position="absolute" src={image} />
        ) : (
          <Box inset="x0" w="100%" h="100%" position="absolute" />
        )}
      </Box>
      {useTitle && <Label size="lg">{data?.nft?.contract?.name}</Label>}
    </Flex>
  )
}
