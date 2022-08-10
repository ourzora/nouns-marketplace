import { Text, Box, Flex, Stack, FlexProps, Button } from '@zoralabs/zord'
import { MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { lightFont, useIsOwner } from '@shared'
import { ModalComposition, useModal } from '@modal'
import { useRelevantMarket } from '@market/hooks'
import { FillV3AskWizard, NFTOwner } from '@market/components'

export interface FillV3AskModalProps extends FlexProps {
  nftData: NFTObject
}

export function FillV3AskModal({ nftData, ...props }: FillV3AskModalProps) {
  const { nft, metadata, markets } = nftData
  const { ask } = useRelevantMarket(markets)

  const { requestClose } = useModal()
  const { isOwner } = useIsOwner(nftData)

  if (!nft || !metadata || ask?.status === MARKET_INFO_STATUSES.INVALID) {
    return null
  }

  return (
    <Stack flex="1">
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
                  size="md"
                  borderRadius="curved"
                  className="zora-market-cardMarketTrigger"
                >
                  Buy
                </Button>
              }
              content={
                <Box p="x8">
                  {ask.amount && (
                    <FillV3AskWizard
                      marketSummary={markets}
                      tokenAddress={nft.contract.address}
                      tokenId={nft.tokenId}
                      tokenName={metadata.name}
                      askCurrency={ask.amount.address}
                      askPrice={ask.amount.amount.raw}
                      nftData={nftData}
                      onClose={requestClose}
                      cancelButton={
                        <Button
                          onClick={requestClose}
                          w="100%"
                          variant="secondary"
                          borderRadius="curved"
                        >
                          Cancel
                        </Button>
                      }
                    />
                  )}
                </Box>
              }
            />
          ) : (
            <Button
              disabled
              borderRadius="curved"
              size="md"
              variant="outline"
              borderColor="secondary"
              color="tertiary"
            >
              On Sale
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
    </Stack>
  )
}
