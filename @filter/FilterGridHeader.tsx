import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Flex } from '@zord'

import * as styles from './CollectionsFilter.css'
import { SelectedFilters } from './SelectedFilters'
import { SortDropdown } from './SortDropdown'

export function FilterGridHeader() {
  const {
    enableSortDropdown,
    enableSelectedFiltersPanel,
    filterStore: { showFilters },
  } = useCollectionFilters()

  if (showFilters) {
    return (
      <Flex
        className={styles.gridFilterHeaderPanel}
        align="center"
        justify={
          enableSelectedFiltersPanel && enableSortDropdown ? 'space-between' : 'flex-end'
        }
      >
        {enableSelectedFiltersPanel && <SelectedFilters />}
        {enableSortDropdown && <SortDropdown />}
      </Flex>
    )
  }

  return null
}
