import gql from 'graphql-tag'

export const NOUNISH_AUCTIONS_QUERY = gql`
  query NounishAuctions($collectionAddress: String!, $network: NetworkInput) {
    nouns {
      nounsActiveMarket(
        where: { collectionAddress: $collectionAddress }
        network: $network
      ) {
        auction
        collectionAddress
        duration
        endTime
        estimatedDurationTime
        extended
        firstBidTime
        governor
        manager
        metadata
        minBidIncrementPercentage
        startTime
        status
        timeBuffer
        tokenId
        treasury
        winner
        address
        highestBidder
        amount {
          blockNumber
          chainTokenPrice {
            currency {
              address
              decimals
              name
            }
            decimal
            raw
          }
          nativePrice {
            currency {
              address
              decimals
              name
            }
            decimal
            raw
          }
          usdcPrice {
            currency {
              address
              decimals
              name
            }
            decimal
            raw
          }
        }
        highestBidPrice {
          blockNumber
          chainTokenPrice {
            currency {
              address
              decimals
              name
            }
            decimal
            raw
          }
          nativePrice {
            currency {
              address
              decimals
              name
            }
            decimal
            raw
          }
          usdcPrice {
            currency {
              address
              decimals
              name
            }
            decimal
            raw
          }
        }
        networkInfo {
          chain
          network
        }
        transactionInfo {
          blockNumber
          blockTimestamp
          logIndex
          transactionHash
        }
      }
    }
  }
`
