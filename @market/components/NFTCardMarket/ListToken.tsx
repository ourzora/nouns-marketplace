import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Heading, Box } from '@zoralabs/zord'
import { NFTOwner } from '../NFTOwner'
import { useAccount } from 'wagmi'
import { ModalComposition } from '@modal'
import { List } from '@market/wizards'

export function ListToken({ nftData }: { nftData: NFTObject }) {
  const { nft } = nftData
  const { data: account } = useAccount()

  const isOwner = useMemo(
    () => account?.address?.toLowerCase() === nft?.owner?.address.toLowerCase(),
    [account?.address, nft?.owner]
  )

  if (!nft) {
    return null
  }

  return (
    <>
      {isOwner ? (
        <ModalComposition
          modalName={`list-${nft.tokenId}${nft.contract.address}`}
          trigger={
            <Heading
              px="x6"
              py="x2"
              as="span"
              size="xs"
              color="primary"
              borderRadius="round"
              backgroundColor="tertiary"
            >
              List
            </Heading>
          }
          content={
            <Box p="x8">
              <List tokenAddress={nft.contract.address} tokenId={nft.tokenId} />
            </Box>
          }
        />
      ) : (
        <NFTOwner address={nft?.owner?.address} align="left" />
      )}
    </>
  )
}
