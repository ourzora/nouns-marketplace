import { Stack, Paragraph, GridProps, Grid, Flex } from '@zoralabs/zord'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { AddressWithLink } from '@market'
import { PageHeader } from '../../components/PageHeader'
import {
  clickAnimation,
  collectionHeaderWrapper,
  daoHeaderWrapper,
  collectionNameThumbDao,
} from 'styles/styles.css'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useAggregate } from 'hooks'

export interface CollectionHeaderProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
  layout?: 'dao' | 'collection'
}

export function CollectionHeader({
  collection,
  children,
  currentAuction,
  layout = 'collection',
  ...props
}: CollectionHeaderProps) {
  const { aggregate } = useAggregate(collection.address)

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
            gap={{
              '@initial': 'x0',
              '@1024': layout === 'dao' ? 'x0' : 'x3',
            }}
          >
            <Stack
              h={layout === 'dao' ? '100%' : 'auto'}
              align={layout === 'dao' ? 'center' : 'flex-start'}
              w="100%"
              position="relative"
            >
              <CollectionThumbnail
                collectionAddress={collection.address}
                radius="round"
                m="auto"
                size="lg"
              />
            </Stack>
            <PageHeader
              headline={collection.name}
              copy={`${
                aggregate?.aggregateStat?.nftCount
                  ? aggregate?.aggregateStat?.nftCount
                  : '...'
              } NFTs`}
              align={{
                '@initial': 'center',
                '@1024': layout === 'collection' ? 'center' : 'flex-start',
              }}
              px={layout === 'collection' ? 'x4' : 'x0'}
              py={{
                '@initial': 'x0',
                '@1024': layout === 'dao' ? 'x4' : 'x0',
              }}
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
