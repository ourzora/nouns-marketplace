import { useMemo, useCallback } from 'react'
import { Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { CardMarketTrigger, NftInfo } from '@market'
import { NounsBidForm } from './NounsBidForm'
import { NounishAuctionContractProvider } from '@noun-auction/providers'

export function PlaceNounsBid({ useModal = true }: { useModal?: boolean }) {
  const { data, auctionConfigParams, auctionContractAddress } =
    useNounishAuctionProvider()

  if (!data) return null

  const tokenInfo = useMemo(() => {
    const currentBidAmount =
      data.markets?.nodes[0]?.market?.properties?.highestBidPrice?.chainTokenPrice
    return {
      collectionAddress: data?.markets.nodes[0].market.collectionAddress,
      currentBidAmount: currentBidAmount?.decimal,
      rawCurrentBidAmount: currentBidAmount?.raw,
    }
  }, [data, data?.markets])

  const handleOnConfirmation = useCallback((hash: string, amount: string) => {
    console.log('confirmed')
  }, [])

  if (!auctionContractAddress) {
    return null
  }

  return (
    <NounishAuctionContractProvider auctionContractAddress={auctionContractAddress}>
      {useModal ? (
        <ModalComposition
          modalName={`nouns-bid-${auctionConfigParams?.tokenId}`}
          trigger={<CardMarketTrigger cta="Place Bid" />}
          content={
            <Stack p="x8">
              <NftInfo
                collectionAddress={tokenInfo.collectionAddress}
                tokenId={auctionConfigParams?.tokenId}
              />
              <NounsBidForm
                mt="x4"
                tokenAddress={tokenInfo.collectionAddress}
                tokenId={auctionConfigParams?.tokenId}
                currentBidAmount={tokenInfo.currentBidAmount}
                rawCurrentBidAmount={tokenInfo.rawCurrentBidAmount}
                onConfirmation={handleOnConfirmation}
              />
            </Stack>
          }
        />
      ) : (
        <NounsBidForm
          mt="x4"
          w="100%"
          tokenAddress={tokenInfo.collectionAddress}
          tokenId={auctionConfigParams?.tokenId}
          currentBidAmount={tokenInfo.currentBidAmount}
          rawCurrentBidAmount={tokenInfo.rawCurrentBidAmount}
          onConfirmation={handleOnConfirmation}
        />
      )}
    </NounishAuctionContractProvider>
  )
}
