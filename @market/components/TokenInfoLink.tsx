import { useMemo } from 'react'
import { Icon, Flex } from '@zoralabs/zord'

export function TokenInfoLink({
  contractAddress,
  tokenId,
  txHash,
  children,
  linkType,
}: {
  contractAddress?: string
  tokenId?: string
  txHash?: string
  children?: JSX.Element
  linkType: 'tx' | 'nft' | 'address' | 'zoraNft' | 'zoraCollection'
}) {
  const buildLink = useMemo(() => {
    switch (linkType) {
      case 'address':
        return `https://etherscan.io/address/${contractAddress}`
      case 'nft':
        return `https://etherscan.io/nft/${contractAddress}/${tokenId}`
      case 'tx':
        return `https://etherscan.io/tx/${txHash}`
      case 'zoraNft':
        return `https://zora.co/collections/${contractAddress}/${tokenId}`
      case 'zoraCollection':
        return `https://zora.co/collections/${contractAddress}`
      default:
        return ''
    }
  }, [contractAddress, tokenId, txHash, linkType])

  return (
    <Flex
      align="center"
      position="relative"
      as="a"
      href={buildLink}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </Flex>
  )
}
