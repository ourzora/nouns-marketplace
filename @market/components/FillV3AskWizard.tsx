import { useCallback, useMemo, useState } from 'react'
import { AddressZero } from '@ethersproject/constants'
import { Box, Separator, Grid } from '@zoralabs/zord'
import { PrintError, useContractTransaction, useAuth, isAddressMatch } from '@shared'
import {
  TransactionSubmitButton,
  ContractInteractionStatus,
  NftInfo,
} from '@market/components'
import { useContractContext } from '@market/providers'

export type FillV3AskWizardProps = {
  tokenId: string
  tokenAddress: string
  tokenName?: string
  askPrice: string
  askCurrency: string
  previewURL?: string
  marketSummary: any
  nftData?: any
  onClose?: () => void
  cancelButton?: JSX.Element
}

type FillV3AskWizardStep = 'ConnectWallet' | 'ReviewDetails' | 'Confirmation'

export function FillV3AskWizard({
  tokenAddress,
  tokenId,
  askPrice,
  askCurrency,
  previewURL,
  onClose,
  cancelButton,
}: FillV3AskWizardProps) {
  const { address, balance: walletBalance } = useAuth()
  const { AsksV11 } = useContractContext()
  const { tx, txStatus, handleTx, txInProgress } = useContractTransaction()

  const sufficientFunds = useMemo(
    () => walletBalance?.value.gte(askPrice),
    [askPrice, walletBalance, walletBalance?.value]
  )

  const [wizardStep, setWizardStep] = useState<FillV3AskWizardStep>('ReviewDetails')
  const [error, setError] = useState<string>()

  const handleFillAsk = useCallback(async () => {
    try {
      if (!AsksV11 || !address) {
        throw new Error(`V3AskContract is not ready, please try again.`)
      }
      const promise = AsksV11.fillAsk(
        tokenAddress,
        tokenId,
        askCurrency,
        askPrice,
        address,
        isAddressMatch(askCurrency, AddressZero)
          ? {
              value: askPrice,
            }
          : undefined
      )
      await handleTx(promise)
      setWizardStep('Confirmation')
    } catch (err: any) {
      setError(err.message || "There's been an error, please try again.")
    }
  }, [AsksV11, address, askCurrency, askPrice, handleTx, tokenAddress, tokenId])

  return (
    <Box w="100%">
      {wizardStep !== 'Confirmation' && (
        <NftInfo
          collectionAddress={tokenAddress}
          tokenId={tokenId}
          askPrice={askPrice}
          modalType="fillAsk"
        />
      )}
      <Separator mt="x3" mb="x4" />
      {wizardStep === 'Confirmation' && tx ? (
        <ContractInteractionStatus
          title="Your purchase will be confirmed shortly"
          previewURL={previewURL}
          txHash={tx.hash}
          amount={askPrice}
          currencyAddress={askCurrency}
          onConfirm={onClose}
        />
      ) : (
        <>
          {error && <PrintError errorMessage={error} mb="x4" />}
          <Grid
            style={{ gridTemplateColumns: cancelButton ? '1fr 1fr' : '1fr' }}
            gap="x2"
          >
            {cancelButton}
            <TransactionSubmitButton
              disabled={!sufficientFunds}
              txInProgress={txInProgress}
              txStatus={txStatus}
              onClick={handleFillAsk}
            >
              {!sufficientFunds ? 'Insufficient Balance' : 'Buy now'}
            </TransactionSubmitButton>
          </Grid>
        </>
      )}
    </Box>
  )
}
