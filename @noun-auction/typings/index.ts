import { FlexProps } from '@zoralabs/zord'

export interface SharedDataRendererProps extends FlexProps {
  label?: string | boolean
  layoutDirection?: 'column' | 'row'
  showLabels?: boolean
}

export type ClassifierPrefixProps = {
  keyPrefix: string
  typePrefix: string
} | null

export type NounishMarketTypes = 'NOUNS_AUCTION' | 'LIL_NOUNS_AUCTION'

export enum NounsAuctionEventTypes {
  NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT',
  NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT',
  NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT',
  NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT',
  /* */
  NOUNS_AUCTION_HOUSE_AUCTION_TIME_BUFFER_UPDATED_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_TIME_BUFFER_UPDATED_EVENT',
  NOUNS_AUCTION_HOUSE_AUCTION_RESERVE_PRICE_UPDATED_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_RESERVE_PRICE_UPDATED_EVENT',
  NOUNS_AUCTION_HOUSE_AUCTION_MIN_BID_INCREMENT_PERCENTAGE_UPDATED = 'NOUNS_AUCTION_HOUSE_AUCTION_MIN_BID_INCREMENT_PERCENTAGE_UPDATED',
}

export type DaoConfigProps = {
  name: string
  contractAddress: string
  auctionContractAddress: string
  marketType: NounishMarketTypes
  classifierPrefix: ClassifierPrefixProps
  abi: any
}

export type TokenPrice = {
  decimal: number
  raw: string
}

export type ActiveNounishAuctionResponse =
  | {
      /**
       * Nounish NFT address
       */
      collectionAddress: string
      /**
       * Nounish Auction Contract Address
       */
      marketAddress: string
      /**
       * Zora API Market Type Classifier
       */
      marketType: 'ACTIVE_LIL_NOUNS_AUCTION' | 'ACTIVE_NOUNS_AUCTION'
      properties: {
        /**
         * ID of Token/NFT up for auction
         */
        tokenId: string
        /**
         * Unix TimeStamp
         */
        startTime: string
        /**
         * Unix TimeStamp
         */
        endTime: string
        /**
         * null - should be numerical string
         */
        minBidIncrementPercentage: number
        /**
         * ETH Wallet Address
         */
        highestBidder: string | null
        /**
         * ETH Wallet Address
         */
        winner: string | null
        highestBidPrice: {
          chainTokenPrice: TokenPrice | null
          usdcPrice: TokenPrice | null
        }
        reservePrice: {
          chainTokenPrice: TokenPrice | null
          usdcPrice: TokenPrice | null
        }
      }
    }
  | undefined
