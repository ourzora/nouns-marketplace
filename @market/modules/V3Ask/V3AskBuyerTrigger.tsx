import { Button } from 'components/Button'

import React, { useMemo, useState } from 'react'

import { useAskHelper, useRelevantMarket } from '@market/hooks'
import {
  APPROVE_MODULE_FOR_FILL_PRIVATEASK,
  APPROVE_MODULE_FOR_FILL_V3ASK,
  useV3AskStateContext,
} from '@market/modules/V3Ask/'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Well } from '@zoralabs/zord'

interface V3AskBuyerTriggerProps {
  nft: NFTObject
  openModal: () => void
}

export function V3AskBuyerTrigger({ nft, openModal }: V3AskBuyerTriggerProps) {
  const { dispatch } = useV3AskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { displayAskAmount, usdAskAmount, hasActivePrivateAsk, isValidPrivateAskBuyer } =
    useAskHelper({ ask })
  const [disabled, setDisabled] = useState<boolean>(false)
  const label = useMemo(
    () => (hasActivePrivateAsk ? 'Private Listing' : 'Listing'),
    [hasActivePrivateAsk]
  )

  const selectedAskFlow = useMemo(
    () =>
      hasActivePrivateAsk
        ? APPROVE_MODULE_FOR_FILL_PRIVATEASK
        : APPROVE_MODULE_FOR_FILL_V3ASK,
    [hasActivePrivateAsk]
  )

  if (hasActivePrivateAsk && !isValidPrivateAskBuyer) return null

  return (
    <Well gap="x6" borderRadius="phat">
      {displayAskAmount && (
        <PriceWithLabel
          label={label}
          symbol="ETH"
          cryptoAmount={displayAskAmount}
          usdAmount={usdAskAmount}
        />
      )}

      <Button
        w="100%"
        disabled={disabled}
        onClick={() => {
          dispatch && dispatch({ type: selectedAskFlow })
          openModal()
          setDisabled(true)
        }}
      >
        Buy Now
      </Button>
    </Well>
  )
}
