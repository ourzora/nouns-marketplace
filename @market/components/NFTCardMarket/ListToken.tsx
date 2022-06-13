import { NFTObject } from '@zoralabs/nft-hooks'
import { Box } from '@zoralabs/zord'
import { NFTOwner } from '../NFTOwner'
import { ModalComposition } from '@modal'
import { List } from '@market/wizards'
import { CardMarketTrigger } from './CardMarketTrigger'
import { useIsOwner } from '@market/hooks/useIsOwner'
import { useModal } from '@modal'

export function ListToken({ nftData }: { nftData: NFTObject }) {
  const { nft } = nftData
  const { isOwner } = useIsOwner(nftData)
  const { requestClose } = useModal()

  if (!nft) {
    return null
  }

  return (
    <>
      {isOwner ? (
        <ModalComposition
          modalName={`list-${nft.tokenId}${nft.contract.address}`}
          trigger={<CardMarketTrigger cta="List" />}
          content={
            <Box p="x8">
              <List
                tokenAddress={nft.contract.address}
                tokenId={nft.tokenId}
                nftData={nftData}
                onClose={requestClose}
              />
            </Box>
          }
        />
      ) : (
        <NFTOwner address={nft?.owner?.address} align="left" />
      )}
    </>
  )
}
