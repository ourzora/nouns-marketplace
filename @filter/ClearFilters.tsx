import { Button, ButtonProps, Flex } from '@zoralabs/zord'
import { useCollectionFilters } from '@filter'
import { ActiveFilterCounter } from './ActiveFilterCounter'

export function ClearFilters({ ...props }: ButtonProps) {
  const {
    filterStore: { clearFilters },
  } = useCollectionFilters()

  return (
    <Button {...props} onClick={clearFilters}>
      <Flex align="center" gap="x2">
        Clear filters
        <ActiveFilterCounter />
      </Flex>
    </Button>
  )
}
