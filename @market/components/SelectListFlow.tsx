import React from 'react'
import { TypeSafeMarket } from 'validators/market'

import {
  APPROVE_MODULE_FOR_CREATE_PRIVATEASK,
  APPROVE_MODULE_FOR_CREATE_V3ASK,
  V3AskFlow,
  useV3AskStateContext,
} from '@market/modules/V3Ask'
import { SaleTypeButton } from '@market/modules/V3Ask/SaleTypeButton'
import { V3AskLearnMoreButton } from '@market/modules/V3Ask/V3AskLearnMoreButton'
import { useNftMarketContext } from '@market/providers/NftMarketContextProvider'
import { Eyebrow, Stack } from '@zoralabs/zord'

interface SelectListFlowProps {
  closeModal?: () => void
}

export function SelectListFlow({ closeModal, ...props }: SelectListFlowProps) {
  const { state, dispatch } = useV3AskStateContext()
  const { flow } = state

  if (!flow) {
    return (
      <Stack gap="x5" {...props}>
        <Stack gap="x2">
          <Eyebrow>Sale type</Eyebrow>

          <SaleTypeButton
            label="Fixed Price"
            description="Sell for a fixed price. Anyone can buy the NFT."
            onNext={() => dispatch({ type: APPROVE_MODULE_FOR_CREATE_V3ASK })}
          />
          <SaleTypeButton
            label="Private Listing"
            description="Sell to a specific buyer address, safely and securely."
            tag="New"
            onNext={() => dispatch({ type: APPROVE_MODULE_FOR_CREATE_PRIVATEASK })}
          />
        </Stack>

        <V3AskLearnMoreButton />
      </Stack>
    )
  }

  return <V3AskFlow />
}
