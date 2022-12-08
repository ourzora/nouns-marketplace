import { Button } from 'components/Button'

import { useToken } from 'hooks/useToken'

import { useCallback } from 'react'

import { SelectListFlow } from '@market/components/SelectListFlow'
import { ModalComposition, useModal } from '@modal'
import { Box, FlexProps } from '@zoralabs/zord'

import {
  RESET_V3ASK, // V3AskStateProvider,
  useV3AskStateContext,
} from './providers/V3AskStateProvider'

export interface UniversalAskModalProps extends FlexProps {
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: ReturnType<typeof useToken>['markets']
}

export function UniversalListAskModal({
  tokenId,
  contractAddress,
  collectionName,
  markets,
  ...props
}: UniversalAskModalProps) {
  const { requestClose } = useModal()
  const { dispatch } = useV3AskStateContext()

  const handleClose = useCallback(() => {
    requestClose()
    dispatch && dispatch({ type: RESET_V3ASK })
  }, [dispatch, requestClose])

  return (
    <ModalComposition
      modalName={`list-${tokenId}${contractAddress}`}
      modalBehaviorRequiresAuth={true}
      onClose={handleClose}
      trigger={
        <Button as="span" size="md" className="zora-market-cardMarketTrigger">
          List
        </Button>
      }
      content={
        <Box p="x8" {...props}>
          <SelectListFlow
            tokenId={tokenId}
            contractAddress={contractAddress}
            collectionName={collectionName}
            markets={markets}
            closeModal={handleClose}
          />
        </Box>
      }
    />
  )
}
