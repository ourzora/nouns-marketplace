import { Stack, Heading } from '@zoralabs/zord'
import { RankingRow } from './RankingRow'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { rankingWrapper } from './CollectionRanking.css'

export const statRows = ['Volume', 'Items', 'Floor', 'Owners']

export function CollectionRanking() {
  const { collections } = useCollectionsContext()
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
        {collections.length > 0 &&
          collections.map((collection) => (
            <RankingRow key={collection.address} collection={collection} />
          ))}
      </Stack>
    </Stack>
  )
}
