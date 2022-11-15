import { PageHeader } from 'components/PageHeader'
import { collectionHeaderWrapper, daoHeaderWrapper } from 'styles/styles.css'

import { useAggregate } from 'hooks'

import { useMemo } from 'react'

import { AddressWithLink } from '@market'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Flex, Grid, GridProps, Paragraph, Stack } from '@zoralabs/zord'

export interface CollectionHeaderProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
  layout?: 'dao' | 'collection'
}

type Props = {
  collectionAddress: string
  name: string
  layout: string
}

export function PageHeaderWithStats({ collectionAddress, name, layout }: Props) {
  const { aggregate } = useAggregate(collectionAddress)

  return useMemo(
    () => (
      <PageHeader
        headline={name}
        copy={`${aggregate?.aggregateStat?.nftCount ?? '...'} NFTs`}
        align={{
          '@initial': 'center',
          '@1024': layout === 'collection' ? 'center' : 'flex-start',
        }}
        px={layout === 'collection' ? 'x4' : 'x0'}
      />
    ),
    [aggregate?.aggregateStat?.nftCount]
  )
}

export function CollectionHeader({
  collection,
  children,
  currentAuction,
  layout = 'collection',
  className,
  ...props
}: CollectionHeaderProps) {
  return (
    <Grid
      className={[
        collectionHeaderWrapper,
        layout === 'dao' ? daoHeaderWrapper : 'collections-header-wrapper',
        className,
      ]}
      mt={{ '@initial': 'x6', '@1024': 'x8' }}
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
          <Flex
            align="center"
            direction={{ '@initial': 'column', '@1024': 'row' }}
            gap={{ '@initial': 'x2', '@1024': 'x4' }}
          >
            <CollectionThumbnail
              collectionAddress={collection.address}
              radius="round"
              m="auto"
              size="lg"
              h={layout === 'dao' ? '100%' : 'auto'}
              w="100%"
              style={{ justifyContent: 'center' }}
            />
            <PageHeaderWithStats
              collectionAddress={collection.address}
              layout={layout}
              name={collection.name ?? ''}
            />
          </Flex>
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
              backgroundColor="background2"
              px="x4"
              py="x2"
              borderRadius="curved"
              my="x2"
            />
          </Flex>
          {collection.description && <Paragraph>{collection.description}</Paragraph>}
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
