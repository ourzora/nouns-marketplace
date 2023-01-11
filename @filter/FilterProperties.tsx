import { useCollectionsContext } from 'providers'
import { AggregateAttribute } from 'types/zora.api.generated'

import { useEffect } from 'react'

import { useCollectionFilters } from '@filter/providers'
import { Box, Heading, Label, Stack } from '@zord'

import { FilterPropertySelect } from './FilterPropertySelect'
import { useCollectionAttributes } from './hooks/useCollectionAttributes'

export function FilterProperties({ collectionAddress }: { collectionAddress: string }) {
  const { filterPropertiesList, setFilterPropertiesList } = useCollectionsContext()
  const { aggregateAttributes } = useCollectionAttributes({
    addresses: collectionAddress,
  })
  const { collectionPropertiesConfig } = useCollectionFilters()

  useEffect(() => {
    if (!aggregateAttributes) return
    setFilterPropertiesList(aggregateAttributes)
  }, [aggregateAttributes, setFilterPropertiesList])

  if (!filterPropertiesList || filterPropertiesList.length === 0) {
    return null
  }

  return (
    <Stack
      gap="x4"
      className={['filter-properties', collectionPropertiesConfig?.selector]}
    >
      {collectionPropertiesConfig?.header && (
        <Heading size="sm">{collectionPropertiesConfig?.header}</Heading>
      )}
      <Stack gap="x2">
        {filterPropertiesList.map((property: AggregateAttribute) => (
          <Box key={property.traitType} className={['filter-properties-list']}>
            <FilterPropertySelect
              traitType={property.traitType || ''}
              valueMetrics={property.valueMetrics}
            />
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}
