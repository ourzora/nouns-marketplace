import { Link } from 'components/Link'

import { CollectionsData, useAggregate } from 'hooks'

import { useMemo } from 'react'

import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { CollectionLink, numberFormatter, roundTwoDecimals } from '@shared'
import { Flex, Grid, Label, Stack, StackProps } from '@zoralabs/zord'

import {
  rankingRow,
  rankingRowInfo,
  rankingRowLink,
  rankingStats,
} from './CollectionRanking.css'

/* todo: add a skeleton or some kind of loading state */

interface RankingRowProps extends StackProps {
  collection: CollectionsData
}

export function RankingRow({ collection, ...props }: RankingRowProps) {
  const { aggregate } = useAggregate(collection.address)

  const collectionPriceData = useMemo(() => {
    if (aggregate)
      return {
        volume: `${roundTwoDecimals(
          aggregate?.aggregateStat?.salesVolume?.chainTokenPrice
        )} ETH`,
        floor: aggregate?.aggregateStat?.floorPrice
          ? `${numberFormatter(roundTwoDecimals(aggregate.aggregateStat.floorPrice))} ETH`
          : 'NA',
      }
  }, [aggregate])

  return (
    <Stack {...props}>
      <Link href={`/collections/${collection.address}`} passHref>
        <Grid className={[rankingRow]}>
          <Flex className={[rankingRowInfo, 'collection-row__collection-info']}>
            <CollectionThumbnail
              collectionAddress={collection.address}
              tokenId="1"
              radius="round"
              size="sm"
            />
            <Label size="lg" as="span">
              {collection.name}
            </Label>
          </Flex>
          <Grid className={[rankingStats, 'collection-row__stats']}>
            <Stack as="p">
              <Label
                size="md"
                as="span"
                color="text3"
                display={{ '@initial': 'inline', '@1024': 'none' }}
              >
                Volume
              </Label>
              <Label size="md" as="span">
                {aggregate ? (
                  <>{numberFormatter(collectionPriceData?.volume || 0)} ETH</>
                ) : (
                  '...'
                )}
              </Label>
            </Stack>
            <Stack as="p">
              <Label
                size="md"
                as="span"
                color="text3"
                display={{ '@initial': 'inline', '@1024': 'none' }}
              >
                Items
              </Label>
              <Label size="md" as="span">
                {numberFormatter(aggregate?.aggregateStat?.nftCount || 0)}
              </Label>
            </Stack>
            <Stack as="p">
              <Label
                size="md"
                as="span"
                color="text3"
                display={{ '@initial': 'inline', '@1024': 'none' }}
              >
                Floor price
              </Label>
              <Label size="md" as="span">
                {aggregate ? (
                  <>
                    {collectionPriceData?.floor &&
                    collectionPriceData.floor.includes('NaN') ? (
                      <>{numberFormatter(collectionPriceData?.floor)} ETH</>
                    ) : (
                      <>n/a</>
                    )}
                  </>
                ) : (
                  '...'
                )}
              </Label>
            </Stack>
            <Stack as="p">
              <Label
                size="md"
                as="span"
                color="text3"
                display={{ '@initial': 'inline', '@1024': 'none' }}
              >
                Owners
              </Label>
              <Label size="md" as="span">
                {numberFormatter(aggregate?.aggregateStat?.ownerCount || '0')}
              </Label>
            </Stack>
          </Grid>
          <Flex className={rankingRowLink}>
            <CollectionLink
              variant="secondary"
              contractAddress={collection.address}
              style={{ height: 42 }}
            >
              View
            </CollectionLink>
          </Flex>
        </Grid>
      </Link>
    </Stack>
  )
}
