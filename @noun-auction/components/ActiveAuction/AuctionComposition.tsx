import { useMemo, useCallback } from 'react'
import { Stack, Flex, Heading, FlexProps, Separator, Button, Box } from '@zoralabs/zord'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { numberFormatter } from 'utils/numbers'
import { roundTwoDecimals } from 'utils/math'
import { AuctionCountdown, AuctionBidder, AuctionHighBid } from '../DataRenderers'
import { useNFT } from '@zoralabs/nft-hooks'
import { PlaceNounsBid } from './BidUi/PlaceNounsBid'
import { useRouter } from 'next/router'

interface AuctionCompositionProps extends FlexProps {
  hideThumbnail: boolean
  hideTitle: boolean
  hideCollectionTitle: boolean
  useModal?: boolean
  routePrefix?: string
  flexDirection: 'row' | 'column'
  wrapperDirection: 'row' | 'column'
  thumbnailSize?: 'lg' | 'xxs' | 'xs' | 'sm' | 'md' | undefined
}

export function AuctionComposition({
  hideThumbnail,
  hideTitle,
  hideCollectionTitle,
  routePrefix,
  flexDirection,
  wrapperDirection,
  thumbnailSize,
  useModal,
  ...props
}: AuctionCompositionProps) {
  const router = useRouter()

  const { data, auctionConfigParams } = useNounishAuctionProvider()

  if (!data) return null

  const marketData = data.markets?.nodes[0]?.market
  const marketProperties = marketData?.properties

  const { data: tokenData } = useNFT(
    auctionConfigParams?.contractAddress,
    auctionConfigParams?.tokenId
  )

  /**
   * Normalze auctionData
   */

  const auctionData = useMemo(() => {
    return {
      countdown: {
        startTime: marketProperties?.startTime,
        endTime: marketProperties?.endTime,
      },
      highBid: {
        ethValue: marketProperties?.highestBidPrice?.chainTokenPrice?.decimal,
        usdcValue: numberFormatter(
          roundTwoDecimals(marketProperties?.highestBidPrice?.usdcPrice?.decimal)
        ),
      },
      bidder: {
        address: marketProperties?.highestBidder,
        txHash: marketData?.transactionInfo.transactionHash,
      },
    }
  }, [data])

  /* Make this router pattern optional / customizeable */
  const contractLinkHandler = useCallback((e) => {
    e.preventDefault()
    router.push(`/${routePrefix}/${auctionConfigParams?.contractAddress.toLowerCase()}`)
  }, [])

  const tokenLinkHandler = useCallback((e) => {
    e.preventDefault()
    router.push(
      `/${routePrefix}/${auctionConfigParams?.contractAddress.toLowerCase()}/${
        auctionConfigParams?.tokenId
      }`
    )
  }, [])

  return (
    <Flex p="x4" gap="x4" direction={wrapperDirection} justify="space-between" {...props}>
      <Flex gap="x4" w="100%">
        {!hideThumbnail && (
          <Button onClick={tokenLinkHandler} variant="unset">
            <CollectionThumbnail
              collectionAddress={auctionConfigParams?.contractAddress}
              tokenId={auctionConfigParams?.tokenId}
              size={thumbnailSize}
            />
          </Button>
        )}
        <Stack justify="space-between" w="100%">
          {tokenData && !hideTitle && (
            <Heading size="sm" as="h3">
              {tokenData?.metadata?.name
                ? tokenData?.metadata?.name
                : `${tokenData?.nft?.contract?.name} ${tokenData?.nft?.tokenId}`}
            </Heading>
          )}
          {tokenData && !hideCollectionTitle && (
            <Box mb="x1">
              <Button onClick={contractLinkHandler} variant="unset" color="tertiary">
                {tokenData?.nft?.contract?.name}
              </Button>
            </Box>
          )}
          {data && (
            <Flex
              gap={hideTitle || flexDirection === 'row' ? 'x4' : 'x0'}
              direction={flexDirection}
              w="100%"
            >
              <AuctionBidder
                address={auctionData.bidder.address}
                txHash={auctionData.bidder.txHash}
                layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              />
              <AuctionCountdown
                startTime={auctionData.countdown.startTime}
                endTime={auctionData.countdown.endTime}
                layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              />
              <AuctionHighBid
                ethValue={auctionData.highBid.ethValue}
                usdcValue={auctionData.highBid.usdcValue}
                layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              />
            </Flex>
          )}
        </Stack>
      </Flex>
      <Flex align="flex-end" justify="flex-end">
        <Stack w="100%">
          {!useModal && <Separator mt="x1" />}
          <PlaceNounsBid useModal={useModal} />
        </Stack>
      </Flex>
    </Flex>
  )
}
