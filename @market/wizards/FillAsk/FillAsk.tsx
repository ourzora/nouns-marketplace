import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Paragraph, Text, Box, Separator, Flex } from '@zoralabs/zord'
import { AddressZero } from '@ethersproject/constants'
import {
  TransactionSubmitButton,
  ContractInteractionStatus,
  NftInfo,
  PrintError,
} from '@market/components'

import { useContractTransaction } from '../../hooks/useContractTransaction'
import { useCurrencyBalance } from '../../hooks/useCurrencyBalance'
import { useERC20TokenAllowance } from '../../hooks/useERC20TokenAllowance'
import { useZoraV3Context } from '../../hooks/useZoraV3Context'
import { ERC20_TRANSFER_HELPER_ADDRESS } from '../../utils/addresses'
import { isAddressMatch } from '../../utils/validators'
import { useAccount } from 'wagmi'

type FillAskProps = {
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

type FillAskStep = 'ConnectWallet' | 'ReviewDetails' | 'Confirmation'

export function FillAsk({
  tokenAddress,
  tokenId,
  askPrice,
  askCurrency,
  previewURL,
  onClose,
  cancelButton,
}: FillAskProps) {
  const { address } = useAccount()
  const { AsksV11 } = useZoraV3Context()
  const { tx, txStatus, handleTx, txInProgress } = useContractTransaction()

  const [balance, sufficientBalance, refetchBalance] = useCurrencyBalance(
    askCurrency,
    askPrice
  )
  const allowance = useERC20TokenAllowance(
    askCurrency,
    ERC20_TRANSFER_HELPER_ADDRESS,
    askPrice
  )

  const [wizardStep, setWizardStep] = useState<FillAskStep>('ReviewDetails')
  const [error, setError] = useState<string>()

  const needsERC20Approval = useMemo(
    () => !isAddressMatch(askCurrency, AddressZero) && !allowance.approved,
    [allowance, askCurrency]
  )

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

  const handleApproveERC20 = useCallback(async () => {
    try {
      setError('')
      const promise = allowance.approve()
      await handleTx(promise)
      await allowance.mutate()
    } catch (e: any) {
      setError(e.message)
      await allowance.mutate()
    }
  }, [allowance, handleTx])

  useEffect(() => {
    refetchBalance()
    if (wizardStep === 'ConnectWallet' && address) {
      setWizardStep('ReviewDetails')
    }
    if (!address) {
      setWizardStep('ConnectWallet')
    }
  }, [address, refetchBalance, wizardStep])

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
          {balance && sufficientBalance && needsERC20Approval && (
            <Paragraph size="sm">
              You must first approve ZORA V3 to use your {/*rate?.symbol*/}
              <Text
                as="a"
                variant="link"
                href="https://help.zora.co/en/articles/5882367-approving-tokens-to-zora-v3"
                target="_blank"
                rel="noreferer"
              >
                What is an approval?
              </Text>{' '}
              <Paragraph as="sup" top="x0" size="sm">
                ↗
              </Paragraph>
            </Paragraph>
          )}
          {error && <PrintError errorMessage={error} />}
          <Flex>
            {cancelButton}
            <TransactionSubmitButton
              disabled={!balance || !sufficientBalance}
              txInProgress={txInProgress}
              txStatus={txStatus}
              variant="secondary"
              onClick={
                balance && sufficientBalance && needsERC20Approval
                  ? handleApproveERC20
                  : handleFillAsk
              }
            >
              {balance && sufficientBalance && needsERC20Approval
                ? 'Approve Token Contract'
                : 'Buy now'}
            </TransactionSubmitButton>
          </Flex>
        </>
      )}
    </Box>
  )
}
