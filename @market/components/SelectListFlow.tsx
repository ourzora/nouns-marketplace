import { Button } from 'components/Button'

import React, { useState } from 'react'

import { LearnMoreButton } from '@market/modules/PrivateAsk/LearnMoreButton'
import { PrivateAskFlow } from '@market/modules/PrivateAsk/PrivateAskFlow'
import { SaleTypeButton } from '@market/modules/PrivateAsk/SaleTypeButton'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Eyebrow, Stack } from '@zoralabs/zord'

import { ListV3AskWizard } from './ListV3AskWizard'

export const V3_ASK_LISTING: string = 'V3Ask'
export const PRIVATE_ASK_LISTING: string = 'PrivateAsk'

export type ListForSaleFlow = typeof V3_ASK_LISTING | typeof PRIVATE_ASK_LISTING

interface SelectListFlowProps {
  closeModal?: () => void
  nftObj: NFTObject
}

export function SelectListFlow({ nftObj, closeModal, ...props }: SelectListFlowProps) {
  const [flow, setFlow] = useState<ListForSaleFlow | null>(null)
  const { nft, media } = nftObj

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
            tag="New"
            onNext={() => setFlow(V3_ASK_LISTING)}
          />
          <SaleTypeButton
            label="Private Listing"
            description="Sell to a specific buyer address, safely and securely."
            tag="New"
            onNext={() => setFlow(PRIVATE_ASK_LISTING)}
          />
        </Stack>

        <LearnMoreButton />
      </Stack>
    )
  }

  return flow === V3_ASK_LISTING ? (
    <ListV3AskWizard
      tokenAddress={nft.contract.address}
      tokenId={nft.tokenId}
      onClose={closeModal}
      previewURL={media?.poster?.uri}
      cancelButton={
        <Button onClick={closeModal} w="100%" variant="secondary">
          Cancel
        </Button>
      }
    />
  ) : (
    <PrivateAskFlow nft={nftObj} />
  )
}
