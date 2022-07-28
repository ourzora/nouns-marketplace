import { Button, ButtonProps, Flex } from '@zoralabs/zord'
import { useCollectionFilters } from '@filter'
import { ActiveFilterCounter } from './ActiveFilterCounter'

export function ClearFilters({ ...props }: ButtonProps) {
  const {
    filterStore: { clearFilters, hasFilters },
  } = useCollectionFilters()

  return (
    <Button
      {...props}
      onClick={clearFilters}
      disabled={!hasFilters}
      style={{ opacity: `${!hasFilters ? '.1' : '1'}` }}
    >
      <Flex align="center" gap="x2" justify="center">
        Clear filters
        <ActiveFilterCounter />
      </Flex>
    </Button>
  )
}
