import { useMemo } from 'react'

import {
  nounishThumbnail,
  nounishThumbnailImage,
} from '@noun-auction/styles/NounishStyles.css'
import { Box, BoxProps } from '@zoralabs/zord'

import { FallbackThumbnail } from './FallbackThumbnail'

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

export interface NounishThumbnailProps extends BoxProps {
  image?: string
  size?: SizeProps
  radius?: 'curved' | 'round' | 'phat' | ''
  thumbnailStyle?: any
  tokenId: string
  tokenContract: string
}

export function NounishThumbnail({
  image,
  size = 'md',
  radius = 'curved',
  thumbnailStyle,
  tokenId,
  tokenContract,
  ...props
}: NounishThumbnailProps) {
  const srcImg = useMemo(() => {
    if (image?.startsWith('%3Csvg%20')) {
      return `data:image/svg+xml,${image}`
    }

    return image
  }, [image])

  return (
    <Box
      borderRadius={radius}
      className={['nounish-thumbnail', nounishThumbnail]}
      {...props}
    >
      {image ? (
        <Box
          as="img"
          className={[nounishThumbnailImage, 'nouns-fallback-image']}
          src={srcImg}
        />
      ) : (
        <FallbackThumbnail tokenContract={tokenContract} tokenId={tokenId} />
      )}
    </Box>
  )
}
