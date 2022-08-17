import { UPDATE, CANCEL, PrivateAskAction } from '@market/providers/PrivateAskProvider'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Stack } from '@zoralabs/zord'
import React from 'react'

import { useRelevantMarket } from '@market/hooks'
import { useAskTokenHelper } from '@market/hooks/useAskTokenHelper'
import { useIsOwner } from '@shared'

interface PrivateAskTriggerProps {
  nft: NFTObject
  openModal: () => void
  dispatch: React.Dispatch<PrivateAskAction>
}

export function PrivateAskTrigger({ nft, openModal, dispatch }: PrivateAskTriggerProps) {
  const { ask } = useRelevantMarket(nft.markets)
  const { hasActiveAsk, isPrivateAsk, hasAsk } = useAskTokenHelper({ ask })
  const { isOwner } = useIsOwner(nft)

  return isOwner ? (
    <>
      {hasActiveAsk && isPrivateAsk ? (
        <Stack gap="x2">
          <Button
            w="100%"
            onClick={() => {
              dispatch && dispatch({ type: UPDATE })
              openModal()
            }}
          >
            Update Private Sale
          </Button>
          <Button
            w="100%"
            onClick={() => {
              dispatch && dispatch({ type: CANCEL })
              openModal()
            }}
          >
            Cancel Private Sale
          </Button>
        </Stack>
      ) : (
        <Button w="100%" onClick={openModal}>
          List for Private Sale
        </Button>
      )}
    </>
  ) : (
    <Button w="100%" onClick={openModal}>
      BUY THIS NFT PRIVATELY
    </Button>
  )
}
