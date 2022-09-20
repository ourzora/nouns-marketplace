import {
  CANCEL,
  UPDATE,
  APPROVE_MODULE_FOR_FILL,
  useFormattedPrivateAskInfo,
  usePrivateAskStateContext,
  APPROVE_TRANSFER,
  CANCEL_SUCCESS,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  FILLASK_SUCCESS,
  CANCEL_ASK,
} from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import React from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import { useIsOwner } from '@shared'
import { PrivateAskOwnerTrigger } from './PrivateAskOwnerTrigger'
import { PrivateAskBuyerTrigger } from './PrivateAskBuyerTrigger'

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

  return null
}
