import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useToken } from 'hooks/useToken'

import React, { useState } from 'react'

import { StackProps } from '@zoralabs/zord'

import { SeaportFillOrder } from './SeaportFillOrder'
import { SeaportFillOrderSuccess } from './SeaportFillOrderSuccess'

export interface CommonSeaportFillOrderProps extends StackProps {
  order: OffchainOrderWithToken
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: ReturnType<typeof useToken>['markets']
  userAddress?: string
}

export function SeaportFillOrderFlow({
  order,
  tokenId,
  contractAddress,
  collectionName,
  markets,
  userAddress,
  ...props
}: CommonSeaportFillOrderProps) {
  const [isFilled, setIsFilled] = useState<boolean>(false)

  return !isFilled ? (
    <SeaportFillOrder
      tokenId={tokenId}
      contractAddress={contractAddress}
      collectionName={collectionName}
      markets={markets}
      order={order}
      userAddress={userAddress}
      setIsFilled={setIsFilled}
    />
  ) : (
    <SeaportFillOrderSuccess
      userAddress={userAddress}
      order={order}
      tokenId={tokenId}
      contractAddress={contractAddress}
      collectionName={collectionName}
      markets={markets}
    />
  )
}
