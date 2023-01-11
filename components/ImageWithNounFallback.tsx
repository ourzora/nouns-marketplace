import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { useOptionalImageURIDecode } from '@media/hooks/useImageURIDecode'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import { FallbackThumbnail } from '@noun-auction'
import { BoxProps } from '@zord'

import { ImageElement } from './ImageElement'

interface ImageWithNounFallbackProps extends BoxProps {
  token: TypeSafeToken
  pos?: 'absolute' | 'relative'
}

export function ImageWithNounFallback({
  token,
  pos = 'absolute',
  ...props
}: ImageWithNounFallbackProps) {
  const { image: rawImageFallback } = useRawImageTransform(token.image?.url ?? undefined)

  const decodedImgSrc = useOptionalImageURIDecode(token) // Handle non-base64 SVGs by decoding URI. This should be replaced when handled properly API-side

  const srcImg = useMemo(
    () => decodedImgSrc ?? rawImageFallback,
    [decodedImgSrc, rawImageFallback]
  )

  if (srcImg) {
    return (
      <ImageElement
        src={srcImg}
        w="100%"
        h="100%"
        position={pos}
        inset="x0"
        objectFit="cover"
        {...props}
      />
    )
  }

  return <FallbackThumbnail tokenContract={token.tokenContract} tokenId={token.tokenId} />
}
