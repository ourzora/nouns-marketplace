import { Box } from '@zoralabs/zord'
import { nftThumbnail } from './NftMedia.css'
import { useNFT } from '@zoralabs/nft-hooks'
import { useMemo } from 'react'
import { useRawImageTransform } from './hooks/useRawImageTransform'
import { useInterval } from '@market/hooks'

export function CollectionThumbnail({
  collectionAddress,
  tokenId = '1',
  size = 'md',
  radius = 'curved',
}: {
  collectionAddress: string
  tokenId?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  radius?: 'curved' | 'round'
}) {
  const { data } = useNFT(collectionAddress, tokenId)
  const { image } = useRawImageTransform(data?.media?.image?.uri)

  /*
  useInterval(() => {
    const tokenClamp = 4
    let currentToken = parseInt(tokenNo)
    if (currentToken < tokenClamp) {
      currentToken = currentToken + 1
    } else {
      currentToken = 1
    }
    updateTokenNo(currentToken.toString())
    console.log(tokenNo)
  }, 1000)
  */

  const thumbnailSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'x10'
      case 'sm':
        return 'x14'
      case 'md':
        return 'x20'
      case 'lg':
        return 'x30'
      default:
        return 'x14'
    }
  }, [size])

  return (
    <Box
      w={thumbnailSize}
      h={thumbnailSize}
      position="relative"
      overflow="hidden"
      borderRadius={radius}
      className={nftThumbnail}
      backgroundColor="tertiary"
    >
      {data?.media?.image?.uri && (
        <Box as="img" inset="x0" w="100%" h="100%" position="absolute" src={image} />
      )}
    </Box>
  )
}
