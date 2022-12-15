import { useToken } from 'hooks/useToken'

import React from 'react'
import { TypeSafeMarket } from 'validators/market'

import { useRelevantMarket } from '@market/hooks'
import { useNftMarketContext } from '@media/NFTCard2'

import { V3AskBuyerTrigger } from './V3AskBuyerTrigger'
import { V3AskOwnerTrigger } from './V3AskOwnerTrigger'

interface V3AskTriggerProps {
  openModal: () => void
  modalName: string
  isOwner: boolean
}

export function V3AskTrigger({ isOwner, openModal }: V3AskTriggerProps) {
  const { markets } = useNftMarketContext()
  const { ask } = useRelevantMarket(markets)

  if (isOwner) {
    return <V3AskOwnerTrigger openModal={openModal} />
  }

  if (ask) {
    return <V3AskBuyerTrigger markets={markets} openModal={openModal} />
  }

  return null
}
