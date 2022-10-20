import { ImageElement } from 'components'

import { useNounsToken } from '@noun-auction/hooks/useNounsToken'
import { nounishThumbnailImage } from '@noun-auction/styles/NounishStyles.css'
import { BoxProps } from '@zoralabs/zord'

export interface FallbackThumbnailProps extends BoxProps {
  tokenId: string
  tokenContract: string
}

export function FallbackThumbnail({
  tokenId,
  tokenContract,
  ...props
}: FallbackThumbnailProps) {
  const { tokenData } = useNounsToken(tokenContract, tokenId) // @BJ <--- THIS HOOK SEEMS TO FAIL, cause 500?

  if (!tokenData) return null

  return (
    <ImageElement
      className={[nounishThumbnailImage, 'nouns-fallback-image']}
      src={tokenData.image}
      {...props}
    />
  )
}
