import { FallbackThumbnail } from '@noun-auction'
import { ImageElement } from '@shared'
import { returnDao } from 'constants/collection-addresses'

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
        <ImageElement src={srcImg} />
      ) : (
        <>
          {srcImg ? (
            <ImageElement src={srcImg} />
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
