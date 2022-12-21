import { useCallback } from 'react'

import { SelectListFlow } from '@market/components/SelectListFlow'
import { ModalComposition, useModal } from '@modal'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, Button, FlexProps } from '@zord'

import {
  RESET_V3ASK, // V3AskStateProvider,
  useV3AskStateContext,
} from './providers/V3AskStateProvider'

export interface UniversalAskModalProps extends FlexProps {
  nftObj: NFTObject
}

export function UniversalListAskModal({ nftObj, ...props }: UniversalAskModalProps) {
  const { nft } = nftObj
  const { requestClose } = useModal()
  const { state, dispatch } = useV3AskStateContext()

  const handleClose = useCallback(() => {
    requestClose()
    dispatch && dispatch({ type: RESET_V3ASK })
  }, [dispatch, requestClose])

  if (!nft) {
    return null
  }

  return (
    <ModalComposition
      modalName={`list-${nft.tokenId}${nft.contract.address}`}
      modalBehaviorRequiresAuth={true}
      onClose={handleClose}
      trigger={
        <Button as="span" size="md" className="zora-market-cardMarketTrigger">
          List
        </Button>
      }
      content={
        <Box p="x8">
          <SelectListFlow nftObj={nftObj} closeModal={handleClose} />
        </Box>
      }
    />
  )
}
