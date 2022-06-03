import { Stack, Box, Text, Flex, Heading } from '@zoralabs/zord'
import { Link } from 'components/Link'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCardMarket } from '@market'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import { cardWrapper } from '@media/NftMedia.css'

export function NFTCard({ nftData }: { nftData: NFTObject }) {
  const { metadata, media, nft, markets } = nftData
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
      <Link href={`/collections/${nft?.contract.address}/${nft?.tokenId}`}>
        <Box w="100%">
          <Box as="img" src={image} w="100%" />
        </Box>
      </Link>
      <Stack gap="x4" mt="x4">
        <Heading size="md">{metadata?.name}</Heading>
        {markets && markets.length ? (
          <NFTCardMarket nftData={nftData} />
        ) : (
          <div>List</div>
        )}
      </Stack>
    </Stack>
  )
}
