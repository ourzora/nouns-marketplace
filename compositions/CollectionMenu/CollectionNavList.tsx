import React from 'react'
import { TypeSafeDao } from 'validators/dao'

import { Stack, StackProps } from '@zord'

import { CollectionLink } from './CollectionLink'

export interface CollectionNavListProps extends StackProps {
  items: TypeSafeDao[]
}

export const CollectionNavList = React.forwardRef<HTMLDivElement, CollectionNavListProps>(
  ({ items, ...props }, forwardedRef) => {
    return (
      <Stack gap="x4" {...props} ref={forwardedRef}>
        {items.map((collection: TypeSafeDao) => (
          <CollectionLink
            key={`${collection.collectionAddress}-${collection.name}`}
            collection={collection}
          />
        ))}
      </Stack>
    )
  }
)

CollectionNavList.displayName = 'CollectionNavList'
