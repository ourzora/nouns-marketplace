import { Button } from 'components/Button'
import { OpenSeaIcon } from 'components/Icon'
import { mediumFont } from 'styles/styles.css'

import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react'

import { MarketModalHeading } from '@market/components'
import { useOffchainOrderAttribution } from '@market/hooks'
import { useValidateSeaportContractCall } from '@market/modules/Seaport/hooks/useValidateSeaportContractCall'
import { useNftMarketContext } from '@media/NFTCard2'
import { useModal } from '@modal'
import { formatContractError, useAuth } from '@shared'
import { PrintError } from '@shared/components/PrintError'
import { Flex, Heading, Paragraph, Separator, Stack } from '@zoralabs/zord'

import { CommonSeaportFillOrderProps } from './SeaportFillOrderFlow'
import { useSeaportTransaction } from './hooks/useSeaportTransaction'
import { SeaportContractCall } from './types/SeaportContractCall'

interface SeaportFillOrderProps extends CommonSeaportFillOrderProps {
  setIsFilled: Dispatch<SetStateAction<boolean>>
}

export function SeaportFillOrder({
  order,
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
  userAddress,
  contractCall,
  setIsFilled,
  ...props
}: SeaportFillOrderProps & { contractCall: SeaportContractCall }) {
  const { requestClose } = useModal()
  const { collectionAddress, collectionName, tokenId } = useNftMarketContext()

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

  const { logo: PlatformLogo, platformName } = useOffchainOrderAttribution(
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
        <MarketModalHeading
          collectionName={collectionName}
          contractAddress={collectionAddress}
          tokenId={tokenId}
          action="Buy"
        />
        <Stack gap="x3" {...props}>
          <Flex justify="space-between">
            <Paragraph size="lg" inline color="text2" className={[mediumFont]}>
              Marketplace
            </Paragraph>
            <Flex gap="x2">
              <Paragraph size="lg" inline color="text1">
                {platformName}
              </Paragraph>
              <PlatformLogo />
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
  )
}
