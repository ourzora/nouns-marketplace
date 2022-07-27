import {
  filterCounter,
  filterHeader,
  filtersButton,
  stickyFilterHeader,
} from './CollectionsFilter.css'
import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Button, Flex, Text } from '@zoralabs/zord'
import { ActiveFilterCounter } from './ActiveFilterCounter'

export function FilterHeader({
  children,
  itemCount = 0,
}: {
  children?: JSX.Element
  itemCount?: number
}) {
  const {
    filterStore: { toggleShowFilters, showFilters, activeFilterCount },
  } = useCollectionFilters()

  return (
    <Flex
      className={[
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
        {itemCount > 0 && (
          <Text
            className={filterCounter}
            as="span"
            variant="paragraph-sm"
            color="tertiary"
            pl="x1"
            pr="x10"
          >
            {itemCount} items
          </Text>
        )}
      </Flex>
      {children}
    </Flex>
  )
}
