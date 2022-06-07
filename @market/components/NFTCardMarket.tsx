import { Text, Box, Flex, Stack, Heading } from '@zoralabs/zord'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useRelevantMarket } from '../hooks/useRelevantMarket'
import { ModalComposition } from '@modal'
import { FillAsk } from '../wizards/FillAsk'
import { lightFont } from './MarketComponents.css'
import { MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTOwner } from './NFTOwner'

export function NFTCardMarket({ nftData }: { nftData: NFTObject }) {
  const { nft, metadata, markets } = nftData
  const { ask } = useRelevantMarket(markets)

  if (!nft || !metadata || ask?.status === MARKET_INFO_STATUSES.INVALID) {
    return null
  }

  return (
    <Flex w="100%">
      {ask && ask.status === MARKET_INFO_STATUSES.ACTIVE ? (
        <Flex w="100%" justify="space-between" align="flex-end">
          <Stack>
            <Text variant="heading-xs" className={lightFont} color="tertiary">
              Price
            </Text>
            <Text variant="heading-xs" className={lightFont}>
              {ask.amount?.amount.value} {ask.amount?.symbol}
            </Text>
          </Stack>
          <ModalComposition
            modalName={`buy-${nft.contract.address}-${nft.tokenId}`}
            trigger={
              <Heading
                px="x6"
                py="x2"
                as="span"
                size="xs"
                color="primary"
                borderRadius="round"
                backgroundColor="tertiary"
              >
                Buy
              </Heading>
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
                  />
                )}
              </Box>
            }
          />
        </Flex>
      ) : (
        <>
          {ask && (
            <>
              {ask?.status === MARKET_INFO_STATUSES.COMPLETE ? (
                <Flex justify="space-between" w="100%">
                  <Stack>
                    <Text variant="label-lg" className={lightFont} color="tertiary">
                      Sold for
                    </Text>
                    <Text variant="heading-xs" className={lightFont}>
                      {ask.amount?.amount.value} {ask.amount?.symbol}
                    </Text>
                  </Stack>
                  <NFTOwner address={ask.raw.properties.buyer} />
                </Flex>
              ) : ask?.status === MARKET_INFO_STATUSES.CANCELED ? (
                <NFTOwner address={nft?.owner?.address} align="left" />
              ) : null}
            </>
          )}
        </>
      )}
    </Flex>
  )
}
