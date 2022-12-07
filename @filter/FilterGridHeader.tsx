import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Button, Flex } from '@zoralabs/zord'

import { ActiveFilterCounter } from './ActiveFilterCounter'
import * as styles from './CollectionsFilter.css'
import { SelectedFilters } from './SelectedFilters'
import { SortDropdown } from './SortDropdown'

export function FilterGridHeader({}: { children?: JSX.Element }) {
  const {
    enableSortDropdown,
    enableSelectedFiltersPanel,
    enableSidebarFilter,
    filterStore: { toggleShowFilters, showFilters, activeFilterCount },
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
