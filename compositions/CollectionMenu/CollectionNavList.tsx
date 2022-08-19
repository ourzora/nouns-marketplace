import { Stack, StackProps } from '@zoralabs/zord'
import { CollectionLink } from './CollectionLink'

interface CollectionNavListProps extends StackProps {
  items: any[]
}

export function CollectionNavList({ items, ...props }: CollectionNavListProps) {
  return (
    <Stack gap="x4" {...props}>
      {items.map((collection) => (
        <CollectionLink
          key={`${collection.address}-${collection.name}r`}
          collection={collection}
        />
      ))}
    </Stack>
  )
}
