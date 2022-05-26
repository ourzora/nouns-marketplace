import {
  AuctionLike,
  FIXED_SIDE_TYPES,
  FixedPriceLike,
  MARKET_TYPES,
  MarketModule,
} from '@zoralabs/nft-hooks/dist/types/NFTInterface'

function isAuctionLike(value: MarketModule): value is AuctionLike {
  return value.type === MARKET_TYPES.AUCTION
}
function isAskLike(value: MarketModule): value is FixedPriceLike {
  return value.type === MARKET_TYPES.FIXED_PRICE && value.side === FIXED_SIDE_TYPES.OFFER
}
function isOfferLike(value: MarketModule): value is FixedPriceLike {
  return value.type === MARKET_TYPES.FIXED_PRICE && value.side === FIXED_SIDE_TYPES.OFFER
}

function isAsk(value: any): value is any {
  return value.marketType === 'V3_ASK'
}

export const useRelevantMarket = (markets: any[]) => {
  const auctions: AuctionLike[] = markets.filter(isAuctionLike)
  const asks: any = markets.filter(isAsk)
  const offers: FixedPriceLike[] = markets.filter(isOfferLike)

  const ask = asks[0]
  const auction = auctions[0]
  const offer = offers[0] //

  return { offer, ask, auction, auctions }
}
