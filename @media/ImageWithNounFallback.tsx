import { ImageElement } from 'components'

import { useMemo } from 'react'

import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import { FallbackThumbnail } from '@noun-auction'

type ImageWithFallbackProps = {
  collectionAddress: string
  tokenId: string
  image: any // very bad type from api, FIXME later
}

export function ImageWithNounFallback({
  collectionAddress,
  tokenId,
  image,
}: ImageWithFallbackProps) {
  const { image: rawImageFallback } = useRawImageTransform(image?.url ?? undefined)

  const decodedImgSrc = useMemo(() => {
    const imageUrl = image?.url
    if (image?.mimeType === 'image/svg+xml') {
      return imageUrl?.includes('data:image/svg+xml') ||
        imageUrl?.includes('https://api.zora.co')
        ? imageUrl
        : `data:image/svg+xml,${imageUrl}` // proper handling of URI-encoded SVG
    } else {
      return image?.mediaEncoding?.poster ?? imageUrl
    }
  }, [image])

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

  return <FallbackThumbnail tokenContract={collectionAddress} tokenId={tokenId} />
}
