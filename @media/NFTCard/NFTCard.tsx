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

  console.log(nft)

  const { image } = useRawImageTransform(media?.image?.uri)

  return (
    <Stack w="100%" position="relative" overflow="hidden" p="x6" className={cardWrapper}>
      <Flex>
        <Heading size="md">{nft?.contract.name}</Heading>
      </Flex>
      <Box w="100%">
        <Box as="img" src={image} w="100%" />
      </Box>
      <Stack gap="x4" mt="x4">
        <Text>{metadata?.name}</Text>
        <NFTCardMarket nftData={nftData} />
      </Stack>
    </Stack>
  )
}
