import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { Button } from 'components/Button'

import { useEffect, useState } from 'react'

import { useNounishAuctionProvider } from '@noun-auction/providers'
import * as styles from '@noun-auction/styles/NounishStyles.css'
import { PrintError } from '@shared'
import { useButtonRequiresAuth } from '@shared/hooks'
import { Box, Icon, Stack, StackProps, color } from '@zoralabs/zord'

export interface SettleAuctionProps extends StackProps {
  useErrorMsg?: boolean
}

export function SettleAuction({ useErrorMsg = false, ...props }: SettleAuctionProps) {
  const [showError, setShowError] = useState(false)

  const {
    daoConfig: { abi, auctionContractAddress },
    layout,
  } = useNounishAuctionProvider()

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: auctionContractAddress as string,
    contractInterface: abi,
    functionName: 'settleCurrentAndCreateNewAuction',
  })

  const {
    isLoading,
    error: writeContractError,
    write: settleAuction,
  } = useContractWrite(config)

  const buttonBehavior = useButtonRequiresAuth(settleAuction)

  useEffect(() => {
    if (writeContractError) setShowError(true)
  }, [writeContractError])

  return (
    <>
      <Stack w={layout === 'sideBarBid' ? '100%' : 'auto'} {...props}>
        <Button
          onClick={buttonBehavior}
          variant="secondary"
          className={styles.placeBidTrigger}
          w={layout === 'sideBarBid' ? '100%' : 'auto'}
          loading={isLoading}
        >
          Settle Auction
        </Button>
      </Stack>
      {useErrorMsg && showError && writeContractError && (
        <Button
          variant="unset"
          onClick={() => setShowError(false)}
          w="100%"
          style={{ backgroundColor: color.background2 }}
          className={styles.showError}
        >
          <PrintError w="100%" mt="x0" errorMessage={writeContractError.message} />
          <Box pr="x2">
            <Icon id="Close" />
          </Box>
        </Button>
      )}
    </>
  )
}
