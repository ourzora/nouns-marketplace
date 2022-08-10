import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps, Stack, Button } from '@zoralabs/zord'
import { ModalComposition, useModal } from '@modal'
import { useIsOwner } from '@shared'
import { ListV3AskWizard, NFTOwner } from '@market/components'

export interface ListV3AskModalProps extends FlexProps {
  nftData: NFTObject
}

export function ListV3AskModal({ nftData, ...props }: ListV3AskModalProps) {
  const { nft, media } = nftData
  const { isOwner } = useIsOwner(nftData)
  const { requestClose } = useModal()

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
              <ListV3AskWizard
                tokenAddress={nft.contract.address}
                tokenId={nft.tokenId}
                onClose={requestClose}
                previewURL={media?.poster?.uri}
                cancelButton={
                  <Button
                    onClick={requestClose}
                    w="100%"
                    variant="secondary"
                    borderRadius="curved"
                  >
                    Cancel
                  </Button>
                }
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
