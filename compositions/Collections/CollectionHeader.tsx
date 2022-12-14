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

export interface CollectionHeaderProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
}

// type Props = {
//   collectionAddress: string
//   name: string
//   layout: string
// }

// export function PageHeaderWithStats({ collectionAddress, name, layout }: Props) {
//   const { nftCount } = useAggregate(collectionAddress)

//   return (
//     <PageHeader
//       headline={name}
//       copy={`${nftCount ?? '...'} NFTs`}
//       align={{
//         '@initial': 'center',
//         '@1024': layout === 'collection' ? 'center' : 'flex-start',
//       }}
//       px={layout === 'collection' ? 'x4' : 'x0'}
//     />
//   )
// }

interface HeroProps {
  activeAuction: TypeSafeNounsAuction
}

export function CollectionHero({ activeAuction, ...props }: HeroProps) {
  const { isLarge } = useWindowWidth()
  const { token } = useToken({
    collectionAddress: activeAuction.collectionAddress,
    tokenId: activeAuction.tokenId,
  })
  const { data: nftObj } = useNFT(token?.collectionAddress, token?.tokenId)
  const { isEnded: auctionCompleted } = useIsAuctionCompleted({
    activeAuction,
  })

  const { formattedCryptoHighestBidPrice, highestBidder } = useNounishAuctionHelper({
    auction: activeAuction,
  })
  // const timeStamp = useMemo(() => {
  //   if (!nftObj?.nft?.minted.at?.timestamp) return '...'
  //   return format(new Date(nftObj?.nft?.minted.at?.timestamp), 'LLLL d, yyyy')
  // }, [nftObj?.nft?.minted.at?.timestamp])

  return (
    <Grid
      className={['collectionPage-hero', styles.collectionGrid]}
      // mt={{ '@initial': 'x6', '@1024': 'x8' }}
      borderColor="negative"
      w="100%"
      {...props}
    >
      <Grid className={[styles.activeAuction]}>
        <Flex className={[styles.activeAuctionImage]}>
          {token && (
            <ImageWithNounFallback token={token} pos="relative" borderRadius="phat" />
          )}
        </Flex>
        <Stack className={[styles.activeAuctionForm]} justify="center" gap="x6">
          {/* <Flex align="center" gap="x4">
            {nftObj && <NFTPrevNext nftObj={nftObj} />}
            <Paragraph className={[lightFont]} color="text3">
              {timeStamp}
            </Paragraph>
          </Flex> */}
          <Heading size={isLarge ? 'xl' : 'lg'} as="h2">
            {token?.name}
          </Heading>
          <Flex gap="x8">
            <Stack gap="x2">
              <Paragraph className={[lightFont]} color="text3">
                Current bid
              </Paragraph>
              <Paragraph>
                {`${formattedCryptoHighestBidPrice} ${activeAuction.highestBidPrice?.nativePrice.currency.name}`}
              </Paragraph>
            </Stack>
            <Stack gap="x2">
              <Paragraph className={[lightFont]} color="text3">
                Auction ends in
              </Paragraph>

              <AuctionCountdown
                auctionEndTime={activeAuction.endTime}
                auctionStartTime={activeAuction.startTime}
                auctionCompleted={auctionCompleted}
              />
            </Stack>
            {highestBidder && (
              <Stack gap="x2">
                <Paragraph className={[lightFont]} color="text3">
                  Top bidder
                </Paragraph>
                <AddressWithLink address={highestBidder} />
              </Stack>
            )}
          </Flex>
          <PlaceNounsBid
            layout="collectionHero"
            collectionAddress={activeAuction.collectionAddress}
            tokenId={activeAuction.tokenId}
          />
          {!activeAuction.firstBidTime && (
            <Paragraph className={[lightFont]} color="text3">
              No bids yet
            </Paragraph>
          )}
        </Stack>
      </Grid>
    </Grid>
  )
}

export function CollectionHeader({
  collection,
  children,
  currentAuction,
  className,
  ...props
}: CollectionHeaderProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress: collection.address,
  })

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
        {activeAuction && <CollectionHero activeAuction={activeAuction} />}
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
