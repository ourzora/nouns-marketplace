import { Button, Flex, Heading, Paragraph, Separator, Stack } from '@zoralabs/zord'
import React, { useEffect, useMemo } from 'react'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { useRelevantMarket } from '@market/hooks/useRelevantMarket'
import { useAskHelper } from '@market/hooks/useAskHelper'
import { usePrivateAskTransaction } from '../hooks/usePrivateAskTransaction'
import { PrintError } from '@shared/components/PrintError'
import { useModal } from '@modal'
import { mediumFont } from 'styles/styles.css'
import { PrivateAskModalHeading } from '../PrivateAskModalHeading'
import { LearnMoreButton } from '../LearnMoreButton'
import { formatContractError } from '@shared'

interface PrivateAskFillAskProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAsk({ onNext, ...props }: PrivateAskFillAskProps) {
  const { requestClose } = useModal()
  const { markets } = props.nft
  const { ask } = useRelevantMarket(markets)
  const { displayAskAmount, hasSufficientFunds } = useAskHelper({
    ask,
  })
  const askPriceSummary = useMemo(
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

  const { txStatus, txInProgress, txError, finalizedTx, fillAsk } =
    usePrivateAskTransaction({ nft: props.nft })
  const isDisabled = useMemo(
    () => txInProgress || !hasSufficientFunds || !displayAskAmount,
    [displayAskAmount, hasSufficientFunds, txInProgress]
  )
  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])

  return (
    <Stack gap="x3" {...props}>
      <PrivateAskModalHeading nftObj={props.nft} action="Buy" />

      <Flex justify="space-between">
        <Paragraph size="lg" inline color="text3" className={[mediumFont]}>
          Savings
        </Paragraph>
        <Paragraph size="lg" inline color="text1">
          ~{savings} ETH
        </Paragraph>
      </Flex>
      <Paragraph size="md" color="text3" className={[mediumFont]}>
        vs. competing marketplaces that charge a 2.5% fee
      </Paragraph>
      <Separator />
      {askPriceSummary && (
        <Flex justify="space-between">
          <Paragraph size="lg" inline color="text3" className={[mediumFont]}>
            {askPriceSummary.label}
          </Paragraph>
          <Heading as="h1" color="text1">
            {askPriceSummary.value}
          </Heading>
        </Flex>
      )}
      {txError && <PrintError errorMessage={formatContractError(txError)} />}
      <Stack gap="x4">
        <Flex alignItems="stretch" gap="x2" justify="space-between" pt="x3">
          <Button
            flex="1"
            variant="secondary"
            borderRadius="curved"
            onClick={requestClose}
          >
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
        <LearnMoreButton>Learn more about modules on Zora</LearnMoreButton>
      </Stack>
    </Stack>
  )
}
