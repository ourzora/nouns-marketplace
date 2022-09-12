import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps, Stack, Button } from '@zoralabs/zord'
import { ModalComposition, useModal } from '@modal'
import { useIsOwner } from '@shared'
import { ListV3AskWizard, NFTOwner } from '@market/components'
import { PrivateAskListForSale } from './PrivateAskListForSale'
import { SelectListFlow } from '@market/components/SelectListFlow'
import { PrivateAskStateProvider } from './providers/PrivateAskStateProvider'

export interface UniversalAskModalProps extends FlexProps {
  nftObj: NFTObject
}

export function UniversalListAskModal({ nftObj, ...props }: UniversalAskModalProps) {
  const { nft } = nftObj
  const { isOwner } = useIsOwner(nftObj)
  const { requestClose } = useModal()

  if (!nft) {
    return null
  }

  return (
    <PrivateAskStateProvider>
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
              <Box p="x8">
                <SelectListFlow nftObj={nftObj} closeModal={requestClose} />
              </Box>
            }
          />
        ) : (
          <NFTOwner address={nft?.owner?.address} align="left" />
        )}
      </Stack>
    </PrivateAskStateProvider>
  )
}
