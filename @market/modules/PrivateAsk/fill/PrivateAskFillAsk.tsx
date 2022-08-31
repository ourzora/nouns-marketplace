import { Eyebrow, Flex, Paragraph, Separator, Stack } from '@zoralabs/zord'
import React, { useMemo } from 'react'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useRelevantMarket } from '@market/hooks/useRelevantMarket'
import { useAskHelper } from '@market/hooks/useAskHelper'
import { usePrivateAskFillAskTransaction } from '../hooks/usePrivateAskTransaction'
import { PrintError } from '@shared/components/PrintError'
import { useAuth } from '@shared/hooks/useAuth'

import * as styles from '../PrivateAskFlow.css'

interface PrivateAskFillAskProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAsk({ onNext, ...props }: PrivateAskFillAskProps) {
  const { markets, nft } = props.nft
  const { ask } = useRelevantMarket(markets)
  const { balance: walletBalance } = useAuth()
  const { displayAskAmount, usdAskAmount, hasSufficientFunds } = useAskHelper({
    ask,
  })
  const { isLoading, txError, txInProgress, txStatus, fillAsk } =
    usePrivateAskFillAskTransaction({
      nft: props.nft,
      onNext,
    })
  const isDisabled = useMemo(
    () => !fillAsk || txInProgress || !hasSufficientFunds || !displayAskAmount,
    [displayAskAmount, fillAsk, hasSufficientFunds, txInProgress]
  )
  // useMemo(() => console.log('ASK', ask), [ask])

  return (
    // <MotionStack
    //   gap="x5"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.2 }}
    //   {...props}
    // >
    <Stack gap="x6">
      <Flex w="100%" justify="space-between" className={[styles.summary]}>
        <CollectionThumbnail
          collectionAddress={nft?.contract.address}
          tokenId={nft?.tokenId}
        />
        {displayAskAmount && (
          <PriceWithLabel
            label="Private Listing"
            symbol="ETH"
            cryptoAmount={displayAskAmount}
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

      {txError && <PrintError errorMessage={txError} />}

      <TransactionSubmitButton
        type="submit"
        txStatus={txStatus}
        txInProgress={txInProgress}
        onClick={() => fillAsk?.()} // Yes, this looks weird, but it's a contractWrite thing
        loading={isLoading}
        disabled={isDisabled}
      >
        {hasSufficientFunds ? `Buy NFT` : 'Insufficient Funds'}
      </TransactionSubmitButton>
    </Stack>
    // </MotionStack>
  )
}
