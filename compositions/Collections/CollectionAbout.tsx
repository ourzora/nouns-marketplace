import { ImageWithNounFallback } from 'components'
import { MarketStats } from 'components/MarketStats'
import { PageHeader } from 'components/PageHeader'
import * as siteStyles from 'styles/styles.css'

import { format } from 'date-fns'

import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'
import { TypeSafeToken } from 'validators/token'

// import { useMemo } from 'react'
import { AddressWithLink, DAOBuilderLink } from '@market'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import {
  AuctionCountdown,
  PlaceNounsBid, // useActiveOGNounishAuction,
  useNounishAuctionQuery,
} from '@noun-auction'
import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { lightFont, useWindowWidth } from '@shared'
import { useNFT } from '@zoralabs/nft-hooks'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Flex, Grid, GridProps, Heading, Paragraph, Stack } from '@zoralabs/zord'

import * as styles from './CollectionHeader.css'

export interface CollectionAboutProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
}

export function CollectionAbout({
  collection,
  children,
  currentAuction,
  className,
  ...props
}: CollectionAboutProps) {
  // const { activeAuction } = useNounishAuctionQuery({
  //   collectionAddress: collection.address,
  // })

  return (
    <Grid
      className={[siteStyles.pageGrid]}
      px={{ '@initial': 'x0', '@1024': 'x4' }}
      alignSelf="center"
    >
      <Stack
        w="100%"
        className={[styles.collectionGrid, className]}
        display="grid"
        mt={{ '@initial': 'x6', '@1024': 'x8' }}
        px={{
          '@initial': 'x4',
          '@1024': 'x0',
        }}
      >
        {/* {activeAuction && <CollectionHero activeAuction={activeAuction} />} */}
        <Flex
          className={['collectionPage-meta', styles.collectionGrid, styles.activeAuction]}
          direction={{ '@initial': 'column', '@1024': 'row' }}
          w="100%"
          justify="space-between"
          alignSelf="flex-start"
        >
          <Stack gap={{ '@initial': 'x4', '@1024': 'x6' }} align="flex-start">
            <Flex
              align="center"
              direction={{ '@initial': 'column', '@1024': 'row' }}
              gap={{ '@initial': 'x2', '@1024': 'x4' }}
            >
              <CollectionThumbnail
                className={styles.collectionThumb}
                collectionAddress={collection.address}
                radius="round"
                m="auto"
                size="md"
                h="100%"
                w="100%"
              />
              <PageHeader
                headline={collection.name ?? ''}
                // copy={`${nftCount ?? '...'} NFTs`}
                align={{
                  '@initial': 'center',
                  '@1024': 'flex-start',
                }}
                px="x0"
              />
            </Flex>
            {/* {collection.description && <Paragraph className={[lightFont]}>{collection.description}</Paragraph>} */}

            <Paragraph className={[lightFont]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deserunt
              quidem quos architecto ducimus atque minima qui aliquid est beatae
              doloremque, magnam, eligendi nihil sed. Voluptatum ipsum beatae eius cumque?
            </Paragraph>
            <MarketStats contractAddress={collection.address} />
          </Stack>
          <Flex
            w="100%"
            gap="x2"
            direction="column"
            alignSelf="flex-start"
            align={{
              '@initial': 'flex-start',
              '@1024': 'flex-end',
            }}
            justify={{
              '@initial': 'center',
              '@1024': 'flex-end',
            }}
          >
            <AddressWithLink
              address={collection.address}
              useEns={false}
              backgroundColor="background2"
              px="x4"
              py="x2"
              borderRadius="curved"
            />
            <DAOBuilderLink
              address={collection.address}
              useEns={false}
              backgroundColor="background2"
              px="x4"
              py="x2"
              borderRadius="curved"
            />
          </Flex>
        </Flex>
      </Stack>
    </Grid>
  )
}
