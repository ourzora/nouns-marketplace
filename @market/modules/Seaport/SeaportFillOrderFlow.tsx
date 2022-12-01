import React, { useState } from 'react'

import { CommonSeaportFillOrderProps } from '../common'
import { SeaportFillOrder } from './SeaportFillOrder'
import { SeaportFillOrderSuccess } from './SeaportFillOrderSuccess'

export function SeaportFillOrderFlow({
  order,
  nft,
  userAddress,
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
