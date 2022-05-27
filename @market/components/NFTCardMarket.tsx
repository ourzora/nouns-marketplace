import { useMemo } from 'react'
import { formatCryptoVal } from '../utils/numbers'
import { Text, Button, Box, Flex, Stack } from '@zoralabs/zord/elements'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { useRelevantMarket } from '../hooks/useRelevantMarket'
import { ModalComposition } from '@modal'
import { FillAsk } from '../wizards/FillAsk'

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

  const cryptoVal = useMemo(() => `${formatCryptoVal(nativePrice.raw)} Ξ`, [])

  if (!nft || !metadata) {
    return null
  }

  return (
    <Flex w="100%">
      {status === 'ACTIVE' ? (
        <Flex w="100%" justify="space-between">
          <Stack>
            <Text>Price</Text>
            <Text>{cryptoVal}</Text>
          </Stack>
          <ModalComposition
            modalName={`buy-${nft.contract.address}-${nft.tokenId}`}
            trigger={
              <Button variant="primary" borderRadius="round">
                Buy
              </Button>
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
                />
              </Box>
            }
          />
        </Flex>
      ) : (
        `Sold for ${cryptoVal}`
      )}
    </Flex>
  )
}
