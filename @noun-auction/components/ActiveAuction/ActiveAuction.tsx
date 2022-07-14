import { useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Stack, Flex, Heading, FlexProps, Separator, Button, Box } from '@zoralabs/zord'
import { useNFT } from '@zoralabs/nft-hooks'

// @noun-auction
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { AuctionCountdown, AuctionBidder, AuctionHighBid } from '../DataRenderers'
import { PlaceNounsBid } from '../BidUi/PlaceNounsBid'

// @shared
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { numberFormatter } from 'utils/numbers'
import { roundTwoDecimals } from 'utils/math'

interface ActiveAuctionProps extends FlexProps {
  hideThumbnail: boolean
  hideTitle: boolean
  hideCollectionTitle: boolean
  useModal?: boolean
  routePrefix?: string
  flexDirection: 'row' | 'column'
  wrapperDirection: 'row' | 'column'
  thumbnailSize?: 'lg' | 'xxs' | 'xs' | 'sm' | 'md' | undefined
}

export function ActiveAuction({
  hideThumbnail,
  hideTitle,
  hideCollectionTitle,
  routePrefix,
  flexDirection,
  wrapperDirection,
  thumbnailSize,
  useModal,
  ...props
}: ActiveAuctionProps) {
  const router = useRouter()
  const { data, auctionConfigParams, isComplete } = useNounishAuctionProvider()

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
      {tokenData ? (
        <>
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
            <Stack justify="space-between">
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
            </Stack>
            {!isComplete ? (
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
            ) : (
              <Flex>
                <AuctionBidder
                  address={auctionData.bidder.address}
                  txHash={auctionData.bidder.txHash}
                  layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
                  label="Winning Bid"
                />
              </Flex>
            )}
          </Flex>
          {!isComplete && (
            <Flex align="flex-end" justify="flex-end">
              <Stack w="100%">
                {!useModal && <Separator mt="x1" />}
                <PlaceNounsBid useModal={useModal} />
              </Stack>
            </Flex>
          )}
        </>
      ) : null}
    </Flex>
  )
}
