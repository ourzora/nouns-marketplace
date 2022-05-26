import { Stack, Box, Text } from '@zoralabs/zord/elements'
import { NFTObject, MARKET_TYPES } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useRelevantMarket } from '@media/hooks/useRelevantMarket'
import { useEffect } from 'react'
import { NFTCardMarket } from './NFTCardMarket'

export function NFTCard({ nft }: NFTObject) {
  const {
    rawData,
    media,
    rawData: { token, marketsSummary },
  } = nft

  return (
    <Stack w="100%">
      <Box w="100%">
        <Box as="img" src={media?.image?.uri} w="100%" />
      </Box>
      <Stack>
        <Text>{nft?.metadata?.name}</Text>
        <NFTCardMarket marketsSummary={marketsSummary} />
      </Stack>
      <Box w="100%">{/*<RawDisplayer data={nft} />*/}</Box>
    </Stack>
  )
}
