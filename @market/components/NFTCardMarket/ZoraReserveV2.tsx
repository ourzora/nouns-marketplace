import { Flex } from '@zoralabs/zord'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { CardMarketTrigger } from './CardMarketTrigger'
import { NFTOwner } from '../NFTOwner'

export function ZoraReserveV2({ nftData }: { nftData: NFTObject }) {
  const { nft } = nftData
  return (
    <Flex justify="space-between">
      <NFTOwner align="left" address={nft?.owner?.address} />
      <Flex
        as="a"
        href={`https://zora.co/${nft?.contract?.address}/${nft?.tokenId}`}
        target="_blank"
        rel="noreferrer"
      >
        <CardMarketTrigger cta="Place bid" />
      </Flex>
    </Flex>
  )
}
