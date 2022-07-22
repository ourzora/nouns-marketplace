import { Box } from '@zoralabs/zord'
import { returnDao } from 'constants/collection-addresses'
import { FallbackThumbnail } from '@noun-auction'

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
      {!isDao ? (
        <Box
          as="img"
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
            <Box
              as="img"
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
