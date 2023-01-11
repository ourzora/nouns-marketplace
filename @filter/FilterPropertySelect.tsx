import { AggregateAttribute } from 'types/zora.api.generated'

import { useMemo } from 'react'

import { Box, Flex, Label, Select } from '@zord'

import * as styles from './CollectionsFilter.css'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

export function FilterPropertySelect({ traitType, valueMetrics }: AggregateAttribute) {
  const {
    filterStore: { setCollectionAttributes, filters },
  } = useCollectionFilters()

  const isReset = useMemo(
    () => !filters.collectionAttributes.length,
    [filters.collectionAttributes.length]
  )

  return (
    <Flex position="relative">
      <Label
        as="label"
        htmlFor="filter-property"
        position="absolute"
        className={styles.selectLabel}
        textTransform="capitalize"
        pointerEvents="none"
      >
        {traitType}
      </Label>
      <Select
        name="filter-property"
        id="filter-property"
        value={isReset ? '' : undefined}
        w="100%"
        color="text1"
        textAlign="right"
        className={[styles.selectDropdown]}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCollectionAttributes({ traitType, value: e.target.value })
        }
      >
        <Box as="option" value="" key={`${traitType}-default`} w="100%" />
        {valueMetrics.map((valueMetric) => (
          <Box as="option" value={valueMetric.value} key={valueMetric.value} w="100%">
            {valueMetric.value}
          </Box>
        ))}
      </Select>
    </Flex>
  )
}
