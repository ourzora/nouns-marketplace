import React from 'react'

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

  if (isOwner) {
    return <V3AskOwnerTrigger nft={nft} openModal={openModal} />
  }

  return <V3AskBuyerTrigger nft={nft} openModal={openModal} />
}
