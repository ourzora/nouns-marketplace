import { filterOptionsWrapper } from './CollectionsFilter.css'
import { FilterPropertySelect } from './FilterPropertySelect'
import { useCollection } from './hooks/useCollection'
import { Accordion, Box, Stack } from '@zoralabs/zord'

export function FilterProperties({ collectionAddress }: { collectionAddress: string }) {
  const { data } = useCollection(collectionAddress)

  if (!data?.attributes) {
    return null
  }

  return (
    <Stack>
      {data?.attributes.map((property) => (
        <Box key={property.traitType} className={filterOptionsWrapper}>
          <Accordion label={property.traitType ? property.traitType : ''}>
            <Stack pb="x4" gap="x2">
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
