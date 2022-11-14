import { ImageWithNounFallback } from 'components'

import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { Box, BoxProps, Flex, Label } from '@zoralabs/zord'

import { nftThumbnail } from './NftMedia.css'
import { useOptionalImageURIDecode } from './hooks/useImageURIDecode'
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
      return 'x24'
    default:
      return '100%'
  }
}

export interface CollectionThumbnailProps extends BoxProps {
  collectionAddress: string
  size?: SizeProps
  radius?: 'curved' | 'round' | 'phat'
  showTitle?: boolean
  thumbnailStyle?: any
}

export function CollectionThumbnail({
  collectionAddress,
  ...props
}: CollectionThumbnailProps) {
  // showing first token as CollectionThumbnail
  const { token } = useToken({ collectionAddress, tokenId: '1' })
  if (!token) return null

  return <CollectionThumbnailComponent token={token} {...props} />
}

export function CollectionThumbnailComponent({
  token,
  size = 'md',
  radius = 'curved',
  showTitle = false,
  thumbnailStyle,
  className,
  ...props
}: Omit<CollectionThumbnailProps, 'tokenId' | 'collectionAddress'> & {
  token: TypeSafeToken
}) {
  const { image: rawImageFallback } = useRawImageTransform(token.image?.url ?? undefined)

  const decodedImgSrc = useOptionalImageURIDecode(token) // Handle non-base64 SVGs by decoding URI. This should be replaced when handled properly API-side

  const srcImg = useMemo(
    () => decodedImgSrc ?? rawImageFallback,
    [decodedImgSrc, rawImageFallback]
  )

  const thumbnailSize = useMemo(() => returnThumbnailSize(size), [size])

  return (
    <Flex align="center" gap="x4" {...props} className={className}>
      <Box
        h={thumbnailSize}
        borderRadius={radius}
        className={['zora-media__nft-thumbnail', nftThumbnail]}
      >
        <ImageWithNounFallback
          srcImg={srcImg}
          tokenId={token.tokenId}
          tokenContract={token.collectionAddress}
        />
      </Box>
      {showTitle && <Label size="lg">{token.collectionName}</Label>}
    </Flex>
  )
}
