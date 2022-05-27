import { Paragraph, Text, Box, BoxProps } from '@zoralabs/zord/elements'
import { AddressZero } from '@ethersproject/constants'
import { ModalTitleAndDescription } from '@modal'
import { TransactionSubmitButton } from '../components/TransactionSubmitButton'
import { ContractInteractionStatus } from '../components/ContractInteractionStatus'
import { useContractTransaction } from '../hooks/useContractTransaction'
import { useAuth } from '../hooks/useAuth'
import { useCurrencyBalance } from '../hooks/useCurrencyBalance'
import { useERC20TokenAllowance } from '../hooks/useERC20TokenAllowance'
import useToggle from '../hooks/useToggle'
import { useZoraV3Context } from '../hooks/useZoraV3Context'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ERC20_TRANSFER_HELPER_ADDRESS } from '../utils/addresses'
import { isAddressMatch } from '../utils/validators'

import { RawDisplayer } from '../../components/utils'

type FillAskProps = {
  tokenId: string
  tokenAddress: string
  tokenName?: string
  askPrice: string
  askCurrency: string
  previewURL?: string
  onClose?: () => void
}

type FillAskStep = 'ConnectWallet' | 'ReviewDetails' | 'Confirmation'

export function FillAsk({
  tokenAddress,
  tokenId,
  tokenName = 'NFT',
  askPrice,
  askCurrency,
  previewURL,
  onClose,
}: FillAskProps) {
  const [noWallet, toggleNoWallet] = useToggle()
  const { user: account } = useAuth()
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
      if (!AsksV11 || !account || !account.address) {
        throw new Error('V3AskContract is not ready, please try again.')
      }
      const promise = AsksV11.fillAsk(
        tokenAddress,
        tokenId,
        askCurrency,
        askPrice,
        account?.address,
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
  }, [AsksV11, account, askCurrency, askPrice, handleTx, tokenAddress, tokenId])

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
    // TODO @ethandaya - this is a lil dank but will work till we consolidate auth
    if (wizardStep === 'ConnectWallet' && account) {
      setWizardStep('ReviewDetails')
    }
    if (!account) {
      setWizardStep('ConnectWallet')
    }
  }, [account, refetchBalance, wizardStep])

  return (
    <>
      {wizardStep !== 'Confirmation' && (
        <ModalTitleAndDescription
          title={noWallet ? 'Connect your Wallet' : `Buy ${tokenName}`}
          description={
            noWallet
              ? undefined
              : "You're about to buy this NFT at the currently listed price."
          }
          mb={noWallet ? 'x2' : 'x6'}
        />
      )}
      {wizardStep === 'ConnectWallet' ? (
        noWallet ? (
          <Box>You need to connect your wallet</Box>
        ) : (
          <Box>You need have options</Box>
        )
      ) : wizardStep === 'Confirmation' && tx ? (
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
          <Box>
            <PreviewImage src={previewURL} />
            <RawDisplayer data={{ askCurrency, askPrice }} />
          </Box>
          {balance && sufficientBalance && needsERC20Approval && (
            <Paragraph size="sm">
              {/*You must first approve ZORA V3 to use your {rate?.symbol}*/}
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
          {error && <Text>{error}</Text>}
          <TransactionSubmitButton
            disabled={!balance || !sufficientBalance}
            txInProgress={txInProgress}
            txStatus={txStatus}
            onClick={
              balance && sufficientBalance && needsERC20Approval
                ? handleApproveERC20
                : handleFillAsk
            }
          >
            {balance && sufficientBalance && needsERC20Approval
              ? 'Approve Token Contract'
              : 'Buy NFT'}
          </TransactionSubmitButton>
        </>
      )}
    </>
  )
}
interface PreviewImageProps extends BoxProps {
  src?: string
}

function PreviewImage({ src, ...props }: PreviewImageProps) {
  return (
    <Box
      {...props}
      w="x10"
      h="x10"
      borderRadius="small"
      style={
        src
          ? {
              backgroundImage: `url(${src})`,
              backgroundPosition: `center`,
            }
          : undefined
      }
    />
  )
}
