import { Box, Flex, Label, BoxProps } from '@zoralabs/zord'
import { nftThumbnail } from './NftMedia.css'
import { NFTObject, useNFT } from '@zoralabs/nft-hooks'
import { ImageWithNounFallback } from 'components'
import { useRawImageTransform } from './hooks/useRawImageTransform'
import { useMemo } from 'react'

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
      return 'x24'
    default:
      return '100%'
  }
}

export interface CollectionThumbnailProps extends BoxProps {
  collectionAddress: string | undefined
  tokenId?: string
  initialNFT?: NFTObject
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
  initialNFT,
  ...props
}: CollectionThumbnailProps) {
  const { data: nft = initialNFT } = useNFT(collectionAddress, tokenId)
  const { image } = useRawImageTransform(nft?.media?.image?.uri)
  const thumbnailSize = useMemo(() => returnThumbnailSize(size), [size])

  if (!collectionAddress) return null

  return (
    <Flex align="center" gap="x4" {...props}>
      <Box
        h={thumbnailSize}
        borderRadius={radius}
        className={['zora-media__nft-thumbnail', nftThumbnail]}
      >
        <ImageWithNounFallback
          srcImg={image}
          tokenId={tokenId}
          tokenContract={collectionAddress}
        />
      </Box>
      {useTitle && <Label size="lg">{nft?.nft?.contract?.name}</Label>}
    </Flex>
  )
}
