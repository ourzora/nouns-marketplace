import { mobileFiltersFooter } from './CollectionsFilter.css'
import { Grid } from '@zoralabs/zord'
import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { ClearFilters } from './ClearFilters'
import { Button } from 'components/Button'

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
