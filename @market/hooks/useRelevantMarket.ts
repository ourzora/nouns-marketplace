import {
  AuctionLike,
  FIXED_SIDE_TYPES,
  FixedPriceLike,
  MARKET_TYPES,
  MarketModule,
} from '@zoralabs/nft-hooks/dist/types/NFTInterface'

function getLatestBlockNumber(a: MarketModule, b: MarketModule) {
  return a.createdAt.blockNumber &&
    b.createdAt.blockNumber &&
    a.createdAt.blockNumber > b.createdAt.blockNumber
    ? -1
    : 1
}

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
  const auctions: AuctionLike[] = markets.filter(isAuctionLike).sort(getLatestBlockNumber) // @BJ / @Dain: question --> is the latest block number always desired
  const asks: FixedPriceLike[] = markets.filter(isAskLike).sort(getLatestBlockNumber)
  const offers: FixedPriceLike[] = markets.filter(isOfferLike).sort(getLatestBlockNumber) // <-- *all* active offers should be relevant

  const ask = asks[0]
  const auction = auctions[0]
  const offer = offers[0]

  return { offer, ask, auction, auctions }
}
