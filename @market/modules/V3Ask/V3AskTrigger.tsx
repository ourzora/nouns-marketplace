import React from 'react'

import { useRelevantMarket } from '@market/hooks'
import { useNftMarketContext } from '@market/providers/NftMarketContextProvider'

import { V3AskBuyerTrigger } from './V3AskBuyerTrigger'
import { V3AskOwnerTrigger } from './V3AskOwnerTrigger'

interface V3AskTriggerProps {
  openModal: () => void
  modalName: string
  isOwner: boolean
  showOnlyTrigger: boolean
}

export function V3AskTrigger({ isOwner, openModal, showOnlyTrigger }: V3AskTriggerProps) {
  const { markets } = useNftMarketContext()
  const { ask } = useRelevantMarket(markets)

  if (isOwner) {
    return <V3AskOwnerTrigger showOnlyTrigger={showOnlyTrigger} openModal={openModal} />
  }

  if (ask) {
    return <V3AskBuyerTrigger markets={markets} openModal={openModal} />
  }

  return null
}
