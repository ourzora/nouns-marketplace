import { Button } from 'components/Button'

import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Grid } from '@zoralabs/zord'

import { ClearFilters } from './ClearFilters'
import * as styles from './CollectionsFilter.css'

export function MobileFiltersFooter() {
  const {
    filterStore: { showFilters, toggleShowFilters },
  } = useCollectionFilters()

  if (!showFilters) return null

  return (
    showFilters && (
      <Grid className={['zora-mobileFilterFooter', styles.mobileFiltersFooter]}>
        <ClearFilters />
        <Button onClick={toggleShowFilters}>Done</Button>
      </Grid>
    )
  )
}
