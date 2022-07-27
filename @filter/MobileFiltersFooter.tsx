import { mobileFiltersFooter } from './CollectionsFilter.css'
import { Grid, Button } from '@zoralabs/zord'
import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { ClearFilters } from './ClearFilters'

export function MobileFiltersFooter() {
  const {
    filterStore: { showFilters, toggleShowFilters, hasFilters },
  } = useCollectionFilters()

  if (!showFilters) {
    return null
  }

  return (
    <Grid className={[mobileFiltersFooter, 'zora-mobileFilterFooter']}>
      <ClearFilters
        disabled={!hasFilters}
        style={{ opacity: `${!hasFilters ? '.15' : '1'}` }}
        borderRadius="curved"
      />
      <Button onClick={toggleShowFilters} borderRadius="curved">
        Done
      </Button>
    </Grid>
  )
}
