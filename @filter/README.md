# Zora Collection Filter Composition

Filter NFTs

```
<CollectionFilterProvider
  contractAddress={contractAddress}
  initialPage={initialPage}
  useCollectionProperties={{
    header: 'Traits',
    selector: 'nouns-market-traits',
    hideBorder: true,
  }}
  filtersVisible={isLarge}
  usePriceRange={{
    label: 'Price',
    defaultState: 'open',
    hideBorder: true,
    hideCurrencySelect: true,
  }}
  useSidebarClearButton
  strings={{
    NO_FILTER_RESULTS_COPY: 'Sorry no filters'
  }}
>
  <Collections />
</CollectionFilterProvider>
```

String Config
