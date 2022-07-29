import { Box, BoxProps } from '@zoralabs/zord'
import { useNounsToken } from '@noun-auction/hooks/useNounsToken'
import { ImageElement } from 'components'
import { nounishThumbnailImage } from '@noun-auction/styles/NounishStyles.css'

export interface FallbackThumbnailProps extends BoxProps {
  tokenId: string
  tokenContract: string
}

export function FallbackThumbnail({
  tokenId,
  tokenContract,
  ...props
}: FallbackThumbnailProps) {
  const { tokenData } = useNounsToken(tokenContract, tokenId)

  if (!tokenData) return null

  return (
    <ImageElement
      className={[nounishThumbnailImage, 'nouns-fallback-image']}
      src={tokenData?.image}
      {...props}
    />
  )
}
