import { useSigner } from 'wagmi'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

import { NounsBidFormProps } from '@noun-auction'
import { PrintError } from '@shared'
import {
  Auction as AuctionInterface,
  Auction__factory as BuilderNounsAuction__factory,
} from '@zoralabs/nouns-protocol/dist/typechain'

import { NounsBidFormComponent } from './NounsBidFormComponent'

export type BuilderNounsBidFormProps = {
  activeAuction: TypeSafeNounsAuction
} & Omit<NounsBidFormProps, 'collectionAddress'>

export const BuilderNounsBidForm = ({
  activeAuction,
  ...rest
}: BuilderNounsBidFormProps) => {
  const { data: signer } = useSigner()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [bidAmount, setBidAmount] = useState('0')

  useEffect(() => {
    if (activeAuction.address && signer) {
      setBuilderNounsAuction(
        BuilderNounsAuction__factory.connect(activeAuction.address, signer)
      )
    }
  }, [activeAuction.address, signer])

  const [BuilderNounsAuction, setBuilderNounsAuction] = useState<AuctionInterface>()

  const handleOnSubmit = useCallback(
    async (event) => {
      setIsLoading(true)
      try {
        event.preventDefault()
        const tx = await BuilderNounsAuction?.createBid(activeAuction.tokenId, {
          value: bidAmount,
        })

        setIsSuccess(true)
      } catch (err: any) {
        setIsError(err)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    [BuilderNounsAuction, activeAuction.tokenId, bidAmount]
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
      errorComponent={isError && <PrintError errorMessage={isError} mb="x4" />}
      prepareError={null}
    />
  )
}
