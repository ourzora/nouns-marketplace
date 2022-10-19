import { Button } from 'components/Button'

import { useCallback, useMemo } from 'react'

import { CollectionAttributeValue } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Checkbox, Paragraph } from '@zoralabs/zord'

import { filterPropertySelect } from './CollectionsFilter.css'
import { useCollectionFilters } from './providers/CollectionFilterProvider'

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
      <Checkbox name={valueMetric.value} id={valueMetric.value} checked={isSelected} />
      <Paragraph ml="x2" size="sm">
        {valueMetric.value}
      </Paragraph>
    </Button>
  )
}
