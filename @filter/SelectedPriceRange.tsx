import { FilterOptionButton } from './FilterOptionButton'
import { useCollectionFilters } from './providers/CollectionFilterProvider'
import { useMemo } from 'react'

export function SelectedPriceRange() {
  const {
    filterStore: {
      filters: { priceRange },
      clearPriceRange,
    },
  } = useCollectionFilters()

  const formatPriceRange = useMemo(() => {
    if (priceRange) {
      const min = `${priceRange?.min && priceRange.min > 0 ? `${priceRange.min}` : ''}`
      const max = `${priceRange?.max && priceRange.max > 0 ? `${priceRange.max}` : ''}`
      const hyphen = `${!!min && !!max ? ' - ' : ''}`
      const lt = `${max && !min ? '< ' : ''}`
      const gt = `${!max && min ? '> ' : ''}`
      return `${gt}${min}${hyphen}${lt}${max} ${priceRange.currency.symbol}`
    }
  }, [priceRange])

  if (!formatPriceRange) {
    return null
  }

  return (
    <FilterOptionButton
      label={formatPriceRange}
      showCheckbox={false}
      showCloseIcon
      useBorder
      onClick={clearPriceRange}
    />
  )
}
