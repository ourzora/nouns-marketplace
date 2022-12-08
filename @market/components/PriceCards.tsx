import { Button } from 'components/Button'
import { ArrowLeft, ArrowRight } from 'components/Icon'
import { mediumFont } from 'styles/styles.css'
import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useToken } from 'hooks/useToken'

import React, { useCallback, useMemo, useState } from 'react'

import { useOffchainOrderAttribution } from '@market/hooks'
import { SeaportFillOrderFlow } from '@market/modules'
import { ModalComposition, useModal } from '@modal'
import { content } from '@modal/Modal.css'
import { useAuth, useButtonRequiresAuth } from '@shared'
import { numberFormatter } from '@shared/utils'
import { Box, Flex, Heading, Paragraph, Stack, Well } from '@zoralabs/zord'

import * as styles from './PriceCards.css'

export interface PriceCardsProps {
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: ReturnType<typeof useToken>['markets']
  offchainOrders: OffchainOrderWithToken[]
  userAddress?: string
}

const modalName = 'seaport-fill-modal'

function PriceCard({
  order,
  userAddress,
  tokenId,
  contractAddress,
  collectionName,
  markets,
}: PriceCardsProps & { order: OffchainOrderWithToken }) {
  const { offchainOrder } = order
  const { price } = offchainOrder
  const { chainTokenPrice, usdcPrice } = price

  const formattedUSD = useMemo(
    () => (usdcPrice ? numberFormatter(usdcPrice?.decimal) : '...'),
    [usdcPrice]
  )
  const formattedETH = useMemo(
    () => (chainTokenPrice ? `${chainTokenPrice?.decimal} ETH` : '...'),
    [chainTokenPrice]
  )

  const {
    attribution,
    logo: PlatformLogo,
    platformName,
    platformButtonColor,
  } = useOffchainOrderAttribution(
    offchainOrder?.properties?.salt,
    offchainOrder?.calldata ?? undefined
  )

  const { requestOpen } = useModal()
  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [requestOpen])

  const buttonBehavior = useButtonRequiresAuth(modalHandler)

  return (
    <Stack gap="x4">
      <Stack>
        <Flex w="100%" justify="space-between">
          {platformName && (
            <Paragraph inline className={mediumFont} color="text2">
              Price on {platformName}
            </Paragraph>
          )}
        </Flex>
        <Flex gap="x2">
          <PlatformLogo w="x8" />
          <Heading as="h2" size="sm" inline>
            {formattedETH}
          </Heading>
        </Flex>
        {usdcPrice && (
          <Paragraph color="text2" inline className={mediumFont}>
            {formattedUSD} USD
          </Paragraph>
        )}
      </Stack>

      <ModalComposition
        modalName={modalName}
        modalBehaviorRequiresAuth={true}
        trigger={
          <Button
            w="100%"
            onClick={buttonBehavior}
            style={{ backgroundColor: platformButtonColor }}
            className={styles.buyNowButton}
          >
            Buy Now
          </Button>
        }
        content={
          <Box p="x8">
            <SeaportFillOrderFlow
              tokenId={tokenId}
              contractAddress={contractAddress}
              collectionName={collectionName}
              markets={markets}
              order={order}
              userAddress={userAddress}
            />
          </Box>
        }
      />
    </Stack>
  )
}

export function PriceCards({
  tokenId,
  contractAddress,
  collectionName,
  markets,
  offchainOrders,
}: PriceCardsProps) {
  const cardCount = useMemo(() => offchainOrders.length, [offchainOrders])
  const [currentCard, setCurrentCard] = useState<number>(0)
  const { address: userAddress } = useAuth()

  const nextCard = useMemo(() => {
    const isLast = currentCard === cardCount - 1
    if (cardCount === 1) return undefined
    return isLast ? 0 : currentCard + 1
  }, [cardCount, currentCard])

  const prevCard = useMemo(() => {
    const isFirst = currentCard === 0
    if (cardCount === 1) return undefined
    return isFirst ? cardCount - 1 : currentCard - 1
  }, [cardCount, currentCard])

  const showArrows = prevCard !== undefined && nextCard !== undefined

  if (cardCount === 0) return null

  return (
    <Stack gap={'x5'} align="center" className={cardCount > 1 ? styles.wrap : null}>
      <Well
        p="x4"
        borderRadius="phat"
        className={cardCount > 1 ? styles.cardStack : null}
      >
        {showArrows && (
          <Flex gap="x1" pos="absolute" top="x4" right="x4">
            <Button
              size="sm"
              variant="unset"
              onClick={() => setCurrentCard(prevCard)}
              className={styles.arrowButton}
            >
              <ArrowLeft w="x4" h="x4" align="center" className={styles.arrow} />
            </Button>
            <Button
              size="sm"
              variant="unset"
              onClick={() => setCurrentCard(nextCard)}
              className={styles.arrowButton}
            >
              <ArrowRight w="x4" h="x4" align="center" className={styles.arrow} />
            </Button>
          </Flex>
        )}
        <PriceCard
          offchainOrders={offchainOrders}
          tokenId={tokenId}
          contractAddress={contractAddress}
          collectionName={collectionName}
          markets={markets}
          order={offchainOrders[currentCard]}
          userAddress={userAddress}
        />
      </Well>
      {cardCount > 1 && (
        <Flex style={{ gap: '2px' }}>
          {offchainOrders.map((_order, idx) => (
            <Box
              key={idx}
              borderRadius="round"
              h="x1"
              w="x1"
              backgroundColor={idx === currentCard ? 'accent' : 'background2'}
            />
          ))}
        </Flex>
      )}
    </Stack>
  )
}
