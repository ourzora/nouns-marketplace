import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, FlexProps, Stack, Button } from '@zoralabs/zord'
import { ModalComposition, useModal } from '@modal'
import { SelectListFlow } from '@market/components/SelectListFlow'
import { PrivateAskStateProvider } from './providers/PrivateAskStateProvider'

export interface UniversalAskModalProps extends FlexProps {
  nftObj: NFTObject
}

export function UniversalListAskModal({
  nftObj,
  className,
  ...props
}: UniversalAskModalProps) {
  const { nft } = nftObj
  const { requestClose } = useModal()

  if (!nft) {
    return null
  }

  return (
    <PrivateAskStateProvider>
      <Stack
        {...props}
        flex="1"
        justify="flex-end"
        className={['zora-universal-list-ask-modal', className]}
      >
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
      </Stack>
    </PrivateAskStateProvider>
  )
}
