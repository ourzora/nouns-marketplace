import { usePrivateAskStateContext, VIEW_LISTING } from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Well } from '@zoralabs/zord'
import React from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'

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
        borderRadius="curved" // @BJ todo: replace with 'large' when zord has been updated
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
