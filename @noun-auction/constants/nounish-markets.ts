/**
 * Ideally there would be a simple pattern for naming convention of these market types - as more are added.
 */
import { NounishMarketTypes, DaoConfigProps } from '@noun-auction/typings'
import { nounsAbi } from '@noun-auction/contracts'

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

export const defaultDaoConfig: DaoConfigProps = {
  name: 'Nouns',
  contractAddress: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
  auctionContractAddress: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
  marketType: 'NOUNS_AUCTION',
  classifierPrefix: null,
  abi: nounsAbi,
}
