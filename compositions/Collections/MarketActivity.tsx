import { RawDisplayer } from 'components/utils'
import { useCollectionFilters } from '@filter'
import { Stack } from '@zoralabs/zord'

export function MarketActivity() {
  const {
    filterStore: { filters, setMarketStatus },
    items,
  } = useCollectionFilters()

  return (
    <Stack>
      {items.map((nft) => (
        <RawDisplayer
          key={`${nft?.nft?.contract.address}-${nft?.nft?.tokenId}`}
          data={nft}
        />
      ))}
    </Stack>
  )
}
