import { useMemo, useState } from 'react'
import { Grid, Flex, Label, Separator } from '@zoralabs/zord'
import { CollectionsData } from 'hooks/zdk/useCollections'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { rankingRow, rankingStats } from './CollectionRanking.css'
import { Link } from 'components/Link'
import { buttonStyle } from 'styles/styles.css'
import { roundTwoDecimals } from 'utils/math'
import { useAggregate } from 'hooks/zdk/useAggregate'
import { numberFormatter } from 'utils/numbers'

/* todo: add a skeleton or some kind of loading state */

export function RankingRow({ collection }: { collection: CollectionsData }) {
  const [tokenNo, updateTokenNo] = useState('1')
  const { aggregate } = useAggregate(collection.address)

  const collectionPriceData = useMemo(() => {
    if (aggregate)
      return {
        volume: `${roundTwoDecimals(
          aggregate?.aggregateStat?.salesVolume?.chainTokenPrice
        )} ETH`,
        floor:
          aggregate?.aggregateStat?.floorPrice &&
          aggregate?.aggregateStat?.floorPrice !== null
            ? `${numberFormatter(
                roundTwoDecimals(aggregate.aggregateStat.floorPrice)
              )} ETH`
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
            {aggregate ? (
              <>{numberFormatter(collectionPriceData?.volume || 0)} Ξ</>
            ) : (
              '...'
            )}
          </Label>
          <Label size="lg" as="span" align="right">
            {numberFormatter(aggregate?.aggregateStat?.nftCount || 0)}
          </Label>
          <Label size="lg" as="span" align="right">
            {aggregate ? (
              <>
                {collectionPriceData?.floor &&
                collectionPriceData.floor.includes('NaN') ? (
                  <>{numberFormatter(collectionPriceData?.floor)} Ξ</>
                ) : (
                  <>n/a</>
                )}
              </>
            ) : (
              '...'
            )}
          </Label>
          <Label size="lg" as="span" align="right">
            {numberFormatter(aggregate?.aggregateStat?.ownerCount || '0')}
          </Label>
          <Flex className={buttonStyle}>
            <Label>Explore</Label>
          </Flex>
        </Grid>
      </Grid>
    </Link>
  )
}
