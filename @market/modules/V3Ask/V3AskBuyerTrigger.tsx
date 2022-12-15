import { Button } from 'components/Button'

import { useToken } from 'hooks/useToken'

import React, { useCallback, useMemo, useState } from 'react'
import { TypeSafeMarket } from 'validators/market'

import { useRelevantMarket } from '@market/hooks'
import {
  APPROVE_MODULE_FOR_FILL_PRIVATEASK,
  APPROVE_MODULE_FOR_FILL_V3ASK,
  useV3AskStateContext,
} from '@market/modules/V3Ask/'
import { useButtonRequiresAuth } from '@shared'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { Well } from '@zoralabs/zord'

interface V3AskBuyerTriggerProps {
  markets: TypeSafeMarket[]
  openModal: () => void
}

export function V3AskBuyerTrigger({ markets, openModal }: V3AskBuyerTriggerProps) {
  const { dispatch } = useV3AskStateContext()
  const { displayAskAmount, usdAskAmount, hasActivePrivateAsk, isValidPrivateAskBuyer } =
    useRelevantMarket(markets)
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

  const buyNow = useCallback(() => {
    dispatch && dispatch({ type: selectedAskFlow })
    openModal()
    setDisabled(true)
  }, [dispatch, openModal, selectedAskFlow])

  const buttonBehavior = useButtonRequiresAuth(buyNow)

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

      <Button w="100%" disabled={disabled} onClick={buttonBehavior}>
        Buy Now
      </Button>
    </Well>
  )
}
