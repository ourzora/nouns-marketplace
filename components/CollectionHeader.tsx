import { useEffect } from 'react'
import { Stack, Display, Paragraph } from '@zoralabs/zord/elements'
import { Collection } from '@zoralabs/zdk-alpha/dist/queries/queries-sdk'
import { lightFont } from 'styles/styles.css'
import { useCollections } from '../hooks/zdk/useCollectionQuery'

export function CollectionHeader({ collection }: { collection: Collection }) {
  return (
    <Stack align="center">
      <Display>{collection.name}</Display>
      <Paragraph size="lg" className={lightFont} color="tertiary">
        {collection.totalSupply} NFTs
      </Paragraph>
      {collection.description !== "''" && collection.description && (
        <Paragraph>{collection.description}</Paragraph>
      )}
    </Stack>
  )
}
