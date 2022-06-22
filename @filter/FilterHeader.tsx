import {
  filterCounter,
  filterHeader,
  filtersButton,
  stickyFilterHeader,
} from './CollectionsFilter.css'
import { useCollectionFilters } from '@filter/providers/CollectionFilterProvider'
import { Button, Flex, Text } from '@zoralabs/zord'

export function FilterHeader({
  children,
  itemCount = 0,
}: {
  children?: JSX.Element
  itemCount?: number
}) {
  const {
    filterStore: { toggleShowFilters, showFilters },
  } = useCollectionFilters()

  return (
    <Flex
      position="sticky"
      justify="flex-start"
      backgroundColor="primary"
      align="center"
      className={[
        filterHeader,
        {
          [stickyFilterHeader]: !showFilters,
        },
      ]}
    >
      <Flex align="center" gap="x2">
        <Button
          variant="secondary"
          borderRadius="round"
          size="sm"
          icon={showFilters ? 'ChevronLeft' : undefined}
          className={filtersButton}
          onClick={toggleShowFilters}
        >
          Filters
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
