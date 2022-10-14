import { Icon, Box, Stack, StackProps, color } from '@zoralabs/zord'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useEffect, useState } from 'react'
import * as styles from '@noun-auction/styles/NounishStyles.css'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { PrintError } from '@shared'
import { Button } from 'components/Button'

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

  useEffect(() => {
    if (writeContractError) setShowError(true)
  }, [writeContractError])

  return (
    <>
      <Stack w={layout === 'sideBarBid' ? '100%' : 'auto'} {...props}>
        <Button
          onClick={settleAuction}
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
