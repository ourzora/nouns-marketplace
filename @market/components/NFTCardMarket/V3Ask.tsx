import { Text, Box, Flex, Stack, FlexProps, Button } from '@zoralabs/zord'
import { MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useRelevantMarket } from '@market/hooks'
import { FillAsk, NFTOwner } from '@market/components'
import { ModalComposition, useModal } from '@modal'

import { lightFont } from '../MarketComponents.css'
import { useIsOwner } from '@market/hooks/useIsOwner'

export interface V3AskProps extends FlexProps {
  nftData: NFTObject
}

export function V3Ask({ nftData, ...props }: V3AskProps) {
  const { nft, metadata, markets } = nftData
  const { ask } = useRelevantMarket(markets)

  const { requestClose } = useModal()
  const { isOwner } = useIsOwner(nftData)

  if (!nft || !metadata || ask?.status === MARKET_INFO_STATUSES.INVALID) {
    return null
  }

  return (
    <>
      {ask && ask.status === MARKET_INFO_STATUSES.ACTIVE ? (
        <Flex
          id="v3-ask-active"
          w="100%"
          justify="space-between"
          align="flex-end"
          gap="x2"
          {...props}
        >
          <Stack>
            <Text variant="heading-xs" className={lightFont} color="tertiary">
              Price
            </Text>
            <Text variant="heading-xs" className={lightFont}>
              {ask.amount?.amount.value} {ask.amount?.symbol}
            </Text>
          </Stack>
          {!isOwner ? (
            <ModalComposition
              modalName={`buy-${nft.contract.address}-${nft.tokenId}`}
              trigger={
                <Button
                  as="span"
                  variant="secondary"
                  size="sm"
                  borderRadius="round"
                  className="zora-market-cardMarketTrigger"
                >
                  Buy
                </Button>
              }
              content={
                <Box p="x8">
                  {ask.amount && (
                    <FillAsk
                      marketSummary={markets}
                      tokenAddress={nft.contract.address}
                      tokenId={nft.tokenId}
                      tokenName={metadata.name}
                      askCurrency={ask.amount.address}
                      askPrice={ask.amount.amount.raw}
                      nftData={nftData}
                      onClose={requestClose}
                    />
                  )}
                </Box>
              }
            />
          ) : (
            <Button disabled borderRadius="curved" size="md">
              Manage
            </Button>
          )}
        </Flex>
      ) : (
        <>
          {ask && (
            <>
              {ask?.status === MARKET_INFO_STATUSES.COMPLETE ? (
                <Flex id="v3-ask-complete" justify="space-between" w="100%" {...props}>
                  <Stack>
                    <Text variant="label-lg" className={lightFont} color="tertiary">
                      Sold on Chain for
                    </Text>
                    <Text variant="heading-xs" className={lightFont}>
                      {ask.amount?.amount.value} {ask.amount?.symbol}
                    </Text>
                  </Stack>
                  <NFTOwner address={ask.raw.properties.buyer} />
                </Flex>
              ) : (
                <NFTOwner address={nft?.owner?.address} align="left" />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
