import { useMemo } from 'react'
import { Grid, Flex, Label } from '@zoralabs/zord'
import { CollectionsData } from 'hooks/zdk/useCollections'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { rankingRow, rankingStats } from './CollectionRanking.css'
import { Link } from 'components/Link'
import { buttonStyle } from 'styles/styles.css'
import { roundTwoDecimals } from 'utils/math'

/* todo: add a skeleton or some kind of loading state */

export function RankingRow({ collection }: { collection: CollectionsData }) {
  const collectionVolume = useMemo(
    () => roundTwoDecimals(collection.aggregateStat.salesVolume.chainTokenPrice),
    [collection]
  )

  const collectionFloor = useMemo(
    () =>
      collection.aggregateStat?.floorPrice &&
      collection.aggregateStat?.floorPrice !== null
        ? roundTwoDecimals(collection.aggregateStat.floorPrice)
        : 'NA',
    [collection]
  )

  return (
    <Grid className={rankingRow}>
      <Flex align="center" gap="x4">
        <CollectionThumbnail collectionAddress={collection.collectionInfo.address} />
        <Label size="lg">{collection.collectionInfo.name}</Label>
      </Flex>
      <Grid className={rankingStats}>
        <Label size="lg" align="right">
          {collectionVolume}&nbsp;ETH
        </Label>
        <Label size="lg" align="right">
          {collection.aggregateStat.nftCount}
        </Label>
        <Label size="lg" align="right">
          {collectionFloor} ETH
        </Label>
        <Label size="lg" align="right">
          {collection.aggregateStat.ownerCount}
        </Label>
        <Link href={`/collections/${collection.collectionInfo.address}`} passHref>
          <Flex className={buttonStyle}>
            <Label>Explore</Label>
          </Flex>
        </Link>
      </Grid>
    </Grid>
  )
}
