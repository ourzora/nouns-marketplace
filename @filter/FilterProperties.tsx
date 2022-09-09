import { filterOptionsWrapper } from './CollectionsFilter.css'
import { useCollection } from './hooks/useCollection'
import { Stack, Label } from '@zoralabs/zord'
import { useCollectionFilters } from '@filter/providers'
import FilterPropertyAccordion from './FilterPropertyAccordion'

export function FilterProperties({ collectionAddress }: { collectionAddress: string }) {
  const { data } = useCollection(collectionAddress)
  const { useCollectionProperties } = useCollectionFilters()

  if (!data?.attributes) {
    return null
  }

  return (
    <Stack className={useCollectionProperties?.selector}>
      {useCollectionProperties?.header && (
        <Label className="zord-attributesHeading" mb="x4" size="lg">
          {useCollectionProperties?.header}
        </Label>
      )}
      {data?.attributes.map((property) => (
        <FilterPropertyAccordion
          key={property.traitType}
          className={!useCollectionProperties?.hideBorder && filterOptionsWrapper}
          property={property}
        />
      ))}
    </Stack>
  )
}
