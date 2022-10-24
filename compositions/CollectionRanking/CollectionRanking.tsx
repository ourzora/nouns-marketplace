import { CollectionParsed } from 'pages'
import { useCollectionsContext } from 'providers/CollectionsProvider'

import { Heading, Stack } from '@zoralabs/zord'

import { rankingWrapper } from './CollectionRanking.css'
import { RankingRow } from './RankingRow'

export const statRows = ['Volume', 'Items', 'Floor', 'Owners']

export function CollectionRanking({ collections }: { collections?: CollectionParsed }) {
  return (
    <Stack className={rankingWrapper}>
      <Heading as="h2" size="lg">
        Collections
      </Heading>
      <Stack
        gap={{
          '@initial': 'x4',
          '@1024': 'x6',
        }}
      >
        {collections &&
          collections.length > 0 &&
          collections.map((collection) => (
            <RankingRow key={collection.address} collection={collection} />
          ))}
      </Stack>
    </Stack>
  )
}
