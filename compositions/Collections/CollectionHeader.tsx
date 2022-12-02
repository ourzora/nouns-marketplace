import { MarketStats } from 'components/MarketStats'
import { PageHeader } from 'components/PageHeader'

// import { daoHeaderWrapper } from 'styles/styles.css'
import { useAggregate } from 'hooks'

// import { useMemo } from 'react'
import { AddressWithLink } from '@market'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useActiveOGNounishAuction, useNounishAuctionQuery } from '@noun-auction'
import { useNFT } from '@zoralabs/nft-hooks'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Flex, Grid, GridProps, Paragraph, Stack } from '@zoralabs/zord'

import * as styles from './CollectionHeader.css'

export interface CollectionHeaderProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
  // layout?: 'dao' | 'collection'
}

type Props = {
  collectionAddress: string
  name: string
  layout: string
}

export function PageHeaderWithStats({ collectionAddress, name, layout }: Props) {
  const { nftCount } = useAggregate(collectionAddress)

  return (
    <PageHeader
      headline={name}
      copy={`${nftCount ?? '...'} NFTs`}
      align={{
        '@initial': 'center',
        '@1024': layout === 'collection' ? 'center' : 'flex-start',
      }}
      px={layout === 'collection' ? 'x4' : 'x0'}
    />
  )
}

export function CollectionHeader({
  collection,
  children,
  currentAuction,
  // layout = 'collection',
  className,
  ...props
}: CollectionHeaderProps) {
  // const { dao } = useOneNounsDao({ collectionAddress })
  // const { dao } = useActiveOGNounishAuction({ collectionAddress })
  // const { dao } = useActiveOGNounishAuction({ collectionAddress })
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress: collection.address,
  })

  const { data: nft } = useNFT(collection.address, activeAuction?.tokenId)

  console.log('activeAuction', activeAuction)

  return (
    <Stack w="100%" className={[styles.daoPageHero, className]} display="grid">
      <Grid
        className={[styles.activeAuction]}
        mt={{ '@initial': 'x6', '@1024': 'x8' }}
        borderColor="negative"
        w="100%"
        {...props}
      >
        <Stack
          align={{
            '@initial': 'center',
            '@1024': 'flex-start',
          }}
          gap="x4"
        >
          {nft && <Flex> MAIN IMAGE GOES HERE{nft?.nft?.tokenId}</Flex>}
        </Stack>
      </Grid>
      <Flex w="100%" justify="space-between" alignSelf="flex-start">
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
              h="100%"
              w="100%"
              style={{ justifyContent: 'center' }}
            />
            <PageHeaderWithStats
              collectionAddress={collection.address}
              layout="dao"
              name={collection.name ?? ''}
            />
          </Flex>
          <Flex
            w="100%"
            justify={{
              '@initial': 'center',
              '@1024': 'flex-start',
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
          // alignItems="flex-start"
          alignSelf="flex-start"
          justify={{
            '@initial': 'center',
            '@1024': 'flex-end',
          }}
        >
          <MarketStats contractAddress={collection.address} />
        </Flex>
      </Flex>
    </Stack>
  )
}
