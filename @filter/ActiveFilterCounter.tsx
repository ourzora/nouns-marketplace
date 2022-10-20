import { useCollectionFilters } from '@filter'
import { Flex, Text } from '@zoralabs/zord'

export function ActiveFilterCounter() {
  const {
    filterStore: { activeFilterCount },
  } = useCollectionFilters()

  if (activeFilterCount > 0) {
    return (
      <Flex
        backgroundColor="background1"
        w="x5"
        h="x5"
        borderRadius="round"
        align="center"
        justify="center"
      >
        <Text variant="label-sm" color="text1">
          {activeFilterCount}
        </Text>
      </Flex>
    )
  } else {
    return null
  }
}
