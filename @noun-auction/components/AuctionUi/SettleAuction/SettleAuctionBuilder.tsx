import { useSigner } from 'wagmi'

import { ContractTransaction } from 'ethers'

import { useCallback, useEffect, useState } from 'react'

import {
  Auction as AuctionInterface,
  Auction__factory as BuilderNounsAuction__factory,
} from '@zoralabs/nouns-protocol/dist/typechain'

import { SettleAuctionProps } from './SettleAuction'
import { SettleAuctionComponent } from './SettleAuctionComponent'

export function SettleAuctionBuilder({
  useErrorMsg = false,
  auctionContractAddress,
  layout,
  settlementType,
  ...props
}: SettleAuctionProps) {
  const { data: signer } = useSigner()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [BuilderNounsAuction, setBuilderNounsAuction] = useState<AuctionInterface>()
  const [txSubmitted, setTxSubmitted] = useState<ContractTransaction | undefined>(
    undefined
  )

  useEffect(() => {
    if (auctionContractAddress && signer) {
      setBuilderNounsAuction(
        BuilderNounsAuction__factory?.connect(auctionContractAddress, signer)
      )
    }
  }, [auctionContractAddress, signer])

  const handleOnSubmit = useCallback(
    async (event) => {
      setIsLoading(true)
      try {
        event.preventDefault()
        const tx = await BuilderNounsAuction?.settleCurrentAndCreateNewAuction()
        setTxSubmitted(tx)
        setIsSuccess(true)
      } catch (err: any) {
        setIsError(err)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    [BuilderNounsAuction]
  )

  return (
    <SettleAuctionComponent
      settlementType={settlementType}
      layout={layout}
      handleOnSubmit={handleOnSubmit}
      isLoading={isLoading}
      txSubmitted={!!txSubmitted}
      {...props}
    />
  )
}
