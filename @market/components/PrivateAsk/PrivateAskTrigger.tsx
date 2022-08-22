import {
  CANCEL,
  PrivateAskAction,
  // FILLASK,
  APPROVE_FOR_FILL,
} from '@market/providers/PrivateAskProvider'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button } from '@zoralabs/zord'
import React from 'react'

import { useRelevantMarket } from '@market/hooks'
import { useAskTokenHelper } from '@market/hooks/useAskTokenHelper'
import { isAddressMatch, useAuth, useIsOwner } from '@shared'

interface PrivateAskTriggerProps {
  nft: NFTObject
  openModal: () => void
  dispatch: React.Dispatch<PrivateAskAction>
}

export function PrivateAskTrigger({ nft, openModal, dispatch }: PrivateAskTriggerProps) {
  const { ask } = useRelevantMarket(nft.markets)
  const { hasActiveAsk, isPrivateAsk, buyerAddress } = useAskTokenHelper({ ask })
  const { isOwner } = useIsOwner(nft)
  const { address: userAddress } = useAuth()
  const hasActivePrivateAsk = hasActiveAsk && isPrivateAsk
  const isValidBuyer = hasActivePrivateAsk && isAddressMatch(userAddress, buyerAddress)
  console.log('ASK', ask)

  return isOwner ? (
    <>
      {hasActivePrivateAsk ? (
        <Button
          w="100%"
          onClick={() => {
            dispatch && dispatch({ type: CANCEL })
            openModal()
          }}
        >
          Cancel Private Sale
        </Button>
      ) : (
        <Button w="100%" onClick={openModal}>
          List for Private Sale
        </Button>
      )}
    </>
  ) : (
    isValidBuyer && (
      <Button
        w="100%"
        onClick={() => {
          // dispatch && dispatch({ type: FILLASK })
          dispatch && dispatch({ type: APPROVE_FOR_FILL })
          openModal()
        }}
      >
        Buy NFT Privately
      </Button>
    )
  )
}
