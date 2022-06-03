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
  return value.type === MARKET_TYPES.FIXED_PRICE && value.side === FIXED_SIDE_TYPES.ASK
}
function isOfferLike(value: MarketModule): value is FixedPriceLike {
  return value.type === MARKET_TYPES.FIXED_PRICE && value.side === FIXED_SIDE_TYPES.OFFER
}

export const useRelevantMarket = (markets: readonly MarketModule[] = []) => {
  const auctions: AuctionLike[] = markets.filter(isAuctionLike)
  const asks: FixedPriceLike[] = markets.filter(isAskLike)
  const offers: FixedPriceLike[] = markets.filter(isOfferLike)

  const ask = asks[0]
  const auction = auctions[0]
  const offer = offers[0] //

  return { offer, ask, auction, auctions }
}
