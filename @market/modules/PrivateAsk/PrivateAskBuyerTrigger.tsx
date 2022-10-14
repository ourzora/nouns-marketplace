import {
  APPROVE_MODULE_FOR_FILL,
  usePrivateAskStateContext,
} from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Well } from '@zoralabs/zord'
import React, { useState } from 'react'
import { Button } from 'components/Button'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'

interface PrivateAskBuyerTriggerProps {
  nft: NFTObject
  openModal: () => void
}

export function PrivateAskBuyerTrigger({ nft, openModal }: PrivateAskBuyerTriggerProps) {
  const { dispatch } = usePrivateAskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { displayAskAmount, usdAskAmount, isValidPrivateAskBuyer } = useAskHelper({ ask })
  const [disabled, setDisabled] = useState<boolean>(false)

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
        w="100%"
        disabled={disabled}
        onClick={() => {
          dispatch && dispatch({ type: APPROVE_MODULE_FOR_FILL }) // INITIAL STATE IN FLOW
          openModal()
          setDisabled(true)
        }}
      >
        Buy Now
      </Button>
    </Well>
  )
}
