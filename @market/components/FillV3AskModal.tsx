import { Button } from 'components/Button'

import { FillV3AskWizard, NFTOwner } from '@market/components'
import { useRelevantMarket } from '@market/hooks'
import { ModalComposition, useModal } from '@modal'
import { lightFont, useIsOwner } from '@shared'
import { MARKET_INFO_STATUSES } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { Box, Flex, FlexProps, Heading, Label, Stack } from '@zoralabs/zord'

export interface FillV3AskModalProps extends FlexProps {
  nftObj: NFTObject
}

export function FillV3AskModal({ nftObj, ...props }: FillV3AskModalProps) {
  const { nft, metadata, markets } = nftObj
  const { ask } = useRelevantMarket(markets)

  const { requestClose } = useModal()
  const { isOwner } = useIsOwner(nftObj)

  if (!nft || !metadata || ask?.status === MARKET_INFO_STATUSES.INVALID) {
    return null
  }

  return (
    <Stack flex={1}>
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
            <Heading size="xs" className={lightFont} color="text3">
              Price
            </Heading>
            <Heading size="xs" className={lightFont}>
              {ask.amount?.amount.value} {ask.amount?.symbol}
            </Heading>
          </Stack>
          {!isOwner ? (
            <ModalComposition
              modalName={`buy-${nft.contract.address}-${nft.tokenId}`}
              modalBehaviorRequiresAuth={true}
              trigger={
                <Button as="span" size="md" className="zora-market-cardMarketTrigger">
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
                      nftObj={nftObj}
                      onClose={requestClose}
                      cancelButton={
                        <Button onClick={requestClose} w="100%" variant="secondary">
                          Cancel
                        </Button>
                      }
                    />
                  )}
                </Box>
              }
            />
          ) : (
            <Button disabled size="md" variant="outline">
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
                    <Label size="lg" className={lightFont} color="text3">
                      Sold on Chain for
                    </Label>
                    <Heading size="xs" className={lightFont}>
                      {ask.amount?.amount.value} {ask.amount?.symbol}
                    </Heading>
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
