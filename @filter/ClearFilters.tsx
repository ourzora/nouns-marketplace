import { Button, Box, BoxProps, Flex, Text } from '@zoralabs/zord'
import { useCollectionFilters } from '@filter'

export function ClearFilters({ ...props }: BoxProps) {
  const {
    filterStore: { clearFilters, activeFilterCount },
  } = useCollectionFilters()

  if (activeFilterCount <= 0) return null

  return (
    <Box {...props}>
      <Button w="100%" onClick={clearFilters}>
        <Flex align="center" gap="x2">
          Clear filters
          <Flex
            backgroundColor="primary"
            w="x5"
            h="x5"
            borderRadius="round"
            align="center"
            justify="center"
          >
            <Text variant="label-sm" color="primary" style={{ paddingTop: 2 }}>
              {activeFilterCount}
            </Text>
          </Flex>
        </Flex>
      </Button>
    </Box>
  )
}
