import { useAccount, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'

import React, { useCallback, useMemo, useState } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { NounsBidFormProps, lilNounsAbi, nounsAbi } from '@noun-auction'
import {
  LIL_NOUNS_AUCTION_ADDRESS,
  NOUNS_AUCTION_ADDRESS,
  createBidAbiFragment,
} from '@noun-auction/constants/nounish-markets'
import { PrintError, formatContractError } from '@shared'

import { NounsBidFormComponent } from './NounsBidFormComponent'

export const OGNounsBidForm = ({
  activeAuction,
  ...rest
}: Omit<NounsBidFormProps, 'collectionAddress'> & {
  activeAuction: TypeSafeNounsAuction
}) => {
  const { address } = useAccount()
  const [bidAmount, setBidAmount] = useState('0')

  let abi =
    activeAuction.address === NOUNS_AUCTION_ADDRESS
      ? nounsAbi
      : LIL_NOUNS_AUCTION_ADDRESS === activeAuction.address
      ? lilNounsAbi
      : createBidAbiFragment

  const hasBidInput = useMemo(() => bidAmount !== '0', [bidAmount])

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: activeAuction.address,
    contractInterface: abi,
    functionName: 'createBid',
    overrides: {
      from: address,
      value: bidAmount,
    },
    args: [activeAuction.tokenId],
  })

  const {
    isError,
    isLoading,
    isSuccess,
    error: writeContractError,
    write: placeBid,
  } = useContractWrite(config)

  const hasError = useMemo(
    // Error writing to contract OR error in contract write preparation (initial form setup)
    () => hasBidInput && ((isError && writeContractError) || prepareError),
    [isError, prepareError, writeContractError, hasBidInput]
  )

  const errorOutput = useMemo(() => {
    if (isError && writeContractError) return formatContractError(writeContractError)
    if (prepareError) return formatContractError(prepareError)
    return null
  }, [isError, prepareError, writeContractError])

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault()
      placeBid && placeBid()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bidAmount]
  )

  return (
    <NounsBidFormComponent
      activeAuction={activeAuction}
      isError={isError}
      isLoading={isLoading}
      isSuccess={isSuccess}
      setBidAmount={setBidAmount}
      bidAmount={bidAmount}
      handleOnSubmit={handleOnSubmit}
      layout={rest.layout}
      errorComponent={hasError && <PrintError errorMessage={errorOutput} mb="x4" />}
      prepareError={prepareError}
    />
  )
}
