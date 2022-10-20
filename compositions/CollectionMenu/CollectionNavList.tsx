import React from 'react'

import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Stack, StackProps } from '@zoralabs/zord'

import { CollectionLink } from './CollectionLink'

export interface CollectionNavListProps extends StackProps {
  items: Collection[]
}

export const CollectionNavList = React.forwardRef<HTMLDivElement, CollectionNavListProps>(
  ({ items, ...props }, forwardedRef) => {
    return (
      <Stack gap="x4" {...props} ref={forwardedRef}>
        {items.map((collection: Collection) => (
          <CollectionLink
            key={`${collection.address}-${collection.name}`}
            collection={collection}
          />
        ))}
      </Stack>
    )
  }
)

CollectionNavList.displayName = 'CollectionNavList'
