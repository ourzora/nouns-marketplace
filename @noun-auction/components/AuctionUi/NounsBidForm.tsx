import React from 'react'

import { auctionWrapperVariants, useNounishAuctionQuery } from '@noun-auction'
import {
  LIL_NOUNS_AUCTION_ADDRESS,
  NOUNS_AUCTION_ADDRESS,
} from '@noun-auction/constants/nounish-markets'
import { BoxProps } from '@zord'

import { BuilderNounsBidForm } from './BuilderNounsBidForm'
import { OGNounsBidForm } from './OGNounsBidForm'

export const isOGNounAddress = (a: string) => {
  return a === NOUNS_AUCTION_ADDRESS || a === LIL_NOUNS_AUCTION_ADDRESS
}
export interface NounsBidFormProps extends BoxProps {
  onConfirmation?: (txHash: string, amount: string, currencyAddress: string) => void
  layout: keyof typeof auctionWrapperVariants['layout']
  collectionAddress: string
}

/**
 * Original Nouns/Lil Nouns and 'builder nouns' use different contract abis
 * so in order to place bid we need to use components that wrap actual bidding form component
 *
 * Both <OGNounsBidForm /> and <BuilderNounsBidForm /> return same <NounsBidFormComponent />
 */

export function NounsBidForm({ collectionAddress, ...props }: NounsBidFormProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  if (!activeAuction) return null

  if (isOGNounAddress(activeAuction.address)) {
    return <OGNounsBidForm activeAuction={activeAuction} {...props} />
  } else {
    return <BuilderNounsBidForm activeAuction={activeAuction} {...props} />
  }
}
