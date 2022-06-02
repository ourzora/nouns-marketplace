import { Box } from '@zoralabs/zord'
import { nftThumbnail } from './NftMedia.css'
import { useNFT } from '@zoralabs/nft-hooks'

export function CollectionThumbnail({
  collectionAddress,
  tokenId = '1',
}: {
  collectionAddress: string
  tokenId?: string
}) {
  const { data } = useNFT(collectionAddress, tokenId)

  return (
    <Box w="x14" h="x14" position="relative" overflow="hidden" borderRadius="curved">
      {data?.metadata?.imageUri && (
        <Box
          as="img"
          inset="x0"
          w="100%"
          h="100%"
          position="absolute"
          className={nftThumbnail}
          src={data?.metadata?.imageUri}
        />
      )}
    </Box>
  )
}
