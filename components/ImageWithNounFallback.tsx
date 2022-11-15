import { FallbackThumbnail } from '@noun-auction'

import { ImageElement } from './ImageElement'

export function ImageWithNounFallback({
  srcImg,
  tokenContract,
  tokenId,
}: {
  srcImg?: string
  tokenContract: string
  tokenId: string
}) {
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

  return <FallbackThumbnail tokenContract={tokenContract} tokenId={tokenId} />
}
