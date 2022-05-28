import { Stack, Box, Text, Flex, Heading } from '@zoralabs/zord/elements'
import { Link } from 'components/Link'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCardMarket } from '@market'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import { cardWrapper } from '@media/NftMedia.css'
import { useRelevantMarket } from '@market/hooks/useRelevantMarket'

export function NFTCard({
  nftData,
  cardMarketComponent,
}: {
  nftData: NFTObject
  cardMarketComponent?: JSX.Element
}) {
  const {
    metadata,
    media,
    nft,
    rawData: { marketsSummary },
  } = nftData
  const { image } = useRawImageTransform(media?.image?.uri)

  return (
    <Stack w="100%" position="relative" overflow="hidden" p="x6" className={cardWrapper}>
      <Flex>
        <Link href={`/collections/${nft?.contract.address}`} passHref>
          <Heading as="a" size="sm" textTransform="uppercase">
            {nft?.contract.name}
          </Heading>
        </Link>
      </Flex>
      <Box w="100%">
        <Box as="img" src={image} w="100%" />
      </Box>
      <Stack gap="x4" mt="x4">
        <Heading size="md">{metadata?.name}</Heading>
        {marketsSummary.length ? <NFTCardMarket nftData={nftData} /> : <div>List</div>}
      </Stack>
    </Stack>
  )
}
