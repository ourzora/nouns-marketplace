import { Button, Box, BoxProps } from '@zoralabs/zord'
import { useCollectionFilters } from '@filter'

export function ClearFilters({ ...props }: BoxProps) {
  const {
    filterStore: { filterCount, clearFilters },
  } = useCollectionFilters()

  console.log(filterCount)

  if (filterCount <= 0) return null

  return (
    <Box {...props}>
      <Button w="100%" onClick={clearFilters}>
        Clear filters {filterCount}
      </Button>
    </Box>
  )
}
