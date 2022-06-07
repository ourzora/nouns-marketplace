import { Stack, Grid, Label } from '@zoralabs/zord'
import { RankingRow } from './RankingRow'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { rankingWrapper, rankingRow, rankingStats } from './CollectionRanking.css'

export const statRows = ['Volume', 'Items', 'Floor', 'Owners']

export function CollectionRanking() {
  const { collections } = useCollectionsContext()
  return (
    <Stack className={rankingWrapper}>
      <Grid className={rankingRow} style={{ borderBottom: 0 }}>
        <Label size="lg">Collection</Label>
        <Grid className={rankingStats}>
          {statRows.map((stat) => (
            <Label size="lg" align="right" key={stat}>
              {stat}
            </Label>
          ))}
        </Grid>
      </Grid>
      {collections.length > 0 &&
        collections.map((collection) => (
          <RankingRow key={collection.address} collection={collection} />
        ))}
    </Stack>
  )
}
