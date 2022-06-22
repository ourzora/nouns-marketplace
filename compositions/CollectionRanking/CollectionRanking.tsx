import { Stack, Grid, Label } from '@zoralabs/zord'
import { RankingRow } from './RankingRow'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import {
  rankingWrapper,
  rankingRow,
  rankingStats,
  rankingHeader,
} from './CollectionRanking.css'
import { lightFont } from 'styles/styles.css'

export const statRows = ['Volume', 'Items', 'Floor', 'Owners']

export function CollectionRanking() {
  const { collections } = useCollectionsContext()
  return (
    <Stack
      className={rankingWrapper}
      pt={{
        '@initial': 'x0',
        '@1024': 'x14',
      }}
    >
      <Grid className={[rankingRow, rankingHeader]}>
        <Label size="lg" className={lightFont} color="tertiary">
          Collection
        </Label>
        <Grid className={rankingStats}>
          {statRows.map((stat) => (
            <Label
              size="lg"
              align="right"
              className={lightFont}
              color="tertiary"
              key={stat}
            >
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
