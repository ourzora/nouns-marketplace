import { returnMarketProps } from '@noun-auction/constants'
import { NounishMarketTypes } from '@noun-auction/typings'

export interface ContractMarketProps {
  marketType: NounishMarketTypes | string
  contractAddress: string
}

export interface NounAuctionQueryProps extends ContractMarketProps {
  tokenId?: string
}

export function nounAuctionQuery({
  contractAddress,
  tokenId,
  marketType,
}: NounAuctionQueryProps) {
  const marketProps = returnMarketProps(marketType as NounishMarketTypes)
  return `{
    markets(
      filter: {
        marketFilters: {
          marketType: ${marketProps?.type},
          statuses: ACTIVE
        }
      }, 
      sort: {
        sortKey: NONE,
        sortDirection: DESC
      },
      pagination: {
        limit: 1
      }) {
      nodes {
        market {
          status
          tokenId
          price {
            chainTokenPrice {
              decimal
              raw
            }
          }
          properties {
            ... on ${marketProps?.propertyType} {
              firstBidTime
              highestBidder
              highestBidPrice {
                chainTokenPrice {
                  decimal
                  raw
                }
                usdcPrice {
                  decimal
                }
              }
              duration
              endTime
              auctionId
              reservePrice {
                nativePrice {
                  decimal
                }
                usdcPrice {
                  decimal
                }
              }
              startTime
              winner
              estimatedDurationTime
              amount {
                chainTokenPrice {
                  decimal
                }
                usdcPrice {
                  decimal
                }
              }
            }
          }
          collectionAddress
          marketAddress
          marketType
          transactionInfo {
            transactionHash
            blockNumber
            blockTimestamp
          }
        }
      }
    }
    token(token: 
      {
        address: "${contractAddress}",
        tokenId: "${tokenId}",
      },
      network: {chain: MAINNET}
    ) {
      markets {
        marketType
        status
        tokenId
      }
      token {
        owner
        mintInfo {
          originatorAddress
          toAddress
        }
      }
    }
    events(
      filter: {
        eventTypes: ${marketProps?.event}
      }, 
      where: {
        tokens: {
          tokenId: "${tokenId}",
          address: "${contractAddress}"
        }
      }, 
      sort: {
        sortKey: CREATED,
        sortDirection: DESC
      }, 
      pagination: {
        limit:500
      }
    ) {
      nodes {
        eventType
        collectionAddress
        properties {
          ... on ${marketProps?.eventNodes?.properties} {
            ${marketProps?.eventNodes?.propertiesType}
            properties {
              ... on ${marketProps?.eventNodes?.bidProperties} {
                sender
                value
                ${marketProps?.eventNodes?.eventPropertiesId}
                extended
              }
            }
          }
        }
        tokenId
        transactionInfo {
          transactionHash
          blockNumber
          blockTimestamp
        }
      }
    }
  }`
}
