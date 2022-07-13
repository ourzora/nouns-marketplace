/**
 * Ideally there would be a simple pattern for naming convention of these market types - as more are added.
 */

export type NounishMarketTypes = 'NOUNS_AUCTION' | 'LIL_NOUNS_AUCTION'

export type NounishMarketTypesProps = {
  type: NounishMarketTypes
  propertyType: string
  event: string
  eventNodes: {
    properties: string
    propertiesType: string
    eventPropertiesId: string
    bidProperties: string
  }
}

export const nounishMarketTypesLookup: NounishMarketTypesProps[] = [
  {
    type: 'NOUNS_AUCTION',
    propertyType: 'NounsAuction',
    event: 'NOUNS_AUCTION_EVENT',
    eventNodes: {
      properties: 'NounsAuctionEvent',
      propertiesType: 'nounsAuctionEventType',
      eventPropertiesId: 'nounId',
      bidProperties: 'NounsAuctionBidEventProperties',
    },
  },
  {
    type: 'LIL_NOUNS_AUCTION',
    propertyType: 'LilNounsAuction',
    event: 'LIL_NOUNS_AUCTION_EVENT',
    eventNodes: {
      properties: 'LilNounsAuctionEvent',
      propertiesType: 'lilNounsAuctionEventType',
      eventPropertiesId: 'lilNounId',
      bidProperties: 'LilNounsAuctionBidEventProperties',
    },
  },
]

export function returnMarketProps(marketType: NounishMarketTypes) {
  return nounishMarketTypesLookup.find((market) => market.type === marketType)
}

export const defaultMarketTypes = returnMarketProps('NOUNS_AUCTION')
