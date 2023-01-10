import React from 'react'

import {
  APPROVE_MODULE_FOR_CREATE_PRIVATEASK,
  APPROVE_MODULE_FOR_CREATE_V3ASK,
  V3AskFlow,
  useV3AskStateContext,
} from '@market/modules/V3Ask'
import { SaleTypeButton } from '@market/modules/V3Ask/SaleTypeButton'
import { V3AskLearnMoreButton } from '@market/modules/V3Ask/V3AskLearnMoreButton'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Heading, Stack } from '@zord'

interface SelectListFlowProps {
  closeModal?: () => void
  nftObj: NFTObject
}

export function SelectListFlow({ nftObj, closeModal, ...props }: SelectListFlowProps) {
  const { state, dispatch } = useV3AskStateContext()
  const { nft } = nftObj
  const { flow } = state

  if (!nft) {
    return null
  }

  if (!flow) {
    return (
      <Stack gap="x5" {...props}>
        <Stack gap="x6">
          <Heading size="md">Sale type</Heading>
          <Stack gap="x4">
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
        </Stack>

        <V3AskLearnMoreButton />
      </Stack>
    )
  }

  return <V3AskFlow nft={nftObj} />
}
