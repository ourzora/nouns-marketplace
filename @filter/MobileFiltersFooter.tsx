import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Button, Grid } from '@zoralabs/zord'

import { ClearFilters } from './ClearFilters'
import { mobileFiltersFooter } from './CollectionsFilter.css'

export function MobileFiltersFooter() {
  const {
    filterStore: { showFilters, toggleShowFilters, hasFilters },
  } = useCollectionFilters()

  if (!showFilters) {
    return null
  }

  return (
    <Grid className={[mobileFiltersFooter, 'zora-mobileFilterFooter']}>
      <ClearFilters borderRadius="curved" />
      <Button onClick={toggleShowFilters} borderRadius="curved">
        Done
      </Button>
    </Grid>
  )
}
