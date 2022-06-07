import { useMemo, useState } from 'react'
import { Grid, Flex, Label } from '@zoralabs/zord'
import { CollectionsData } from 'hooks/zdk/useCollections'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { rankingRow, rankingStats } from './CollectionRanking.css'
import { Link } from 'components/Link'
import { buttonStyle } from 'styles/styles.css'
import { roundTwoDecimals } from 'utils/math'
import { useAggregate } from 'hooks/zdk/useAggregate'

/* todo: add a skeleton or some kind of loading state */

export function RankingRow({ collection }: { collection: CollectionsData }) {
  const [tokenNo, updateTokenNo] = useState('1')
  const { aggregate } = useAggregate(collection.address)

  const collectionPriceData = useMemo(() => {
    if (aggregate)
      return {
        volume: roundTwoDecimals(aggregate.aggregateStat.salesVolume.chainTokenPrice),
        floor:
          aggregate.aggregateStat?.floorPrice &&
          aggregate.aggregateStat?.floorPrice !== null
            ? `${roundTwoDecimals(aggregate.aggregateStat.floorPrice)} ETH`
            : 'NA',
      }
  }, [collection])

  return (
    <Grid className={rankingRow}>
      <Flex align="center" gap="x4">
        <CollectionThumbnail collectionAddress={collection.address} tokenId={tokenNo} />
        <Label size="lg">{collection.name}</Label>
      </Flex>
      <Grid className={rankingStats}>
        <Label size="lg" align="right">
          {aggregate ? <>{collectionPriceData?.volume}&nbsp;ETH</> : '...'}
        </Label>
        <Label size="lg" align="right">
          {/*aggregate?.nftCount*/}
        </Label>
        <Label size="lg" align="right">
          {aggregate ? <>{collectionPriceData?.floor}&nbsp;ETH</> : '...'}
        </Label>
        <Label size="lg" align="right">
          {/*aggregate.ownerCount*/}
        </Label>
        <Link href={`/collections/${collection.address}`} passHref>
          <Flex className={buttonStyle}>
            <Label>Explore</Label>
          </Flex>
        </Link>
      </Grid>
    </Grid>
  )
}
