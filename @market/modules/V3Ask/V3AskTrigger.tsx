import React from 'react'

import { useRelevantMarket } from '@market/hooks'
import { useIsOwner } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'

import { V3AskBuyerTrigger } from './V3AskBuyerTrigger'
import { V3AskOwnerTrigger } from './V3AskOwnerTrigger'

interface V3AskTriggerProps {
  nft: NFTObject
  openModal: () => void
}

export function V3AskTrigger({ nft, openModal }: V3AskTriggerProps) {
  const { isOwner } = useIsOwner(nft)
  const { ask } = useRelevantMarket(nft.markets)

  if (isOwner) {
    return <V3AskOwnerTrigger nft={nft} openModal={openModal} />
  }

  if (ask) {
    return <V3AskBuyerTrigger nft={nft} openModal={openModal} />
  }

  return null
}
