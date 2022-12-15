import { Button } from 'components/Button'

import { useCallback } from 'react'

import { SelectListFlow } from '@market/components/SelectListFlow'
import { useNftMarketContext } from '@media/NFTCard2'
import { ModalComposition, useModal } from '@modal'
import { Box, FlexProps } from '@zoralabs/zord'

import { RESET_V3ASK, useV3AskStateContext } from './providers/V3AskStateProvider'

export interface UniversalAskModalProps extends FlexProps {}

export function UniversalListAskModal({ ...props }: UniversalAskModalProps) {
  const { tokenId, collectionAddress } = useNftMarketContext()
  const { requestClose } = useModal()
  const { dispatch } = useV3AskStateContext()

  const handleClose = useCallback(() => {
    requestClose()
    dispatch && dispatch({ type: RESET_V3ASK })
  }, [dispatch, requestClose])

  return (
    <ModalComposition
      modalName={`list-${tokenId}${collectionAddress}`}
      modalBehaviorRequiresAuth={true}
      onClose={handleClose}
      trigger={
        <Button as="span" size="md" className="zora-market-cardMarketTrigger">
          List
        </Button>
      }
      content={
        <Box p="x8" {...props}>
          <SelectListFlow closeModal={handleClose} />
        </Box>
      }
    />
  )
}
