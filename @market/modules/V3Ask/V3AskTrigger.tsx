import { useToken } from 'hooks/useToken'

import React from 'react'

import { useRelevantMarket } from '@market/hooks'

import { V3AskBuyerTrigger } from './V3AskBuyerTrigger'
import { V3AskOwnerTrigger } from './V3AskOwnerTrigger'

interface V3AskTriggerProps {
  openModal: () => void
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: ReturnType<typeof useToken>['markets']
  modalName: string
  isOwner: boolean
}

export function V3AskTrigger({
  contractAddress,
  tokenId,
  collectionName,
  markets,
  isOwner,
  openModal,
}: V3AskTriggerProps) {
  const { ask } = useRelevantMarket(markets)

  if (isOwner) {
    return (
      <V3AskOwnerTrigger
        tokenId={tokenId}
        contractAddress={contractAddress}
        collectionName={collectionName}
        markets={markets}
        openModal={openModal}
      />
    )
  }

  if (ask) {
    return <V3AskBuyerTrigger markets={markets} openModal={openModal} />
  }

  return null
}
