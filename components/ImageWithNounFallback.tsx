import { Box } from '@zoralabs/zord'
import { returnDao } from 'constants/collection-addresses'
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
  const isDao = returnDao(tokenContract) !== undefined

  return (
    <>
      {!isDao && srcImg ? (
        <ImageElement
          src={srcImg}
          w="100%"
          h="100%"
          position="absolute"
          inset="x0"
          objectFit="cover"
        />
      ) : (
        <>
          {srcImg ? (
            <ImageElement
              src={srcImg}
              w="100%"
              h="100%"
              position="absolute"
              inset="x0"
              objectFit="cover"
            />
          ) : (
            <FallbackThumbnail
              tokenContract={tokenContract}
              tokenId={tokenId}
              objectFit="cover"
            />
          )}
        </>
      )}
    </>
  )
}
