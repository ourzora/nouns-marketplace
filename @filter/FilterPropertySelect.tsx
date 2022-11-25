import { useMemo } from 'react'

import { lightFont } from '@shared'
import { CollectionAttributeValue } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Box, Flex, Label, Select } from '@zoralabs/zord'

import * as styles from './CollectionsFilter.css'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

export function FilterPropertySelect({
  traitType,
  valueMetrics,
}: {
  traitType: string
  valueMetrics: CollectionAttributeValue[]
}) {
  const {
    filterStore: { setCollectionAttributes, filters },
  } = useCollectionFilters()

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
        defaultValue=""
        // pos="relative"
        w="100%"
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
          selected={isReset}
          value=""
          key={`${traitType}-default`}
          w="100%"
        />
        {valueMetrics.map((valueMetric) => (
          <Box as="option" value={valueMetric.value} key={valueMetric.value} w="100%">
            {valueMetric.value}
          </Box>
        ))}
      </Select>
    </Flex>
  )
}
