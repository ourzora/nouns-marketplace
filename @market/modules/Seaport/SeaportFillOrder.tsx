import { Button } from 'components/Button'
import { OpenSeaIcon } from 'components/Icon'
import { mediumFont } from 'styles/styles.css'

import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react'

import { MarketModalHeading } from '@market/components'
import { useValidateSeaportContractCall } from '@market/modules/Seaport/hooks/useValidateSeaportContractCall'
import { useModal } from '@modal'
import { formatContractError, useAuth } from '@shared'
import { PrintError } from '@shared/components/PrintError'
import { Flex, Heading, Paragraph, Separator, Stack } from '@zoralabs/zord'

import { CommonSeaportFillOrderProps } from './SeaportFillOrderFlow'
import { useSeaportTransaction } from './hooks/useSeaportTransaction'

interface SeaportFillOrderProps extends CommonSeaportFillOrderProps {
  setIsFilled: Dispatch<SetStateAction<boolean>>
}

export function SeaportFillOrder({
  order,
  nft,
  userAddress,
  setIsFilled,
  ...props
}: SeaportFillOrderProps) {
  const { requestClose } = useModal()

  const { offchainOrder } = order
  const { calldata, contractAddress, price } = offchainOrder
  const { chainTokenPrice } = price
  const ethPrice = useMemo(() => chainTokenPrice.decimal, [chainTokenPrice])
  const { balance: walletBalance } = useAuth()

  const contractCall = useMemo(() => {
    return {
      caller_address: userAddress!,
      contract_address: contractAddress, // the contract that fills the orders, eg. Seaport
      calldata: calldata,
      value: ethPrice, // Price in Ether (Decimal price)
    }
  }, [calldata, contractAddress, userAddress, ethPrice])

  // @BJ TODO: keep the userAddress above, + do a wallet check to ensure sufficient funds
  const hasSufficientFunds = useMemo(
    () => walletBalance && parseFloat(walletBalance?.formatted) >= ethPrice,
    [ethPrice, walletBalance]
  )

  const {
    isValidated,
    error: validationError,
    loading: loadingValidation,
  } = useValidateSeaportContractCall(contractCall)

  const { txError, txInProgress, finalizedTx, fillSeaportOrder } = useSeaportTransaction()

  const savings = useMemo(
    () => (ethPrice ? (parseFloat(ethPrice) * 0.025).toFixed(5) : '0'), // using OpenSea commission as the reference percentage.
    [ethPrice]
  )

  const error = useMemo(() => {
    if (!hasSufficientFunds) {
      return new Error('Wallet has insufficient ETH to make this purchase')
    }
    return txError ?? validationError
  }, [hasSufficientFunds, txError, validationError])

  useEffect(() => finalizedTx!! && setIsFilled(true), [finalizedTx, setIsFilled])

  return (
    <Stack gap="x8" {...props}>
      <MarketModalHeading nftObj={nft} action="Buy" />
      <Stack gap="x3" {...props}>
        <Flex justify="space-between">
          <Paragraph size="lg" inline color="text2" className={[mediumFont]}>
            Marketplace
          </Paragraph>
          <Flex gap="x2">
            <Paragraph size="lg" inline color="text1">
              Seaport
            </Paragraph>
            <OpenSeaIcon />
          </Flex>
        </Flex>
        <Separator />
        <Flex justify="space-between">
          <Paragraph size="lg" inline color="text2" className={[mediumFont]}>
            Savings
          </Paragraph>
          <Paragraph size="lg" inline color="text1">
            ~{savings} ETH
          </Paragraph>
        </Flex>
        <Paragraph size="md" color="text2" className={[mediumFont]}>
          vs. competing marketplaces that charge a 2.5% fee
        </Paragraph>
        <Separator />
        <Flex justify="space-between">
          <Paragraph size="lg" inline color="text2" className={[mediumFont]}>
            Price
          </Paragraph>
          <Heading as="h1" color="text1">
            {ethPrice} ETH
          </Heading>
        </Flex>

        {error && <PrintError errorMessage={formatContractError(error)} />}
        <Stack gap="x4">
          <Flex gap="x2" justify="space-between" pt="x3" align="stretch">
            <Button flex={1} variant="secondary" onClick={requestClose}>
              Cancel
            </Button>
            <Button
              loading={loadingValidation || txInProgress}
              disabled={!isValidated}
              flex={1}
              onClick={() => fillSeaportOrder(contractCall)}
            >
              Buy NFT
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  )
}
