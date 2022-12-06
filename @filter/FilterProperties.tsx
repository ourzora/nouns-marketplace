import { useCollectionFilters } from '@filter/providers'
import { Box, Label, Stack } from '@zoralabs/zord'

import { FilterProperty, FilterPropertySelect } from './FilterPropertySelect'
import { useCollectionAttributes } from './hooks/useCollectionAttributes'

export function FilterProperties({ collectionAddress }: { collectionAddress: string }) {
  const { data } = useCollectionAttributes(collectionAddress)
  const { useCollectionProperties } = useCollectionFilters()

  if (!data?.aggregateAttributes) {
    return null
  }

  return (
    <Stack gap="x4" className={['filter-properties', useCollectionProperties?.selector]}>
      {useCollectionProperties?.header && (
        <Label className="zord-attributesHeading" size="lg">
          {useCollectionProperties?.header}
        </Label>
      )}
      <Stack gap="x2">
        {data?.aggregateAttributes.map((property: FilterProperty) => (
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
