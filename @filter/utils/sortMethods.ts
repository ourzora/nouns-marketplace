import {
  CollectionAttributesFilter,
  MarketStatusFilter,
  PriceRangeFilter,
  SortMethodType,
} from '@filter/typings'
import {
  MarketCategory,
  MarketStatus,
  MarketType,
  SortDirection,
  TokenSortInput,
  TokenSortKey,
  TokensQueryFilter,
} from '@zoralabs/zdk/dist/queries/queries-sdk'

export function marketStatusToSortAxis(marketType: MarketStatusFilter) {
  switch (marketType) {
    case 'buy-now':
      return MarketCategory.Ask
    // case 'reserve-not-met':
    //   return MarketCategory.Auction
    // case 'live':
    //   return undefined
  }
}

export function marketStatusToSortKey(marketType: MarketStatusFilter) {
  switch (marketType) {
    // case 'live':
    //   return TokenSortKey.TimedSaleEnding
    default:
      return TokenSortKey.ChainTokenPrice
  }
}

export function sortMethodToSortParams(
  sortMethod: SortMethodType,
  marketStatus: MarketStatusFilter
): TokenSortInput | undefined {
  const sortNewest = {
    sortDirection: SortDirection.Desc,
    sortKey: TokenSortKey.Minted,
    sortAxis: marketStatusToSortAxis(marketStatus),
  }

  const sortOldest = {
    sortDirection: SortDirection.Asc,
    sortKey: TokenSortKey.Minted,
    sortAxis: marketStatusToSortAxis(marketStatus),
  }

  if (!marketStatus) {
    switch (sortMethod) {
      case 'newest':
        return sortNewest
      case 'oldest':
        return sortOldest
      default:
        return {
          sortDirection: SortDirection.Desc,
          sortKey: TokenSortKey.None,
          sortAxis: null,
        }
    }
  }

  switch (sortMethod) {
    case 'highest-price':
      return {
        sortDirection: SortDirection.Desc,
        sortKey: marketStatusToSortKey(marketStatus),
        sortAxis: marketStatusToSortAxis(marketStatus),
      }
    case 'ending-soon':
      return {
        sortDirection: SortDirection.Desc,
        sortKey: TokenSortKey.TimedSaleEnding,
        sortAxis: null,
      }
    case 'lowest-price':
      return {
        sortDirection: SortDirection.Asc,
        sortKey: marketStatusToSortKey(marketStatus),
        sortAxis: marketStatusToSortAxis(marketStatus),
      }
    case 'newest':
      return sortNewest
    case 'oldest':
      return sortOldest
  }
}

export function marketTypeToFilterParams(
  marketType: MarketStatusFilter
): TokensQueryFilter | undefined {
  switch (marketType) {
    case 'buy-now':
      return {
        marketFilters: [
          {
            marketType: MarketType.V1Ask,
            statuses: [MarketStatus.Active],
          },
          {
            marketType: MarketType.V3Ask,
            statuses: [MarketStatus.Active],
          },
        ],
      }
    case 'buy-now-completed': {
      return {
        marketFilters: [
          {
            marketType: MarketType.V1Ask,
            statuses: [MarketStatus.Completed],
          },
          {
            marketType: MarketType.V3Ask,
            statuses: [MarketStatus.Completed],
          },
        ],
      }
    }
    // @BJ TODO: need Nouns Builder markets added to ZDK market types here
    // Meanwhile, we COULD add:
    // MarketType.LilNounsAuction
    // MarketType.NounsAuction
    // (but these will not be permanent)

    // Re-enable the following 2 cases when using Zora V2 auctions
    // case 'reserve-not-met':
    //   return {
    //     marketFilters: [
    //       {
    //         marketType: MarketType.V2Auction,
    //         statuses: [MarketStatus.Active],
    //       },
    //     ],
    //   }
    // case 'live':
    //   return {
    //     marketFilters: [
    //       {
    //         marketType: MarketType.V2Auction,
    //         statuses: [MarketStatus.Active],
    //       },
    //     ],
    //   }
    default:
      return {}
  }
}

export function priceRangeToQueryParams(priceRange: PriceRangeFilter) {
  return (
    priceRange && {
      priceFilter: {
        currencyAddress: priceRange.currency.id,
        minimumNativePrice: priceRange.min?.toString(),
        maximumNativePrice: priceRange.max?.toString(),
      },
    }
  )
}

export function attributesToFilterParams(attributeFilters: CollectionAttributesFilter) {
  return (
    attributeFilters.length > 0 && {
      attributeFilters,
    }
  )
}
