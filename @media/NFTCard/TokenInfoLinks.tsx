import { Flex } from '@zoralabs/zord'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { TokenInfoLink, EtherscanLogo } from '@market'
import { Zorb } from '@zora-brand'

export function TokenInfoLinks({ nftData }: { nftData: NFTObject }) {
  const { nft } = nftData

  return (
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
  )
}
