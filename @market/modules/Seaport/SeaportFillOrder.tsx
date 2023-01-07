import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react'

import { MarketModalHeading } from '@market/components'
import { useOffchainOrderAttribution } from '@market/hooks'
import { useValidateSeaportContractCall } from '@market/modules/Seaport/hooks/useValidateSeaportContractCall'
import { useModal } from '@modal'
import { formatContractError, useAuth } from '@shared'
import { PrintError } from '@shared/components/PrintError'
import { Button, Flex, Heading, Paragraph, Separator, Stack } from '@zord'

import { CommonSeaportFillOrderProps } from './SeaportFillOrderFlow'
import { useSeaportTransaction } from './hooks/useSeaportTransaction'
import { SeaportContractCall } from './types/SeaportContractCall'

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
  const { offchainOrder } = order
  const { calldata, contractAddress, price } = offchainOrder
  const { chainTokenPrice } = price
  const ethPrice = useMemo(() => chainTokenPrice?.decimal, [chainTokenPrice])

  const contractCall: SeaportContractCall | undefined = useMemo(() => {
    return ethPrice
      ? {
          caller_address: userAddress!,
          contract_address: contractAddress, // the contract that fills the orders, eg. Seaport
          calldata: calldata!,
          value: ethPrice.toString(), // Price in Ether (Decimal price)
        }
      : undefined
  }, [calldata, contractAddress, userAddress, ethPrice])

  if (contractCall) {
    return (
      <SeaportFillOrderWithVerifiedContractCall
        order={order}
        nft={nft}
        contractCall={contractCall}
        userAddress={userAddress}
        setIsFilled={setIsFilled}
        {...props}
      />
    )
  }

  return <></>
}

function SeaportFillOrderWithVerifiedContractCall({
  order,
  nft,
  userAddress,
  contractCall,
  setIsFilled,
  ...props
}: SeaportFillOrderProps & { contractCall: SeaportContractCall }) {
  const { requestClose } = useModal()

  const { offchainOrder } = order
  const { price } = offchainOrder
  const { chainTokenPrice } = price
  const ethPrice = useMemo(() => chainTokenPrice?.decimal, [chainTokenPrice])
  const { balance: walletBalance } = useAuth()

  const hasSufficientFunds = useMemo(
    () => ethPrice && walletBalance && parseFloat(walletBalance?.formatted) >= ethPrice,
    [ethPrice, walletBalance]
  )

  const savings = useMemo(
    () => (ethPrice ? (ethPrice * 0.025).toFixed(5) : '0'), // using OpenSea commission as the reference percentage.
    [ethPrice]
  )

  const {
    isValidated,
    error: validationError,
    loading: loadingValidation,
  } = useValidateSeaportContractCall(contractCall)

  const {
    attribution,
    logo: PlatformLogo,
    platformName,
  } = useOffchainOrderAttribution(
    offchainOrder.calldata!,
    offchainOrder?.properties?.salt
  )

  const { txError, txInProgress, finalizedTx, fillSeaportOrder } = useSeaportTransaction()

  const error = useMemo(() => {
    if (!hasSufficientFunds) {
      return new Error('Wallet has insufficient ETH to make this purchase')
    }
    return txError ?? validationError
  }, [hasSufficientFunds, txError, validationError])

  useEffect(() => finalizedTx!! && setIsFilled(true), [finalizedTx, setIsFilled])

  return (
    contractCall && (
      <Stack gap="x8" {...props}>
        <MarketModalHeading nftObj={nft} action="Buy" />
        <Stack gap="x3" {...props}>
          <Flex justify="space-between">
            <Paragraph inline color="text2">
              Marketplace
            </Paragraph>
            <Flex gap="x2">
              <Heading size="xs" inline color="text1">
                {platformName}
              </Heading>
              <PlatformLogo />
            </Flex>
          </Flex>
          <Separator />
          <Flex justify="space-between">
            <Paragraph inline color="text2">
              Savings
            </Paragraph>
            <Heading size="xs" inline color="text1">
              ~{savings} ETH
            </Heading>
          </Flex>
          <Paragraph color="text2">
            vs. competing marketplaces that charge a 2.5% fee
          </Paragraph>
          <Separator />
          <Flex justify="space-between">
            <Paragraph inline color="text2">
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
  )
}
