import { Button } from 'components/Button'

import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Grid } from '@zoralabs/zord'

import { ClearFilters } from './ClearFilters'
import { mobileFiltersFooter } from './CollectionsFilter.css'

export function MobileFiltersFooter() {
  const {
    filterStore: { showFilters, toggleShowFilters },
  } = useCollectionFilters()

  if (!showFilters) {
    return null
  }

  return (
    <Grid className={[mobileFiltersFooter, 'zora-mobileFilterFooter']}>
      <ClearFilters />
      <Button onClick={toggleShowFilters}>Done</Button>
    </Grid>
  )
}
