import { formatUnits } from 'ethers/lib/utils'

import { useMemo } from 'react'

import { first } from 'lodash'

import { LilNounsAuctionEventTypes, NounsAuctionEventTypes } from '@noun-auction'

import { useIsAuctionSettled } from './useIsAuctionSettled'

// FIXME
function getLatestBlockNumberForEvent(a: any, b: any) {
  return a.transactionInfo.blockNumber &&
    b.transactionInfo.blockNumber &&
    a.transactionInfo.blockNumber > b.transactionInfo.blockNumber
    ? -1
    : 1
}

type Props = {
  collectionAddress: string
}

export const usePrimarySalePrice = ({ collectionAddress }: Props) => {
  // FIXME: use contractAddress to get market type and events
  const marketType = 'NOUNS_AUCTION'
  const events = { nodes: [] }

  const isSettled = useIsAuctionSettled({ marketType, events })
  // const noAuctionHistory = events?.nodes.length === 0

  const bidEventType =
    marketType === 'NOUNS_AUCTION'
      ? NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT
      : LilNounsAuctionEventTypes.LIL_NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT

  // FIXME: any
  const bidEvents: any[] = events?.nodes
    .filter((event: any) =>
      marketType === 'NOUNS_AUCTION'
        ? event.properties.nounsAuctionEventType === bidEventType
        : event.properties.lilNounsAuctionEventType === bidEventType
    )
    .sort(getLatestBlockNumberForEvent)

  const primarySalePrice = useMemo(
    () =>
      isSettled && Array.isArray(bidEvents)
        ? formatUnits(first(bidEvents).properties.properties.value, 18)
        : '0',
    [bidEvents, isSettled]
  )

  const hasPrimarySalePrice = primarySalePrice !== '0'

  return { primarySalePrice, hasPrimarySalePrice }
}
