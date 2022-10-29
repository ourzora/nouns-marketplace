import React, { useState } from 'react'

import { NFTObject } from '@zoralabs/nft-hooks'
import { StackProps } from '@zoralabs/zord'

import { SeaportFillOrder } from './SeaportFillOrder'
import { SeaportFillOrderSuccess } from './SeaportFillOrderSuccess'

export interface CommonSeaportFillOrderProps extends StackProps {
  order: any
  nft: NFTObject
  userAddress?: string
}

export function SeaportFillOrderFlow({
  order,
  nft,
  userAddress,
  ...props
}: CommonSeaportFillOrderProps) {
  const [isFilled, setIsFilled] = useState<boolean>(false)

  return !isFilled ? (
    <SeaportFillOrder
      nft={nft}
      order={order}
      userAddress={userAddress}
      setIsFilled={setIsFilled}
    />
  ) : (
    <SeaportFillOrderSuccess userAddress={userAddress} order={order} nft={nft} />
  )
}
