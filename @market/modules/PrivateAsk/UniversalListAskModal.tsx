import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps, Stack, Button } from '@zoralabs/zord'
import { ModalComposition, useModal } from '@modal'
import { useIsOwner } from '@shared'
import { ListV3AskWizard, NFTOwner } from '@market/components'
import { PrivateAskListForSale } from './PrivateAskListForSale'
import { SelectListFlow } from '@market/components/SelectListFlow'

export interface UniversalAskModalProps extends FlexProps {
  nftData: NFTObject
}

export function UniversalListAskModal({ nftData, ...props }: UniversalAskModalProps) {
  const { nft } = nftData
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
              <SelectListFlow nftData={nftData} closeModal={requestClose} />
            </Box>
          }
        />
      ) : (
        <NFTOwner address={nft?.owner?.address} align="left" />
      )}
    </Stack>
  )
}
