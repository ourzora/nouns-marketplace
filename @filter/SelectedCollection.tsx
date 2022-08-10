import { FilterOptionButton } from './FilterOptionButton'
import { Zorb } from '@zora-brand'
import { useCollectionFilters } from './providers/CollectionFilterProvider'
import { shortenAddress } from '@shared'

export function SelectedCollection({ tokenAddress }: { tokenAddress: any }) {
  const {
    filterStore: { setTokenContracts },
  } = useCollectionFilters()

  return (
    <FilterOptionButton
      label={shortenAddress(tokenAddress)}
      // label={tokenContract?.name}
      showCheckbox={false}
      showCloseIcon
      hasAvatar
      useBorder
      rightPad
      onClick={() => setTokenContracts(tokenAddress)}
    >
      <Zorb size={30} address={tokenAddress} />
    </FilterOptionButton>
  )
}
