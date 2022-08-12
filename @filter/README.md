# NFT Filter

Component suite designed to accomplish NFT display and filtering, using the [Zora API](https://api.zora.co/) for NFT & collection data. The layout includes a sidebar with a variety of filtering options which you can expose via props.

Leverages [SWR](https://swr.vercel.app/) under the hood for data fetching.
[Zora ZDK](https://zdk.zora.co/) for requests, check the [repo](https://github.com/ourzora/zdk) for return types.

---

# Usage:

> Wrap the composition with the CollectionFilterProvider

```
import { CollectionFilterProvider } from '@filter'

<CollectionFilterProvider contractAddress={contractAddress}>
  <Collection />
</CollectionFilterProvider>

```

> Consume the Data in child components via the useCollectionFilters hook. Wrapped in the Filter Component which takes a component prop for rendering the array of NFTs fetched.

```
import { Filter, useCollectionFilters } from '@filter'

...

const {
  filterStore: { clearFilters },
  items,
  isValidating,
  isReachingEnd,
  handleLoadMore,
} = useCollectionFilters()

...

<Filter
  grid={
    <NFTGrid
      items={items}
      handleLoadMore={handleLoadMore}
      isReachingEnd={isReachingEnd}
      isValidating={isValidating}
    />
  }
/>
```

The `Filter` Component provides UI for filtering, but you don't need to use it. All of the functions and data are exposed via hooks. Items will return an array of NFTs in the shape defined [here](https://github.com/ourzora/nft-hooks/blob/main/src/types/NFTInterface.ts#L253-L315) in our nft-hooks library

> Reading and Interacting with the Filtered NFTS:

```
items, /* Array */
isValidating /* Boolean, swr fetch validation */
isReachingEnd /* Boolean, final items via pagination */
isEmpty /* Boolean - no nfts available */
handleLoadMore /* Move to next page index */
```

> Initial Filter Store State (parameters by which NFTs will be filtered by):

```
export const initialFilterState: FilterState = {
  marketStatus: null,
  ownerStatus: [],
  mediaType: null,
  sortMethod: 'newest',
  priceRange: null,
  tokenContracts: null,
  collectionAttributes: [],
}
```

> Functions and Data for the Filter Store

```
export const initialFilterStore: FilterStore = {
  filters: initialFilterState,
  /* Functions */
  toggleShowFilters: () => {},
  setMarketStatus: () => {},
  setOwnerStatus: () => {},
  setMediaType: () => {},
  setSortMethod: () => {},
  setPriceRange: () => {},
  priceRangeSelection: () => {},
  setTokenContracts: () => {},
  setCollectionAttributes: () => {},
  clearFilters: () => {},
  clearPriceRange: () => {},
  /* Additional Data */
  hasFilters: false,
  activeFilterCount: 1,
  showFilters: true,
  invalidPriceRange: false,
}
```
