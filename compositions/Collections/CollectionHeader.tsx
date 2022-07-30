import { Stack, Paragraph, GridProps, Grid, Flex } from '@zoralabs/zord'
import {
  Collection,
  CollectionStatsAggregateQuery,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import { AddressWithLink } from '@market'
import { PageHeader } from '../../components/PageHeader'
import {
  clickAnimation,
  collectionHeaderWrapper,
  daoHeaderWrapper,
  collectionNameThumbDao,
} from 'styles/styles.css'
import { MAX_WIDTH } from 'styles/style-constants'
import { CollectionThumbnail } from '@media/CollectionThumbnail'

export interface CollectionHeaderProps extends GridProps {
  collection: Collection
  aggregateStats: CollectionStatsAggregateQuery
  children?: JSX.Element
  currentAuction?: JSX.Element | null
  layout?: 'dao' | 'collection'
}

export function CollectionHeader({
  collection,
  aggregateStats,
  children,
  currentAuction,
  layout = 'collection',
  ...props
}: CollectionHeaderProps) {
  return (
    <Grid
      className={[
        collectionHeaderWrapper,
        layout === 'dao' ? daoHeaderWrapper : 'collections-header-wrapper',
      ]}
      {...props}
    >
      <Stack
        align={{
          '@initial': 'center',
          '@1024': layout === 'collection' ? 'center' : 'flex-start',
        }}
        gap="x4"
      >
        <Stack
          gap="x2"
          px={{
            '@initial': 'x4',
            '@1024': 'x0',
          }}
        >
          <Grid
            className={[layout === 'dao' ? collectionNameThumbDao : '']}
            align="center"
            pt={{
              '@initial': 'x6',
              '@1024': 'x0',
            }}
          >
            <CollectionThumbnail
              collectionAddress={collection.address}
              radius="round"
              m="auto"
            />
            <PageHeader
              headline={collection.name}
              copy={`${aggregateStats.aggregateStat.nftCount} NFTs`}
              align={{
                '@initial': 'center',
                '@1024': layout === 'collection' ? 'center' : 'flex-start',
              }}
              px={layout === 'collection' ? 'x4' : 'x0'}
            />
          </Grid>
          <Flex
            w="100%"
            justify={{
              '@initial': 'center',
              '@1024': layout === 'dao' ? 'flex-start' : 'center',
            }}
          >
            <AddressWithLink
              address={collection.address}
              useEns={false}
              className={clickAnimation}
              backgroundColor="tertiary"
              px="x4"
              py="x2"
              borderRadius="curved"
              mt="x2"
              mb="x2"
            />
          </Flex>
          {collection.description !== "''" && collection.description && (
            <Paragraph>{collection.description}</Paragraph>
          )}
        </Stack>
        <Flex
          w="100%"
          justify={{
            '@initial': 'center',
            '@1024': layout === 'dao' ? 'flex-start' : 'center',
          }}
        >
          {children}
        </Flex>
      </Stack>
      {currentAuction && (
        <Flex
          w="100%"
          justify={{
            '@initial': 'center',
            '@1024': 'flex-end',
          }}
          pt={{
            '@initial': 'x4',
          }}
          px={{
            '@initial': 'x4',
          }}
        >
          {currentAuction}
        </Flex>
      )}
    </Grid>
  )
}
