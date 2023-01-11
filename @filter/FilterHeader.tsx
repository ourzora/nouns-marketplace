import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Button, Flex } from '@zord'

import { ActiveFilterCounter } from './ActiveFilterCounter'
import * as styles from './CollectionsFilter.css'
import { SelectedFilters } from './SelectedFilters'
import { SortDropdown } from './SortDropdown'

export function FilterHeader({}: { children?: JSX.Element }) {
  const {
    enableSortDropdown,
    enableSelectedFiltersPanel,
    enableSidebarFilter,
    filterStore: { toggleShowFilters, showFilters, activeFilterCount },
  } = useCollectionFilters()

  if (!showFilters && enableSidebarFilter) {
    return (
      <Flex
        className={[
          'filter-header',
          styles.filterHeader,
          !showFilters && styles.stickyFilterHeader,
        ]}
      >
        <Flex align="center" gap="x2">
          {!showFilters && (
            <Button
              variant={activeFilterCount > 0 ? 'primary' : 'secondary'}
              borderRadius="round"
              size="sm"
              icon={showFilters ? 'ChevronLeft' : undefined}
              className={styles.filtersButton}
              onClick={toggleShowFilters}
            >
              Filters
              <ActiveFilterCounter />
            </Button>
          )}
        </Flex>
        <>
          {enableSelectedFiltersPanel && <SelectedFilters />}
          {enableSortDropdown && <SortDropdown />}
        </>
      </Flex>
    )
  }

  return null
}
