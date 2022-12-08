import { AggregateAttribute, AggregateAttributeValue } from 'types/zora.api.generated'

import { useMemo } from 'react'

import { lightFont } from '@shared'
import { CollectionAttributeValue } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Box, Flex, Label, Select } from '@zoralabs/zord'

import * as styles from './CollectionsFilter.css'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

// AggregateAttribute

// export type FilterProperty = {
//   traitType: string
//   valueMetrics: CollectionAttributeValue[]
// }

function sortTraitsByName(a: AggregateAttributeValue, b: AggregateAttributeValue) {
  return a.value < b.value ? -1 : 1
}

export function FilterPropertySelect({ traitType, valueMetrics }: AggregateAttribute) {
  const {
    filterStore: { setCollectionAttributes, filters },
  } = useCollectionFilters()

  const sortedValueMetrics = useMemo(
    // TODO: Can we have this functionality on the back-end?
    () => valueMetrics.sort(sortTraitsByName),
    [valueMetrics]
  )

  // console.log('hmmmm', filters.collectionAttributes)

  const isReset = useMemo(
    () => !filters.collectionAttributes.length,
    [filters.collectionAttributes.length]
  )

  // console.log('selectedValue', selectedValue)

  return (
    <Flex
      // className={styles.selectWrap}
      position="relative"
      // className={[styles.selectDropdown]}
    >
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
        // defaultValue=""
        value={isReset ? '' : undefined}
        // pos="relative"
        w="100%"
        // @BJ TODO: Add 'value' to zord Select, non-standard to set selected on option
        // p="x2"
        // py="x4"
        color="text1"
        textAlign="right"
        className={[styles.selectDropdown, lightFont]}
        //  @BJ TODO: add required bool to zord
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCollectionAttributes({ traitType, value: e.target.value })
        }
        // className={[styles.selectDropdown]}
      >
        <Box
          as="option"
          // default
          // selected={isReset}
          value=""
          key={`${traitType}-default`}
          w="100%"
        />
        {sortedValueMetrics.map((valueMetric) => (
          <Box as="option" value={valueMetric.value} key={valueMetric.value} w="100%">
            {valueMetric.value}
          </Box>
        ))}
      </Select>
    </Flex>
  )
}
