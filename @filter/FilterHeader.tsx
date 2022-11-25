import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Button, Flex } from '@zoralabs/zord'

import { ActiveFilterCounter } from './ActiveFilterCounter'
import { filterHeader, filtersButton, stickyFilterHeader } from './CollectionsFilter.css'

export function FilterHeader({ children }: { children?: JSX.Element }) {
  const {
    filterStore: { toggleShowFilters, showFilters, activeFilterCount },
  } = useCollectionFilters()

  return (
    <Flex
      className={[
        'filter-header',
        filterHeader,
        {
          [stickyFilterHeader]: !showFilters,
        },
      ]}
    >
      <Flex align="center" gap="x2">
        <Button
          variant={activeFilterCount > 0 ? 'primary' : 'secondary'}
          borderRadius="round"
          size="sm"
          icon={showFilters ? 'ChevronLeft' : undefined}
          className={filtersButton}
          onClick={toggleShowFilters}
        >
          Filters
          <ActiveFilterCounter />
        </Button>
      </Flex>
      {children}
    </Flex>
  )
}
