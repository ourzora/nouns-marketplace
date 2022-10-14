import { Button, NounButtonProps } from 'components/Button'

import { useCollectionFilters } from '@filter'
import { Flex } from '@zoralabs/zord'

import { ActiveFilterCounter } from './ActiveFilterCounter'

export function ClearFilters({ ...props }: NounButtonProps) {
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
