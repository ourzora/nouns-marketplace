import { Stack, Box, Flex, Heading } from '@zoralabs/zord'
import { Link } from 'components/Link'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTCardMarket, TokenInfoLink, EtherscanLogo, ListToken } from '@market'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import { cardWrapper } from '@media/NftMedia.css'
import { Zorb } from '@zora-brand'
import { CollectionThumbnail } from '@media/CollectionThumbnail'

export function NFTCard({ nftData }: { nftData: NFTObject }) {
  const { metadata, media, nft } = nftData
  const { image } = useRawImageTransform(media?.image?.uri)

  if (!nft) {
    return null
  }

  return (
    <Stack w="100%" position="relative" overflow="hidden" className={cardWrapper}>
      <Heading as="h4" size="sm" position="absolute" top="x3" left="x4">
        {metadata?.name}
      </Heading>
      <Link href={`/collections/${nft?.contract.address}/${nft?.tokenId}`}>
        <Box w="100%">
          <Box as="img" src={image} w="100%" />
        </Box>
      </Link>
      <Stack gap="x4" mt="x4" px="x6" pb="x4">
        <Flex align="center" gap="x2" justify="space-between">
          <Link href={`/collections/${nft?.contract.address}`} passHref>
            <Flex as="a" align="center" gap="x2">
              <CollectionThumbnail
                collectionAddress={nft?.contract.address}
                radius="round"
                size="xs"
              />
              <Heading size="xs" textTransform="uppercase">
                {nft?.contract.name}
              </Heading>
            </Flex>
          </Link>
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
        <NFTCardMarket nftData={nftData} />
      </Stack>
    </Stack>
  )
}
