# Nounish Auction Component & Provider

Easily add UI to interact with Noun & LilNoun live auctions. Configuration via component props allows you to display various auction related UI including placing a bid, settling a completed auction & displaying auction history for a given token.

Currently we are using a proxy route in the next.js application to poll the token's associated auction contract. This will soon be deprecated in favor of using the [Zora API](https://api.zora.co/) for this realtime data.

We also want to open this up to accept all NounsDao style contracts. As of now the below functionality is coupled to Nouns & LilNouns.

[Click here](https://noun.market/docs/nounish-auction-component) see the component with various config options in action.

---

# Usage:

First off the only required prop is the `daoConfig` object, we need to know the NFT contract address, and the auction contract address along with the Zora API market type and the auction contract abi:

### DaoConfig Prop:

> Nouns

```tsx
{
  name: 'Nouns',
  contractAddress: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
  auctionContractAddress: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
  marketType: 'NOUNS_AUCTION',
  classifierPrefix: null,
  abi: nounsAbi,
}
```

> LilNouns

Relatively simple for Nouns, Lil Nouns has its own classifier in the Zora API and so we need to indicate that in the config object's `marketType` & `classifierPrefix` keys:

```tsx
{
  name: 'LilNoun',
  contractAddress: '0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B',
  auctionContractAddress: '0x55e0F7A3bB39a28Bd7Bcc458e04b3cF00Ad3219E',
  marketType: 'LIL_NOUNS_AUCTION',
  classifierPrefix: {
    keyPrefix: 'lil',
    typePrefix: 'LIL_',
  },
  abi: lilNounsAbi,
}
```

---

# Rendering Auctions:

> To render a live auction, add this component to your layout:

```tsx
import { NounishAuction } from '@noun-auction'
...
<NounishAuction daoConfig={dao} />
```

> To render auction history of a specific token:

```tsx
<NounishAuction
  daoConfig={dao}
  showAuctionRow={false} \* We don't want to show the live auction *\
  tokenId={tokenId} \* let's pass in a dynamic tokenId *\
  showBidHistory
  layout="historyOnly" \* Spec the CSS variant for the desired layout *\
/>
```

---

# Auction / Token Data:

> To access the auction / token data via React's provider + hook pattern:

```
import { NounishAuctionProvider } from '@noun-auction'
/**
* Current live auction
*/
<NounishAuctionProvider daoConfig={dao}>
  <ChildComponent />
</NounishAuctionProvider>
```

> For a specific token pass in a tokenId (expects a string):

```
<NounishAuctionProvider daoConfig={dao} tokenId='200'>
  <ChildComponent />
</NounishAuctionProvider>
```

> Usage in child component, let's check for the active auction tokenId for LilNouns:

```
import { useNounishAuctionProvider } from '@noun-auction'

const { activeAuctionId  } = useNounishAuctionProvider()

<div>HEY!!! LilNoun #{activeAuctionId} is up for auction</div>
```

> FUN TIP 🎨:  
> Because we are using `@zoralabs/zord` you can add additional styles to the wrapper component via atom props:

```
<NounishAuction
  key={dao.contractAddress}
  daoConfig={dao}
  debug
  showBidHistory
  showLabels
  layout="withHistory"
  /* Example of additional wrapper styling with Zord atom props */
  borderColor="secondary"
  borderStyle="solid"
  borderWidth="normal"
  borderRadius="phat"
  backgroundColor="primary"
  p="x4"
/>
```

---

# Props:

```
  daoConfig: DaoConfigProps
  tokenId?: string

  /* Layout element configuration */
  hideThumbnail?: boolean
  hideTitle?: boolean
  hideCollectionTitle?: boolean
  thumbnailSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | '100%' | undefined
  showAuctionRow?: boolean
  showBidHistory?: boolean
  useInlineBid?: boolean
  debug?: boolean
  useErrorMsg?: boolean
  showTopBid?: boolean
  showLabels?: boolean
  routePrefix?: string

  /* Theming */
  layout?: keyof typeof auctionWrapperVariants['layout']
```

---

# Queries:

> Full Active Auction Query:

```
query ActiveNounsAuctionQuery {
  market(where: {marketType: ACTIVE_NOUNS_AUCTION}) {
    collectionAddress
    marketAddress
    marketType
    properties {
      ... on NounsAuction {
        auctionId
        tokenId
        auctionCurrency
        startTime
        endTime
        duration
        estimatedDurationTime
        firstBidTime
        minBidIncrementPercentage
        timeBuffer
        highestBidder
        winner
        highestBidPrice {
          chainTokenPrice {
            decimal
            raw
            currency {
              address
              decimals
              name
            }
          }
          usdcPrice {
            decimal
            raw
            currency {
              address
              decimals
              name
            }
          }
          blockNumber
          nativePrice {
            currency {
              address
              decimals
              name
            }
            decimal
            raw
          }
        }
        collectionAddress
        address
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
        reservePrice {
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
      }
    }
  }
}
```
