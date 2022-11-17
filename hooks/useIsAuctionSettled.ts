import { useMemo } from 'react'

import {
  LilNounsAuctionEventTypes,
  NounishMarketTypes,
  NounsAuctionEventTypes,
} from '@noun-auction'

type Props = {
  marketType: NounishMarketTypes
  events: any // FIXME
}

export const useIsAuctionSettled = ({ marketType, events }: Props) => {
  const isSettled = useMemo(() => {
    if (events?.nodes.length === 0) return false

    const settledAuctionEventType =
      marketType === 'NOUNS_AUCTION'
        ? NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT
        : LilNounsAuctionEventTypes.LIL_NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT

    const settledEvents = events?.nodes.filter((event: any) =>
      marketType === 'NOUNS_AUCTION'
        ? event.properties.nounsAuctionEventType === settledAuctionEventType
        : event.properties.lilNounsAuctionEventType === settledAuctionEventType
    )

    return !!settledEvents?.length
  }, [events?.nodes, marketType])

  return isSettled
}
