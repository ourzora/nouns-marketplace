import {
  // Eyebrow, Flex, Paragraph, Separator,
  Stack,
} from '@zoralabs/zord'
import React, { useEffect, useMemo } from 'react'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
// import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
// import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useRelevantMarket } from '@market/hooks/useRelevantMarket'
import { useAskHelper } from '@market/hooks/useAskHelper'
import { usePrivateAskTransaction } from '../hooks/usePrivateAskTransaction'
import { PrintError } from '@shared'
// import { PrintError } from '@shared/components/PrintError'
// import { useAuth } from '@shared/hooks/useAuth'

interface PrivateAskFillAskProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAsk({ onNext, ...props }: PrivateAskFillAskProps) {
  const {
    markets,
    // nft
  } = props.nft
  const { ask } = useRelevantMarket(markets)
  // const { balance: walletBalance } = useAuth()
  const {
    displayAskAmount,
    // usdAskAmount,
    hasSufficientFunds,
  } = useAskHelper({
    ask,
  })
  const { txStatus, txInProgress, txError, finalizedTx, fillAsk } =
    usePrivateAskTransaction({ nft: props.nft })
  const isDisabled = useMemo(
    () => !fillAsk || txInProgress || !hasSufficientFunds || !displayAskAmount,
    [displayAskAmount, fillAsk, hasSufficientFunds, txInProgress]
  )
  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])

  return (
    <Stack gap="x6">
      {/* <Flex w="100%" justify="space-between" textAlign="right">
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
        <Paragraph size="sm" color="text3">
          Your balance
        </Paragraph>
        <Eyebrow color="text1" inline>
          {walletBalance?.formatted} {walletBalance?.symbol}
        </Eyebrow>
      </Flex>
*/}
      {txError && <PrintError errorMessage={txError} />}

      <TransactionSubmitButton
        type="submit"
        txStatus={txStatus}
        txInProgress={txInProgress}
        onClick={() => fillAsk({ price: displayAskAmount })}
        disabled={isDisabled}
      >
        {hasSufficientFunds ? `Buy NFT` : 'Insufficient Funds'}
      </TransactionSubmitButton>
    </Stack>
  )
}
