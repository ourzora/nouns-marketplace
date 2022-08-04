import { Flex, Text } from '@zoralabs/zord'
import { useCollectionFilters } from '@filter'

export function ActiveFilterCounter() {
  const {
    filterStore: { activeFilterCount },
  } = useCollectionFilters()

  if (activeFilterCount > 0) {
    return (
      <Flex
        backgroundColor="primary"
        w="x5"
        h="x5"
        borderRadius="round"
        align="center"
        justify="center"
      >
        <Text
          variant="label-sm"
          color="primary"
          //  style={{ paddingTop: 0 }} // This should be okay w/o explicit padding because zord now has a padding/margin reset
        >
          {activeFilterCount}
        </Text>
      </Flex>
    )
  } else {
    return null
  }
}
