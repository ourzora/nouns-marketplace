import { OffchainOrderWithToken } from 'types/zora.api.generated'

import React, { useState } from 'react'

import { StackProps } from '@zoralabs/zord'

import { SeaportFillOrder } from './SeaportFillOrder'
import { SeaportFillOrderSuccess } from './SeaportFillOrderSuccess'

export interface CommonSeaportFillOrderProps extends StackProps {
  order: OffchainOrderWithToken
  userAddress?: string
}

export function SeaportFillOrderFlow({
  order,
  userAddress,
}: CommonSeaportFillOrderProps) {
  const [isFilled, setIsFilled] = useState<boolean>(false)

  return !isFilled ? (
    <SeaportFillOrder order={order} userAddress={userAddress} setIsFilled={setIsFilled} />
  ) : (
    <SeaportFillOrderSuccess userAddress={userAddress} order={order} />
  )
}
