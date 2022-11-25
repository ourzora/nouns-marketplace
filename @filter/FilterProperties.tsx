import { useCollectionFilters } from '@filter/providers'
import { Box, Label, Stack } from '@zoralabs/zord'

import { FilterPropertySelect } from './FilterPropertySelect'
import { useCollection } from './hooks/useCollection'

export function FilterProperties({ collectionAddress }: { collectionAddress: string }) {
  const { data } = useCollection(collectionAddress)
  const { useCollectionProperties } = useCollectionFilters()

  if (!data?.attributes) {
    return null
  }

  return (
    <Stack gap="x2" className={['filter-properties', useCollectionProperties?.selector]}>
      {useCollectionProperties?.header && (
        <Label className="zord-attributesHeading" size="lg">
          {useCollectionProperties?.header}
        </Label>
      )}
      <Stack gap="x2">
        {data?.attributes.map((property) => (
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
