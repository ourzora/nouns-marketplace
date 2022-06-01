import { useMemo } from 'react'
import { formatCryptoVal } from '../utils/numbers'
import { Text, Button, Box, Flex, Stack } from '@zoralabs/zord'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useRelevantMarket } from '../hooks/useRelevantMarket'
import { ModalComposition } from '@modal'
import { FillAsk } from '../wizards/FillAsk'
import { buttonStyle, lightFont } from './MarketComponents.css'

/* MARKETS_SUMMARY TYPE? */
export function NFTCardMarket({ nftData }: { nftData: NFTObject }) {
  const {
    nft,
    metadata,
    rawData: { marketsSummary },
  } = nftData

  const {
    ask: {
      price: { nativePrice },
      status,
    },
  } = useRelevantMarket(marketsSummary)

  const cryptoVal = useMemo(() => `${formatCryptoVal(nativePrice.raw)} ETH`, [])

  if (!nft || !metadata) {
    return null
  }

  return (
    <Flex w="100%">
      {status === 'ACTIVE' ? (
        <Flex w="100%" justify="space-between">
          <Stack>
            <Text variant="heading-xs" className={lightFont} color="tertiary">
              Price
            </Text>
            <Text variant="heading-sm" className={lightFont}>
              {cryptoVal}
            </Text>
          </Stack>
          <ModalComposition
            modalName={`buy-${nft.contract.address}-${nft.tokenId}`}
            trigger={
              <Text
                px="x6"
                py="x2"
                as="span"
                variant="heading-sm"
                color="reverse"
                className={buttonStyle}
              >
                Buy
              </Text>
            }
            content={
              <Box p="x8">
                <FillAsk
                  marketSummary={marketsSummary}
                  tokenAddress={nft.contract.address}
                  tokenId={nft.tokenId}
                  tokenName={metadata.name}
                  askCurrency={nativePrice.currency.address}
                  askPrice={nativePrice.raw}
                  nftData={nftData}
                />
              </Box>
            }
          />
        </Flex>
      ) : (
        <Stack>
          <Text variant="heading-xs" className={lightFont} color="tertiary">
            Sold for
          </Text>
          <Text variant="heading-sm" className={lightFont}>
            {cryptoVal}
          </Text>
        </Stack>
      )}
    </Flex>
  )
}
