import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { useEffect, useMemo, useState } from 'react'

import {
  LIL_NOUNS_AUCTION_ADDRESS,
  NOUNS_AUCTION_ADDRESS,
  createBidAbiFragment,
  lilNounsAbi,
  nounsAbi,
} from '@noun-auction'
import { useButtonRequiresAuth } from '@shared'

import { SettleAuctionProps } from './SettleAuction'
import { SettleAuctionComponent } from './SettleAuctionComponent'

export function SettleAuctionOGNouns({
  useErrorMsg = false,
  auctionContractAddress,
  layout,
  settlementType,
  ...props
}: SettleAuctionProps) {
  const [showError, setShowError] = useState(false)
  const [txSubmitted, setTxSubmitted] = useState(false)

  const abi = useMemo(
    () =>
      auctionContractAddress === NOUNS_AUCTION_ADDRESS
        ? nounsAbi
        : LIL_NOUNS_AUCTION_ADDRESS === auctionContractAddress
        ? lilNounsAbi
        : createBidAbiFragment,
    [auctionContractAddress]
  )

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: auctionContractAddress as string,
    contractInterface: abi,
    functionName: 'settleCurrentAndCreateNewAuction',
  })

  const {
    isLoading,
    error: writeContractError,
    write: settleAuction,
    isSuccess,
  } = useContractWrite(config)

  useEffect(() => {
    if (isSuccess) setTxSubmitted(true)
  }, [isSuccess])

  const buttonBehavior = useButtonRequiresAuth(settleAuction)

  useEffect(() => {
    if (writeContractError) setShowError(true)
  }, [writeContractError])

  return (
    <SettleAuctionComponent
      settlementType={settlementType}
      layout={layout}
      handleOnSubmit={buttonBehavior}
      isLoading={isLoading}
      txSubmitted={!!txSubmitted}
      {...props}
    />
  )
}
