import { Button } from 'components/Button'

import React, { useState } from 'react'

import {
  APPROVE_MODULE_FOR_CREATE_PRIVATEASK,
  APPROVE_MODULE_FOR_CREATE_V3ASK, // PRIVATE_ASK_LISTING,
  V3AskFlow, // V3_ASK_LISTING,
  useV3AskStateContext,
} from '@market/modules/V3Ask'
import { SaleTypeButton } from '@market/modules/V3Ask/SaleTypeButton'
// import { PrivateAskFlow } from '@market/modules/PrivateAsk/PrivateAskFlow'
import { V3AskLearnMoreButton } from '@market/modules/V3Ask/V3AskLearnMoreButton'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Eyebrow, Stack } from '@zoralabs/zord'

// import { ListV3AskWizard } from './ListV3AskWizard'

// export const V3_ASK_LISTING: string = 'V3Ask'
// export const PRIVATE_ASK_LISTING: string = 'PrivateAsk'

// export type ListForSaleFlow = typeof V3_ASK_LISTING | typeof PRIVATE_ASK_LISTING

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
        <Stack gap="x2">
          <Eyebrow>Sale type</Eyebrow>

          <SaleTypeButton
            label="Fixed Price"
            description="Sell for a fixed price. Anyone can buy the NFT."
            // tag="New"
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

  return <V3AskFlow nft={nftObj} />

  // return flow === V3_ASK_LISTING ? (
  //   <V3AskFlow nft={nftObj} />
  // ) : (
  //   <PrivateAskFlow nft={nftObj} />
  // )
}
// <ListV3AskWizard
//   tokenAddress={nft.contract.address}
//   tokenId={nft.tokenId}
//   onClose={closeModal}
//   previewURL={media?.poster?.uri}
//   cancelButton={
//     <Button onClick={closeModal} w="100%" variant="secondary">
//       Cancel
//     </Button>
//   }
// />
