import { Eyebrow, Flex, Paragraph, Separator, Stack } from '@zoralabs/zord'
import {
  MotionStack,
  numberFormatter,
  roundTwoDecimals,
  useAuth,
  useContractTransaction,
} from '@shared'
import React, { useMemo } from 'react'
import * as styles from '../PrivateAskFlow.css'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { usePrivateAskTransaction, useRelevantMarket } from '@market/hooks'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

interface PrivateAskFillAskProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAsk({ onNext, nft, ...props }: PrivateAskFillAskProps) {
  const { ask } = useRelevantMarket(nft.markets)
  const { balance: walletBalance } = useAuth()
  const { txStatus, txInProgress, txError } = useContractTransaction()
  const rawAmount = useMemo(() => ask.amount?.amount.raw.toString(), [ask])
  const prettyAmount = useMemo(() => ask.amount?.amount.value.toString(), [ask])
  const usdAmount = useMemo(
    () =>
      ask?.amount?.usd?.value
        ? numberFormatter(roundTwoDecimals(ask?.amount?.usd?.value))
        : '...',
    [ask]
  )
  const hasSufficientFunds = useMemo(
    () => (rawAmount ? walletBalance?.value.gte(rawAmount) : false),
    [rawAmount, walletBalance?.value]
  )
  const { isSubmitting, fillAsk } = usePrivateAskTransaction({
    nft,
    onNext,
  })

  useMemo(() => console.log('ASK', ask), [ask])

  return (
    <MotionStack
      gap="x5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <Stack gap="x5">
        <Flex w="100%" justify="space-between" className={[styles.summary]}>
          <>NFT</>
          {prettyAmount && (
            <PriceWithLabel
              label="Private Sale"
              cryptoAmount={prettyAmount}
              symbol="ETH"
              usdAmount={usdAmount}
            />
          )}
        </Flex>

        <Separator />

        <Flex justify="space-between">
          <Paragraph size="sm" color="tertiary">
            Your balance
          </Paragraph>
          <Eyebrow color="primary" inline>
            {walletBalance?.formatted} {walletBalance?.symbol}
          </Eyebrow>
        </Flex>

        {txError && (
          <Paragraph size="xs" color="destructive">
            {txError}
          </Paragraph>
        )}

        <TransactionSubmitButton
          type="submit"
          txStatus={txStatus}
          txInProgress={txInProgress}
          onClick={fillAsk}
          loading={isSubmitting}
          disabled={isSubmitting || !hasSufficientFunds}
        >
          {hasSufficientFunds ? `Buy NFT` : 'Insufficient Funds'}
        </TransactionSubmitButton>
      </Stack>
    </MotionStack>
  )
}
