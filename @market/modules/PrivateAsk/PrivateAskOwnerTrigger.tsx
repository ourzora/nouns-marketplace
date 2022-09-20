import { CANCEL, UPDATE, usePrivateAskStateContext } from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Stack } from '@zoralabs/zord'
import React from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'

interface PrivateAskOwnerTriggerProps {
  nft: NFTObject
  openModal: () => void
}

export function PrivateAskOwnerTrigger({ nft, openModal }: PrivateAskOwnerTriggerProps) {
  const { dispatch } = usePrivateAskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { hasActivePrivateAsk, displayAskAmount, usdAskAmount, isValidPrivateAskBuyer } =
    useAskHelper({ ask })
  // const { isOwner } = useIsOwner(nft)
  // const { formattedAskDetails } = useFormattedPrivateAskInfo({ nft })

  if (hasActivePrivateAsk) {
    return (
      <Stack gap="x2">
        <Button
          w="100%"
          onClick={() => {
            dispatch && dispatch({ type: UPDATE })
            openModal()
          }}
        >
          Update Private Listing
        </Button>
        <Button
          variant="destructive"
          w="100%"
          onClick={() => {
            dispatch && dispatch({ type: CANCEL })
            openModal()
          }}
        >
          Cancel Private Listing
        </Button>
      </Stack>
    )
  }

  return (
    <Button w="100%" onClick={openModal}>
      Create Private Listing
    </Button>
  )
}
