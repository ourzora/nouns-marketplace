import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Button, Flex } from '@zoralabs/zord'

import { ActiveFilterCounter } from './ActiveFilterCounter'
// import { filterHeader, filtersButton, stickyFilterHeader } from './CollectionsFilter.css'
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

  // HERE: !showFilters && enableSidebarFilter

  if (!showFilters && enableSidebarFilter) {
    return (
      <Flex
        className={[
          'filter-header',
          styles.filterHeader,
          !showFilters && styles.stickyFilterHeader,
          // {
          //   [stickyFilterHeader]: !showFilters,
          // },
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

  // if (showFilters) {
  //   return (
  //     <Flex
  //       className={styles.gridFilterHeaderPanel}
  //       align="center"
  //       justify={
  //         enableSelectedFiltersPanel && enableSortDropdown ? 'space-between' : 'flex-end'
  //       }
  //     >
  //       {enableSelectedFiltersPanel && <SelectedFilters />}
  //       {enableSortDropdown && <SortDropdown />}
  //     </Flex>
  //   )
  // }

  return null
}
