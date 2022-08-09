import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps, Stack, Button } from '@zoralabs/zord'
import { NFTOwner } from '../NFTOwner'
import { ModalComposition, useModal } from '@modal'
import { List } from '@market/components'
import { useIsOwner } from '@market/hooks/useIsOwner'
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
    <Stack {...props} flex="1" justify="flex-end">
      {isOwner ? (
        <ModalComposition
          modalName={`list-${nft.tokenId}${nft.contract.address}`}
          trigger={
            <Button
              as="span"
              size="md"
              borderRadius="curved"
              className="zora-market-cardMarketTrigger"
            >
              List
            </Button>
          }
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
