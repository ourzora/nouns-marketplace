import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex } from '@zoralabs/zord'
import { NFTOwner } from '../NFTOwner'
import { useAccount } from 'wagmi'

export function ListToken({ nftData }: { nftData: NFTObject }) {
  const { nft } = nftData
  const { data: account } = useAccount()

  const isOwner = useMemo(
    () => account?.address?.toLowerCase() === nft?.owner?.address.toLowerCase(),
    [account?.address, nft?.owner]
  )

  return (
    <>
      {isOwner ? (
        <Flex>LIST</Flex>
      ) : (
        <NFTOwner address={nft?.owner?.address} align="left" />
      )}
    </>
  )
}
