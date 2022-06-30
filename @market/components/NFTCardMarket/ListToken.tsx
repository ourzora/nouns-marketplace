import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps, Stack } from '@zoralabs/zord'
import { NFTOwner } from '../NFTOwner'
import { ModalComposition } from '@modal'
import { List } from '@market/wizards'
import { CardMarketTrigger } from './CardMarketTrigger'
import { useIsOwner } from '@market/hooks/useIsOwner'
import { useModal } from '@modal'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'

export interface ListTokenProps extends FlexProps {
  nftData: NFTObject
}

export function ListToken({ nftData, ...props }: ListTokenProps) {
  const { nft, metadata } = nftData
  const { isOwner } = useIsOwner(nftData)
  const { requestClose } = useModal()

  const { image } = useRawImageTransform(metadata?.imageUri)

  if (!nft) {
    return null
  }

  return (
    <Stack {...props}>
      {isOwner ? (
        <ModalComposition
          modalName={`list-${nft.tokenId}${nft.contract.address}`}
          trigger={<CardMarketTrigger cta="List" />}
          content={
            <Box p="x8" {...props}>
              <List
                tokenAddress={nft.contract.address}
                tokenId={nft.tokenId}
                nftData={nftData}
                onClose={requestClose}
                previewURL={image}
              />
            </Box>
          }
        />
      ) : (
        <NFTOwner address={nft?.owner?.address} align="left" />
      )}
    </Stack>
  )
}
