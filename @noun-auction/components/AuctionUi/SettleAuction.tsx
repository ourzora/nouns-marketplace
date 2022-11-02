import { useAccount, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'

import { Button } from 'components/Button'

import { useCallback, useEffect, useState } from 'react'

import { createBidAbiFragment } from '@noun-auction/constants/nounish-markets'
import * as styles from '@noun-auction/styles/NounishStyles.css'
import { PrintError } from '@shared'
import { useButtonRequiresAuth } from '@shared/hooks'
import {
  Auction as AuctionInterface,
  Auction__factory as BuilderNounsAuction__factory,
} from '@zoralabs/nouns-protocol/dist/typechain'
import { Box, Icon, Stack, StackProps, color } from '@zoralabs/zord'

export interface SettleAuctionProps extends StackProps {
  useErrorMsg?: boolean
  auctionContractAddress: string
  layout: string
}

export function SettleAuction({
  useErrorMsg = false,
  auctionContractAddress,
  layout,
  ...props
}: SettleAuctionProps) {
  const { data: signer } = useSigner()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [BuilderNounsAuction, setBuilderNounsAuction] = useState<AuctionInterface>()

  useEffect(() => {
    if (auctionContractAddress && signer) {
      setBuilderNounsAuction(
        BuilderNounsAuction__factory.connect(auctionContractAddress, signer)
      )
    }
  }, [auctionContractAddress, signer])

  const handleOnSubmit = useCallback(
    async (event) => {
      setIsLoading(true)
      try {
        event.preventDefault()
        const tx = await BuilderNounsAuction?.settleCurrentAndCreateNewAuction()
        console.log({ tx })
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
    <>
      <Stack w={layout === 'sideBarBid' ? '100%' : 'auto'} {...props}>
        <Button
          onClick={handleOnSubmit}
          variant="secondary"
          className={styles.placeBidTrigger}
          w={layout === 'sideBarBid' ? '100%' : 'auto'}
          loading={isLoading}
        >
          Settle Auction
        </Button>
      </Stack>
    </>
  )
}
