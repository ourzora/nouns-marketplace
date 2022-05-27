import { Stack, Box, Text, Flex, Heading } from '@zoralabs/zord/elements'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCardMarket } from '@market'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import { cardWrapper } from '@media/NftMedia.css'

export function NFTCard({
  nftData,
  cardMarketComponent,
}: {
  nftData: NFTObject
  cardMarketComponent?: JSX.Element
}) {
  const { metadata, media, nft } = nftData
  const { image } = useRawImageTransform(media?.image?.uri)

  return (
    <Stack w="100%" position="relative" overflow="hidden" p="x6" className={cardWrapper}>
      <Flex>
        <Heading size="sm" textTransform="uppercase">
          {nft?.contract.name}
        </Heading>
      </Flex>
      <Box w="100%">
        <Box as="img" src={image} w="100%" />
      </Box>
      <Stack gap="x4" mt="x4">
        <Heading size="md">{metadata?.name}</Heading>
        <NFTCardMarket nftData={nftData} />
      </Stack>
    </Stack>
  )
}
