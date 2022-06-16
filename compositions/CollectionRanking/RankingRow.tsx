import { useMemo, useState } from 'react'
import { Grid, Flex, Label, Separator } from '@zoralabs/zord'
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
        volume: `${roundTwoDecimals(
          aggregate.aggregateStat.salesVolume.chainTokenPrice
        )} ETH`,
        floor:
          aggregate.aggregateStat?.floorPrice &&
          aggregate.aggregateStat?.floorPrice !== null
            ? `${roundTwoDecimals(aggregate.aggregateStat.floorPrice)} ETH`
            : 'NA',
      }
  }, [aggregate])

  return (
    <Link href={`/collections/${collection.address}`} passHref>
      <Grid className={rankingRow} gap="x4">
        <Flex align="center" gap="x4">
          <CollectionThumbnail collectionAddress={collection.address} tokenId={tokenNo} />
          <Label size="lg" as="span">
            {collection.name}
          </Label>
        </Flex>
        <Grid className={rankingStats}>
          <Label size="lg" as="span" align="right">
            {aggregate ? <>{collectionPriceData?.volume}</> : '...'}
          </Label>
          <Label size="lg" as="span" align="right">
            {aggregate?.aggregateStat?.nftCount}
          </Label>
          <Label size="lg" as="span" align="right">
            {aggregate ? <>{collectionPriceData?.floor}</> : '...'}
          </Label>
          <Label size="lg" as="span" align="right">
            {aggregate?.aggregateStat?.ownerCount}
          </Label>
          <Flex className={buttonStyle}>
            <Label>Explore</Label>
          </Flex>
        </Grid>
      </Grid>
    </Link>
  )
}
