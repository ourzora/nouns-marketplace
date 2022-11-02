import { useAccount, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'

import React, { useState } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import {
  auctionWrapperVariants,
  lilNounsAbi,
  nounsAbi,
  useNounishAuctionQuery,
} from '@noun-auction'
import {
  LIL_NOUNS_AUCTION_ADDRESS,
  NOUNS_AUCTION_ADDRESS,
  createBidAbiFragment,
} from '@noun-auction/constants/nounish-markets'
import { BoxProps } from '@zoralabs/zord'

import { BuilderNounsBidForm } from './BuilderNounsBidForm'
import { NounsBidFormComponent } from './NounsBidFormComponent'

const isOGNounAddress = (a: string) => {
  return a === NOUNS_AUCTION_ADDRESS || a === LIL_NOUNS_AUCTION_ADDRESS
}
export interface NounsBidFormProps extends BoxProps {
  onConfirmation?: (txHash: string, amount: string, currencyAddress: string) => void
  layout: keyof typeof auctionWrapperVariants['layout']
  collectionAddress: string
}

export function NounsBidForm({ collectionAddress, ...props }: NounsBidFormProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  if (!activeAuction) return null

  if (isOGNounAddress(activeAuction.address)) {
    return <OGNounsBidForm activeAuction={activeAuction} {...props} />
  } else {
    return <BuilderNounsBidForm activeAuction={activeAuction} {...props} />
  }
}

const OGNounsBidForm = ({
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
    write: handleOnSubmit,
  } = useContractWrite(config)

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
    />
  )
}
