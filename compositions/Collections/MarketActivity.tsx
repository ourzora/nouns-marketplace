import { RawDisplayer } from 'components/utils'
import { useCollectionFilters } from '@filter'
import { NFTGrid } from '@media/NFTGrid'
import { Stack } from '@zoralabs/zord'

export function ActivityRow() {
  const {
    filterStore: { clearFilters },
    items,
    isValidating,
    isReachingEnd,
    handleLoadMore,
  } = useCollectionFilters()

  return <RawDisplayer data={nft} />
}

export function MarketActivity() {
  return <NFTGrid />
}
