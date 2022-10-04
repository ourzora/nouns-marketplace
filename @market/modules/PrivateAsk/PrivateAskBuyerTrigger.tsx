import {
  // CANCEL,
  // UPDATE,
  APPROVE_MODULE_FOR_FILL,
  // APPROVE_TRANSFER,
  // CANCEL_SUCCESS,
  // CREATE_SUCCESS,
  // UPDATE_SUCCESS,
  // FILLASK_SUCCESS,
  // CANCEL_ASK,
  usePrivateAskStateContext,
} from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Well } from '@zoralabs/zord'
import React, { useState } from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { useButtonRequiresAuth } from '@shared'

interface PrivateAskBuyerTriggerProps {
  nft: NFTObject
  openModal: () => void
}

export function PrivateAskBuyerTrigger({ nft, openModal }: PrivateAskBuyerTriggerProps) {
  const { dispatch } = usePrivateAskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { displayAskAmount, usdAskAmount, isValidPrivateAskBuyer } = useAskHelper({ ask })
  const [disabled, setDisabled] = useState<boolean>(false)

  const initiatePrivateAskBuyFlow = () => {
    dispatch && dispatch({ type: APPROVE_MODULE_FOR_FILL })
    openModal()
    setDisabled(true)
  }

  const buttonBehavior = useButtonRequiresAuth(initiatePrivateAskBuyFlow)

  if (!isValidPrivateAskBuyer) return null

  return (
    <Well gap="x6" borderRadius="phat">
      {displayAskAmount && (
        <PriceWithLabel
          label="Private Listing"
          symbol="ETH"
          cryptoAmount={displayAskAmount}
          usdAmount={usdAskAmount}
        />
      )}

      <Button
        borderRadius="curved" // @BJ todo: replace with 'large' when zord has been updated
        w="100%"
        disabled={disabled}
        onClick={buttonBehavior}
      >
        Buy Now
      </Button>
    </Well>
  )
}
