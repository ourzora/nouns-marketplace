/**
 * Ideally there would be a simple pattern for naming convention of these market types - as more are added.
 */
import { nounsAbi } from '@noun-auction/contracts'
import { DaoConfigProps, NounishMarketTypes } from '@noun-auction/typings'

export type NounishMarketTypesProps = {
  type: NounishMarketTypes
  propertyType: string
  event: string
  activeAuctionType: string
  eventNodes: {
    properties: string
    propertiesType: string
    eventPropertiesId: string
    bidProperties: string
    auctionProperties: string
  }
}

export const nounishMarketTypesLookup: NounishMarketTypesProps[] = [
  {
    type: 'NOUNS_AUCTION',
    propertyType: 'NounsAuction',
    event: 'NOUNS_AUCTION_EVENT',
    activeAuctionType: 'ACTIVE_NOUNS_AUCTION',
    eventNodes: {
      properties: 'NounsAuctionEvent',
      propertiesType: 'nounsAuctionEventType',
      eventPropertiesId: 'nounId',
      bidProperties: 'NounsAuctionBidEventProperties',
      auctionProperties: 'NounsAuction',
    },
  },
  {
    type: 'LIL_NOUNS_AUCTION',
    propertyType: 'LilNounsAuction',
    event: 'LIL_NOUNS_AUCTION_EVENT',
    activeAuctionType: 'ACTIVE_LIL_NOUNS_AUCTION',
    eventNodes: {
      properties: 'LilNounsAuctionEvent',
      propertiesType: 'lilNounsAuctionEventType',
      eventPropertiesId: 'lilNounId',
      bidProperties: 'LilNounsAuctionBidEventProperties',
      auctionProperties: 'LilNounsAuction',
    },
  },
]

export function returnMarketProps(marketType?: NounishMarketTypes) {
  return nounishMarketTypesLookup.find((market) => market.type === marketType)
}

export const NOUNS_AUCTION_ADDRESS = '0x830bd73e4184cef73443c15111a1df14e495c706'
export const LIL_NOUNS_AUCTION_ADDRESS = '0x55e0f7a3bb39a28bd7bcc458e04b3cf00ad3219e'

export const defaultMarketTypes = returnMarketProps('NOUNS_AUCTION')

export const createBidAbiFragment = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'nounId',
        type: 'uint256',
      },
    ],
    name: 'createBid',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
