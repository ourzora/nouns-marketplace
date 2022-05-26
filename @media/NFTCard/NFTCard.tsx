import { Stack, Box, Text } from '@zoralabs/zord/elements'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCardMarket } from './NFTCardMarket'

export function NFTCard({ nft }: NFTObject) {
  const {
    /* @ts-ignore */
    rawData,
    media,
    rawData: { marketsSummary },
  } = nft

  return (
    <Stack w="100%">
      <Box w="100%">
        <Box as="img" src={media?.image?.uri} w="100%" />
      </Box>
      <Stack>
        <Text>
          {
            /* @ts-ignore */
            nft?.metadata?.name
          }
        </Text>
        <NFTCardMarket marketsSummary={marketsSummary} />
      </Stack>
    </Stack>
  )
}
