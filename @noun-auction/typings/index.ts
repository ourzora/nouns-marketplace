import { FlexProps } from '@zoralabs/zord'

export type FetchDataTypes = {
  loading?: boolean
  error?: boolean
  errorMsg?: any
}

export interface SharedDataRendererProps extends FlexProps {
  label?: string | boolean
  layoutDirection?: 'column' | 'row'
  showLabels?: boolean
}

export type NounAuctionHistoryProps = {
  tokenId: string
  contractAddress: string
  marketType: 'NOUN_AUCTION'
}

export enum NounEventTypes {
  NOUNS_AUCTION_EVENT = 'NOUNS_AUCTION_EVENT',
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

export enum NounishAuctionEventTypes {
  LIL_NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT',
  LIL_NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT',
  LIL_NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT',
  LIL_NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT',
  LIL_NOUNS_AUCTION_HOUSE_AUCTION_TIME_BUFFER_UPDATED_EVENT = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_TIME_BUFFER_UPDATED_EVENT',
  LIL_NOUNS_AUCTION_HOUSE_AUCTION_RESERVE_PRICE_UPDATED_EVENT = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_RESERVE_PRICE_UPDATED_EVENT',
  LIL_NOUNS_AUCTION_HOUSE_AUCTION_MIN_BID_INCREMENT_PERCENTAGE_UPDATED = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_MIN_BID_INCREMENT_PERCENTAGE_UPDATED',
  NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT',
  NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT',
  NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT',
  NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT = 'NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT',
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

export type ContractAuctionData = {
  auction:
    | {
        nounId: string
        amount: string
        startTime: string
        endTime: string
        bidder: string
        settled: boolean
      }
    | undefined
}

export type NormalizedAuctionData = {
  countdown: {
    startTime: string
    endTime: string
  }
  highBid: {
    ethValue: string
    usdcValue: string
  }
  bidder: {
    address: string
    txHash: string
  }
  rpcData: ContractAuctionData
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
         * Auction ID = Token ID
         */
        auctionId: string
        /**
         * ID of Token/NFT up for auction
         */
        tokenId: string
        /**
         * Currency used for AUCTION. Curreny ETH (0 Address)
         */
        auctionCurrency: string
        /**
         * Unix TimeStamp
         */
        startTime: string
        /**
         * Unix TimeStamp
         */
        endTime: string
        /**
         * Numerical String
         */
        duration: string
        /**
         * Date object: 2022-08-15T17:33:54+00:00
         */
        estimatedDurationTime: string
        /**
         * Date object: 2022-08-15T17:33:54+00:00
         */
        firstBidTime: string
        /**
         * null - should be numerical string
         */
        minBidIncrementPercentage: null
        /**
         * null?
         */
        timeBuffer: null
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
      }
    }
  | undefined
