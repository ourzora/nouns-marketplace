import { ImageWithNounFallback } from 'components'
import { MarketStats } from 'components/MarketStats'
import { PageHeader } from 'components/PageHeader'
import { NFTPrevNext } from 'compositions/NFTPage'

import { format } from 'date-fns'

// import { daoHeaderWrapper } from 'styles/styles.css'
import { useAggregate } from 'hooks'
import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'
import { TypeSafeToken } from 'validators/token'

// import { useMemo } from 'react'
import { AddressWithLink } from '@market'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { cardImageWrapper } from '@media/NftMedia.css'
import {
  AuctionCountdown,
  PlaceNounsBid,
  useActiveOGNounishAuction,
  useNounishAuctionQuery,
} from '@noun-auction'
import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { lightFont } from '@shared'
import { useNFT } from '@zoralabs/nft-hooks'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Flex, Grid, GridProps, Heading, Paragraph, Stack } from '@zoralabs/zord'

import * as styles from './CollectionHeader.css'

export interface CollectionHeaderProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
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

interface HeroProps {
  activeAuction: TypeSafeNounsAuction
}

export function CollectionHero({ activeAuction, ...props }: HeroProps) {
  const { token } = useToken({
    collectionAddress: activeAuction.collectionAddress,
    tokenId: activeAuction.tokenId,
  })
  const { data: nftObj } = useNFT(token?.collectionAddress, token?.tokenId)
  const { isEnded: auctionCompleted } = useIsAuctionCompleted({
    activeAuction,
  })

  const { formattedCryptoHighestBidPrice } = useNounishAuctionHelper({
    auction: activeAuction,
  })
  const timeStamp = useMemo(() => {
    if (!nftObj?.nft?.minted.at?.timestamp) return '...'
    return format(new Date(nftObj?.nft?.minted.at?.timestamp), 'LLLL d, yyyy')
  }, [nftObj?.nft?.minted.at?.timestamp])

  return (
    <Grid
      className={['collectionPage-hero', styles.collectionGrid]}
      mt={{ '@initial': 'x6', '@1024': 'x8' }}
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
          <Flex align="center" gap="x4">
            {nftObj && <NFTPrevNext nftObj={nftObj} />}
            <Paragraph className={[lightFont]} color="text3">
              {timeStamp}
            </Paragraph>
          </Flex>
          <Heading size="xl" as="h2">
            {token?.name}
          </Heading>
          <Flex gap="x8">
            <Stack gap="x2">
              <Paragraph className={[lightFont]} color="text3">
                Current bid
              </Paragraph>
              {/* <Paragraph>{activeAuction.highestBidPrice?.nativePrice.decimal}</Paragraph> */}
              <Paragraph>
                {formattedCryptoHighestBidPrice}{' '}
                {activeAuction.highestBidPrice?.nativePrice.currency.name}
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
          </Flex>
          <PlaceNounsBid
            // enableModal={false}
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

  // const { token } = useToken({
  //   collection: collection.address,
  //   tokenId: activeAuction?.tokenId,
  // })
  // const { token } = useToken({ collectionAddress, tokenId: firstTokenID.toString() })

  // const { data: nft } = useNFT(collection.address, activeAuction?.tokenId)

  console.log('activeAuction', activeAuction)

  return (
    <Stack
      w="100%"
      className={[styles.collectionGrid, className]}
      display="grid"
      // gap="x8"
      // gap="x6"
    >
      {activeAuction && (
        <CollectionHero
          activeAuction={activeAuction}
          // token={token}
        />
      )}

      <Flex
        className={['collectionPage-meta', styles.collectionGrid]}
        w="100%"
        justify="space-between"
        alignSelf="flex-start"
      >
        <Stack
          px={{
            '@initial': 'x4',
            '@1024': 'x0',
          }}
          gap={{ '@initial': 'x4', '@1024': 'x6' }}
          align="flex-start"
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
          {/* <Flex
            w="100%"
            justify={{
              '@initial': 'center',
              '@1024': 'flex-start',
            }}
          > */}
          {collection.description && <Paragraph>{collection.description}</Paragraph>}
          <AddressWithLink
            address={collection.address}
            useEns={false}
            backgroundColor="background2"
            px="x4"
            py="x2"
            borderRadius="curved"
            my="x2"
          />
          {/* </Flex> */}
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
