import { useMemo } from 'react'

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

  // const selectedValue = useMemo(
  //   () =>
  //     filters.collectionAttributes.filter((val) => val.traitType === traitType)[0]?.value,
  //   [filters.collectionAttributes, traitType]
  // )

  // console.log('FILTfilters)
  console.log('hmmmm', filters.collectionAttributes)

  const isReset = !filters.collectionAttributes.length

  // console.log('selectedValue', selectedValue)

  // @BJ TODO: reset the dropdowns when the filters have been cleared

  return (
    <Flex
      // className={styles.selectWrap}
      position="relative"
      // className={[styles.selectDropdown]}
    >
      {/* <Select name="filter-property" id="filter-property"></Select> */}
      {/* {traitType}
      {selectedValue ? ` ${selectedValue}` : null} */}
      <Label
        as="label"
        for="filter-property"
        position="absolute"
        className={styles.selectLabel}
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
        className={[styles.selectDropdown]}
        //  @BJ TODO: add required bool to zord
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCollectionAttributes({ traitType, value: e.target.value })
        }
        // className={[styles.selectDropdown]}
      >
        {/* <Box
          as="option"
          value=""
          // disabled
          default
          selected
          hidden
          key={`${traitType}-default`}
          w="100%"
        >
          {traitType}
          {selectedValue ? ` ${selectedValue}` : null}
        </Box> */}
        <Box
          as="option"
          default
          // selected={isReset}
          value=""
          key={`${traitType}-default`}
          w="100%"
        >
          --
        </Box>
        {valueMetrics.map((valueMetric) => (
          <Box as="option" value={valueMetric.value} key={valueMetric.value} w="100%">
            {valueMetric.value}
          </Box>
        ))}
      </Select>
    </Flex>
  )
}
