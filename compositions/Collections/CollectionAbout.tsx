import { MarketStats } from 'components/MarketStats'
import { PageHeader } from 'components/PageHeader'
import { LIL_NOUNS_ADDRESS, NOUNS_ADDRESS } from 'constants/nounsAddresses'
import * as siteStyles from 'styles/styles.css'

import { useMemo } from 'react'

import { AddressWithLink, DAOBuilderLink } from '@market'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { lightFont } from '@shared'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Flex, Grid, GridProps, Paragraph, Stack } from '@zoralabs/zord'

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
  const showNounsBuilderLink = useMemo(
    () => ![NOUNS_ADDRESS, LIL_NOUNS_ADDRESS].includes(collection.address),
    [collection.address]
  )

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
                align={{
                  '@initial': 'center',
                  '@1024': 'flex-start',
                }}
                px="x0"
              />
            </Flex>
            {collection.description && (
              <Paragraph className={[lightFont]}>{collection.description}</Paragraph>
            )}

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
            {showNounsBuilderLink && (
              <DAOBuilderLink
                address={collection.address}
                useEns={false}
                backgroundColor="background2"
                px="x4"
                py="x2"
                borderRadius="curved"
              />
            )}
          </Flex>
        </Flex>
      </Stack>
    </Grid>
  )
}
