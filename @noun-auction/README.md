# Noun Auction Components

Componentry, provider, hooks designed for interaction and display of nounish auction activity.

## Dao Config Object:

```
  export const daos: DaoConfigProps[] = [
    {
      name: 'Nouns',
      contractAddress: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
      auctionContractAddress: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
      marketType: 'NOUNS_AUCTION',
      classifierPrefix: null,
      abi: nounsAbi,
    },
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
    },
  ]

  # NOTE the classifier prefix on LilNoun - zora's api prefixes the auction type for the specific aution contract.
```

### Props:

```
  hideThumbnail?: boolean
  hideTitle?: boolean
  hideCollectionTitle?: boolean
  thumbnailSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | '100%' | undefined
  routePrefix?: string

  showAuctionRow?: boolean
  showBidHistory?: boolean
  useInlineBid?: boolean
  debug?: boolean
  useErrorMsg?: boolean
  showTopBid?: boolean
  showLabels?: boolean

  daoConfig: DaoConfigProps
  tokenId?: string
  /* Theming */
  layout?: keyof typeof auctionWrapperVariants['layout']
```

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
