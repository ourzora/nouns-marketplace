import { Button } from 'components/Button'

import React from 'react'

import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { VIEW_LISTING, usePrivateAskStateContext } from '@market/modules/PrivateAsk/'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Well } from '@zoralabs/zord'

interface PrivateAskVisitorTriggerProps {
  nft: NFTObject
  openModal: () => void
}

export function PrivateAskVisitorTrigger({
  nft,
  openModal,
}: PrivateAskVisitorTriggerProps) {
  const { dispatch } = usePrivateAskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { displayAskAmount, usdAskAmount } = useAskHelper({ ask })

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
        variant="secondary"
        w="100%"
        onClick={() => {
          dispatch && dispatch({ type: VIEW_LISTING })
          openModal()
        }}
      >
        Show Sale Data
      </Button>
    </Well>
  )
}
