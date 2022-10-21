import { shortenAddress } from '@shared'
import { Zorb } from '@zora-brand'

import { FilterOptionButton } from './FilterOptionButton'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

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
