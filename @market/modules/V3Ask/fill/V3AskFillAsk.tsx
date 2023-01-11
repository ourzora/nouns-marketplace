import React, { useEffect, useMemo } from 'react'

import { MarketModalHeading } from '@market/components'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { useAskHelper } from '@market/hooks/useAskHelper'
import { useRelevantMarket } from '@market/hooks/useRelevantMarket'
import { useModal } from '@modal'
import { formatContractError } from '@shared'
import { PrintError } from '@shared/components/PrintError'
import { Button, Flex, Heading, Paragraph, Separator, Stack } from '@zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import * as styles from '../V3AskFlow.css'
import { V3AskLearnMoreButton } from '../V3AskLearnMoreButton'
import { useV3AskTransaction } from '../hooks/useV3AskTransaction'

interface V3AskFillAskProps extends CommonV3AskComponentProps {}

export function V3AskFillAsk({ onNext, ...props }: V3AskFillAskProps) {
  const { requestClose } = useModal()
  const { markets } = props.nft
  const { ask } = useRelevantMarket(markets)
  const { displayAskAmount, hasSufficientFunds } = useAskHelper({
    ask,
  })

  const askPriceSummary = useMemo(
    // todo: get this data from usePrimaryAuctionDataTable when we've switched from NFTObject to TypeSafeToken
    () =>
      displayAskAmount
        ? {
            label: 'Price',
            value: `${displayAskAmount} ETH`,
          }
        : null,
    [displayAskAmount]
  )

  const savings = useMemo(
    () => (displayAskAmount ? (parseFloat(displayAskAmount) * 0.025).toFixed(5) : '0'),
    [displayAskAmount]
  )

  const { txStatus, txInProgress, txError, finalizedTx, fillAsk } = useV3AskTransaction({
    nft: props.nft,
  })
  const isDisabled = useMemo(
    () => txInProgress || !hasSufficientFunds || !displayAskAmount,
    [displayAskAmount, hasSufficientFunds, txInProgress]
  )
  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])

  return (
    <Stack gap="x3" {...props}>
      <MarketModalHeading nftObj={props.nft} action="Buy" />

      <Flex justify="space-between">
        <Paragraph inline color="text3">
          Savings
        </Paragraph>
        <Heading size="xs" inline color="text1">
          ~{savings} ETH
        </Heading>
      </Flex>
      <Paragraph size="md" color="text3">
        vs. competing marketplaces that charge a 2.5% fee
      </Paragraph>
      <Separator />
      {askPriceSummary && (
        <Flex justify="space-between">
          <Paragraph inline color="text3">
            {askPriceSummary.label}
          </Paragraph>
          <Heading as="h1" color="text1">
            {askPriceSummary.value}
          </Heading>
        </Flex>
      )}
      {txError && <PrintError errorMessage={formatContractError(txError)} />}
      <Stack gap="x4">
        <Flex gap="x2" justify="space-between" pt="x3" className={styles.stretch}>
          <Button flex={1} variant="secondary" onClick={requestClose}>
            Cancel
          </Button>
          <TransactionSubmitButton
            type="submit"
            txStatus={txStatus}
            txInProgress={txInProgress}
            onClick={() => fillAsk({ price: displayAskAmount })}
            disabled={isDisabled}
            w="auto"
            flex={1}
          >
            {hasSufficientFunds ? `Buy NFT` : 'Insufficient Funds'}
          </TransactionSubmitButton>
        </Flex>
        <V3AskLearnMoreButton>Learn more about modules on Zora</V3AskLearnMoreButton>
      </Stack>
    </Stack>
  )
}
