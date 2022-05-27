import { cloneElement } from 'react'
import { Stack, Box, Text } from '@zoralabs/zord/elements'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCardMarket } from '@market'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'

export function NFTCard({
  nftData,
  cardMarketComponent,
}: {
  nftData: NFTObject
  cardMarketComponent?: JSX.Element
}) {
  const { metadata, media } = nftData

  const { image } = useRawImageTransform(media?.image?.uri)

  return (
    <Stack w="100%">
      <Box w="100%">
        <Box as="img" src={image} w="100%" />
      </Box>
      <Stack>
        <Text>
          {
            /* @ts-ignore */
            metadata?.name
          }
        </Text>
        {/* THIS SHOULD INHERIT NFT DATA via hooks */}
        <NFTCardMarket nftData={nftData} />
      </Stack>
    </Stack>
  )
}
