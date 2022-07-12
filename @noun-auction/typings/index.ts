export type FetchDataTypes = {
  loading?: boolean
  error?: boolean
  errorMsg?: any
}

export type SharedDataRendererProps = {
  label?: string
  layoutDirection?: 'column' | 'row'
}

export type NounAuctionHistoryProps = {
  tokenId: string
  contractAddress: string
  marketType: 'NOUN_AUCTION'
}

export enum NounEventTypes {
  NOUNS_AUCTION_EVENT = 'NOUNS_AUCTION_EVENT',
}
