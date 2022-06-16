import { FilterOptionButton } from './FilterOptionButton'
import { Avatar } from '@next/components/Avatar'
import { useCollectionFilters } from '@next/providers/CollectionFilterProvider'
import { shortenAddress } from 'utils/format'

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
      <Avatar size="30" address={tokenAddress} />
    </FilterOptionButton>
  )
}
