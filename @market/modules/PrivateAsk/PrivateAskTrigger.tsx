import { NFTObject } from '@zoralabs/nft-hooks'
import React from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import { useIsOwner } from '@shared'
import { PrivateAskOwnerTrigger } from './PrivateAskOwnerTrigger'
import { PrivateAskBuyerTrigger } from './PrivateAskBuyerTrigger'
import { PrivateAskVisitorTrigger } from './PrivateAskVisitorTrigger'

interface PrivateAskTriggerProps {
  nft: NFTObject
  openModal: () => void
}

export function PrivateAskTrigger({ nft, openModal }: PrivateAskTriggerProps) {
  const { ask } = useRelevantMarket(nft.markets)
  const { isValidPrivateAskBuyer } = useAskHelper({ ask })
  const { isOwner } = useIsOwner(nft)

  if (isOwner) {
    return <PrivateAskOwnerTrigger nft={nft} openModal={openModal} />
  }

  if (isValidPrivateAskBuyer) {
    return <PrivateAskBuyerTrigger nft={nft} openModal={openModal} />
  }

  return <PrivateAskVisitorTrigger nft={nft} openModal={openModal} />
}
