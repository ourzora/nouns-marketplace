import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { useOptionalImageURIDecode } from '@media/hooks/useImageURIDecode'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import { FallbackThumbnail } from '@noun-auction'

import { ImageElement } from './ImageElement'

export function ImageWithNounFallback({ token }: { token: TypeSafeToken }) {
  const { image: rawImageFallback } = useRawImageTransform(token.image?.url ?? undefined)

  // token?.tokenId === '9' && console.log('TOKEN', token)
  token?.tokenId === '9' && console.log('TOKEN.IMG', token.image)

  const decodedImgSrc = useOptionalImageURIDecode(token) // Handle non-base64 SVGs by decoding URI. This should be replaced when handled properly API-side
  // console.log('decoded', decodedImgSrc)

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
        position="absolute"
        inset="x0"
        objectFit="cover"
      />
    )
  }

  return <FallbackThumbnail tokenContract={token.tokenContract} tokenId={token.tokenId} />
}
