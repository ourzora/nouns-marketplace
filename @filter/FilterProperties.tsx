import { useCollectionFilters } from '@filter/providers'
import { Accordion, Box, Label, Stack } from '@zoralabs/zord'

import { filterOptionsWrapper } from './CollectionsFilter.css'
import { FilterPropertySelect } from './FilterPropertySelect'
import { useCollection } from './hooks/useCollection'

export function FilterProperties({ collectionAddress }: { collectionAddress: string }) {
  const { data } = useCollection(collectionAddress)
  const { useCollectionProperties } = useCollectionFilters()

  if (!data?.attributes) {
    return null
  }

  return (
    <Stack className={['filter-properties', useCollectionProperties?.selector]}>
      {useCollectionProperties?.header && (
        <Label className="zord-attributesHeading" mb="x4" size="lg">
          {useCollectionProperties?.header}
        </Label>
      )}
      {data?.attributes.map((property) => (
        <Box
          key={property.traitType}
          className={!useCollectionProperties?.hideBorder && filterOptionsWrapper}
        >
          <Accordion label={property.traitType ? property.traitType : ''}>
            <Stack pb="x4" gap="x5" className={['filter-properties-list']}>
              {property.valueMetrics.map((valueMetric) => (
                <FilterPropertySelect
                  key={valueMetric.value}
                  traitType={property.traitType || ''}
                  valueMetric={valueMetric}
                />
              ))}
            </Stack>
          </Accordion>
        </Box>
      ))}
    </Stack>
  )
}
