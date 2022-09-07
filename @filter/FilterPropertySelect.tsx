import { filterPropertySelect } from './CollectionsFilter.css'
import { useCollectionFilters } from './providers/CollectionFilterProvider'
import { CollectionAttributeValue } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Box, Button, Checkbox, Flex, Paragraph, Stack, fontWeight } from '@zoralabs/zord'
import { useCallback, useMemo } from 'react'

export function FilterPropertySelect({
  traitType,
  valueMetric,
}: {
  traitType: string
  valueMetric: CollectionAttributeValue
}) {
  const {
    filterStore: { setCollectionAttributes, filters },
  } = useCollectionFilters()

  const isSelected = useMemo(
    () =>
      filters.collectionAttributes.findIndex(
        (a) => a.traitType === traitType && a.value === valueMetric.value
      ) >= 0,
    [filters.collectionAttributes, traitType, valueMetric.value]
  )

  const setValue = useCallback(() => {
    setCollectionAttributes({ traitType, value: valueMetric.value })
  }, [setCollectionAttributes, traitType, valueMetric.value])

  return (
    <Button variant="unset" w="100%" className={filterPropertySelect} onClick={setValue}>
      <Box
        className={filterPropertySelect}
        direction="row"
        justify="stretch"
        align="center"
      >
        <Flex>
          <Checkbox
            name={valueMetric.value}
            id={valueMetric.value}
            checked={isSelected}
          />
          <Paragraph ml="x2" size="sm">
            {valueMetric.value}
          </Paragraph>
        </Flex>
        <Stack gap="x0">
          <Paragraph size="sm" align="right" fontWeight="label">
            {valueMetric.count}
          </Paragraph>
          <Paragraph size="xs" fontWeight="label">
            ({valueMetric.percent}%)
          </Paragraph>
        </Stack>
      </Box>
    </Button>
  )
}
