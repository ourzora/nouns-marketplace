import { Button } from 'components/Button'
import { OpenSeaIcon } from 'components/Icon'
import { mediumFont } from 'styles/styles.css'

import React, { useCallback, useMemo, useState } from 'react'

import { SeaportFillOrderFlow } from '@market/modules'
import { ModalComposition, useModal } from '@modal'
import { useAuth } from '@shared'
import { numberFormatterUSDC } from '@shared/utils'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, Flex, Heading, Paragraph, Stack, Well } from '@zoralabs/zord'

export interface PriceCardsProps {
  nft: NFTObject
  offchainOrders: any[]
  userAddress?: string
}

const label = 'SeaPort'
const modalName = 'seaport-fill-modal'

function PriceCard({
  order,
  userAddress,
  nft,
}: {
  order: any
  nft: NFTObject
  userAddress?: string
}) {
  const { offchainOrder } = order
  const { price } = offchainOrder
  const { chainTokenPrice, usdcPrice } = price

  const formattedUSD = useMemo(
    () => numberFormatterUSDC(usdcPrice.decimal),
    [usdcPrice.decimal]
  )
  const { requestOpen } = useModal()
  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [requestOpen])

  return (
    <Stack gap="x4">
      <Stack>
        <Flex w="100%" justify="space-between">
          {label && (
            <Paragraph inline className={mediumFont} color="text2">
              Price on {label}
            </Paragraph>
          )}
        </Flex>
        <Flex gap="x2">
          <OpenSeaIcon w="x8" />
          <Heading as="h2" size="sm" inline>
            {chainTokenPrice.decimal} ETH
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
          <Button w="100%" onClick={() => modalHandler()}>
            Buy Now
          </Button>
        }
        content={
          <Box p="x8">
            <SeaportFillOrderFlow nft={nft} order={order} userAddress={userAddress} />
          </Box>
        }
      />
    </Stack>
  )
}

export function PriceCards({ nft, offchainOrders }: PriceCardsProps) {
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
    <Stack gap="x2" align="center">
      <Well p="x4" borderRadius="phat">
        {showArrows && (
          <Flex gap="x1" pos="absolute" top="x4" right="x4">
            <Button
              size="sm"
              w="x4"
              variant="circle"
              onClick={() => setCurrentCard(prevCard)}
            >
              ←
            </Button>
            <Button
              size="sm"
              w="x4"
              variant="circle"
              onClick={() => setCurrentCard(nextCard)}
            >
              →
            </Button>
          </Flex>
        )}
        <PriceCard
          nft={nft}
          order={offchainOrders[currentCard]}
          userAddress={userAddress}
        />
      </Well>
      {cardCount > 1 && (
        <Flex style={{ gap: '2px' }}>
          {offchainOrders.map(
            (
              order, // order is unused here, but is necessary for the current card to be highlighted
              idx
            ) => (
              <Box
                key={idx}
                borderRadius="round"
                h="x1"
                w="x1"
                backgroundColor={idx === currentCard ? 'accent' : 'background2'}
              />
            )
          )}
        </Flex>
      )}
    </Stack>
  )
}
