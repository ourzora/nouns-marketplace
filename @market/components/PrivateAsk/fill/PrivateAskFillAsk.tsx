import { Eyebrow, Flex, Paragraph, Separator, Stack } from '@zoralabs/zord'
import {
  // MotionStack,
  useAuth,
} from '@shared'
import React, { useMemo } from 'react'
import * as styles from '../PrivateAskFlow.css'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { usePrivateAskTransaction, useRelevantMarket } from '@market/hooks'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useAskTokenHelper } from '@market/hooks/useAskTokenHelper'

interface PrivateAskFillAskProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAsk({
  onNext,
  nft: nftObj,
  ...props
}: PrivateAskFillAskProps) {
  const { markets, nft } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { balance: walletBalance } = useAuth()
  const { isSubmitting, txError, txInProgress, txStatus, fillAsk } =
    usePrivateAskTransaction({
      nft: nftObj,
      onNext,
    })
  const { displayAskAmount, usdAskAmount, hasSufficientFunds } = useAskTokenHelper({
    ask,
  })

  useMemo(() => console.log('ASK', ask), [ask])

  return (
    // <MotionStack
    //   gap="x5"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.2 }}
    //   {...props}
    // >
    <Stack gap="x5">
      <Flex w="100%" justify="space-between" className={[styles.summary]}>
        {/* <>NFT</> */}
        <CollectionThumbnail
          collectionAddress={nft?.contract.address}
          tokenId={nft?.tokenId}
        />
        {displayAskAmount && (
          <PriceWithLabel
            label="Private Sale"
            cryptoAmount={displayAskAmount}
            symbol="ETH"
            usdAmount={usdAskAmount}
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
    // </MotionStack>
  )
}
