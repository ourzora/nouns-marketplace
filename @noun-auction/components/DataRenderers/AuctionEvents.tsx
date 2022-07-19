import { useMemo } from 'react'
import { NounsAuctionEventTypes } from '@noun-auction/typings'
import { useNounishAuctionProvider } from '@noun-auction/providers'

export type AuctionEventsProps = {
  auctionEvent: string
  bidRenderer?: JSX.Element
  createdRenderer?: JSX.Element
  extendedRenderer?: JSX.Element
  settledRenderer?: JSX.Element
}

export function AuctionEvents({
  auctionEvent,
  bidRenderer = <div>{`Bid Placed`}</div>,
  createdRenderer = <div>{`Auction Created`}</div>,
  extendedRenderer = <div>{`Auction Extended`}</div>,
  settledRenderer = <div>{`Auction Settled`}</div>,
}: AuctionEventsProps) {
  const {
    daoConfig: { classifierPrefix },
  } = useNounishAuctionProvider()

  const addTypePrefix = (type: NounsAuctionEventTypes) =>
    classifierPrefix !== null ? `${classifierPrefix?.typePrefix}${type}` : type

  const eventRenderer = useMemo(() => {
    switch (auctionEvent) {
      case addTypePrefix(NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT):
        return bidRenderer
      case addTypePrefix(
        NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT
      ):
        return createdRenderer
      case addTypePrefix(
        NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT
      ):
        return extendedRenderer
      case addTypePrefix(
        NounsAuctionEventTypes.NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT
      ):
        return settledRenderer
      default:
        return null
    }
  }, [auctionEvent])

  return <>{eventRenderer}</>
}
