import { Stack, Box, Icon, Flex, Heading, Separator } from '@zoralabs/zord'
import { Link } from 'components/Link'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCardMarket, TokenInfoLink, EtherscanLogo } from '@market'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import { cardWrapper } from '@media/NftMedia.css'
import { Zorb } from '@zora-brand'

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
        <Separator />
        <Flex align="center" gap="x2" justify="space-between">
          <Heading size="md">{metadata?.name}</Heading>
          <Flex align="center" gap="x3">
            <TokenInfoLink
              linkType="nft"
              contractAddress={nft?.contract.address}
              tokenId={nft?.tokenId}
            >
              <EtherscanLogo size={24} />
            </TokenInfoLink>
            <TokenInfoLink
              linkType="zoraNft"
              contractAddress={nft?.contract.address}
              tokenId={nft?.tokenId}
            >
              <Zorb size={24} address={nft?.contract.address} />
            </TokenInfoLink>
          </Flex>
        </Flex>
        <Separator />
        {markets && markets.length ? (
          <NFTCardMarket nftData={nftData} />
        ) : (
          <div>List</div>
        )}
      </Stack>
    </Stack>
  )
}
