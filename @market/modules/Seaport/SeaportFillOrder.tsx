import { Button } from 'components/Button'
import { OpenSeaIcon } from 'components/Icon'
import { mediumFont } from 'styles/styles.css'

import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react'

import { MarketModalHeading } from '@market/components'
import { useValidateSeaportContractCall } from '@market/modules/Seaport/hooks/useValidateSeaportContractCall'
import { useModal } from '@modal'
import { formatContractError } from '@shared'
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

  const contractCall = useMemo(() => {
    return {
      caller_address: userAddress!, // user address ||||| TODO: okay, this is stupid. But the SeaPort validation requires that the user has sufficient funds. If we want to validate regardless, maybe we just use some whala's address for confirmation (eg. the Nouns DAO treasury address)
      contract_address: contractAddress, // the contract that fills the orders, eg. Seaport
      calldata: calldata, //
      value: ethPrice, // Price in Ether (Decimal price)
    }
  }, [calldata, contractAddress, userAddress, ethPrice])
  const {
    isValidated,
    error: validationError,
    loading: loadingValidation,
  } = useValidateSeaportContractCall(contractCall)

  const { txError, txInProgress, finalizedTx, fillSeaportOrder } = useSeaportTransaction()

  const savings = useMemo(
    () => (ethPrice ? (parseFloat(ethPrice) * 0.025).toFixed(5) : '0'),
    [ethPrice]
  )

  const error = useMemo(() => txError ?? validationError, [txError, validationError])

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
