import { Eyebrow, Flex, Paragraph, Separator, Stack } from '@zoralabs/zord'
import {
  PrintError,
  // MotionStack,
  useAuth,
} from '@shared'
import React, { useMemo } from 'react'
import * as styles from '../PrivateAskFlow.css'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { useRelevantMarket } from '@market/hooks'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useAskTokenHelper } from '@market/hooks/useAskTokenHelper'
import { usePrivateAskFillAskTransaction } from '../hooks'

interface PrivateAskFillAskProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAsk({
  onNext,
  nft: nftObj,
  ...props
}: PrivateAskFillAskProps) {
  const { markets, nft } = nftObj
  const { ask } = useRelevantMarket(markets)
  const { balance: walletBalance } = useAuth()
  const { displayAskAmount, usdAskAmount, hasSufficientFunds } = useAskTokenHelper({
    ask,
  })
  const { isLoading, txError, txInProgress, txStatus, fillAsk } =
    usePrivateAskFillAskTransaction({
      nft: nftObj,
      onNext,
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
    <Stack gap="x6">
      <Flex w="100%" justify="space-between" className={[styles.summary]}>
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

      {txError && <PrintError errorMessage={txError} />}

      <TransactionSubmitButton
        type="submit"
        txStatus={txStatus}
        txInProgress={txInProgress}
        onClick={() => fillAsk?.()} // Yes, this looks weird, but it's a contractWrite thing
        loading={isLoading}
        disabled={!fillAsk || txInProgress || !hasSufficientFunds || !displayAskAmount}
      >
        {hasSufficientFunds ? `Buy NFT` : 'Insufficient Funds'}
      </TransactionSubmitButton>
    </Stack>
    // </MotionStack>
  )
}
