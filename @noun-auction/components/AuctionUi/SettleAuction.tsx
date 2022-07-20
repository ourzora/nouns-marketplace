import { Button, Icon, Grid, Box, Stack, StackProps, color } from '@zoralabs/zord'
import { useContractWrite } from 'wagmi'
import { useEffect, useState } from 'react'
import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { PrintError } from '@market'

export interface SettleAuctionProps extends StackProps {}

export function SettleAuction({ ...props }: SettleAuctionProps) {
  const [showError, setShowError] = useState(false)

  const {
    daoConfig: { abi, auctionContractAddress },
    layout,
    contract: { isPaused },
  } = useNounishAuctionProvider()

  // console.log(auctionContract)

  useEffect(() => {
    console.log('isPaused', isPaused)
  }, [isPaused])

  const {
    data,
    isError,
    isLoading,
    error: writeContractError,
    write: settleAuction,
  } = useContractWrite({
    addressOrName: auctionContractAddress as string,
    contractInterface: abi,
    functionName: 'settleCurrentAndCreateNewAuction',
  })

  useEffect(() => {
    if (writeContractError) setShowError(true)
  }, [writeContractError])

  return (
    <>
      <Stack w={layout === 'sideBarBid' ? '100%' : 'auto'} {...props}>
        <Button
          onClick={settleAuction}
          variant="reverse"
          className={placeBidTrigger}
          w={layout === 'sideBarBid' ? '100%' : 'auto'}
          disabled={isPaused}
          loading={isLoading}
        >
          Settle Auction
        </Button>
      </Stack>
      {showError && writeContractError && (
        <Button
          variant="unset"
          onClick={() => setShowError(false)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
          style={{ backgroundColor: color.black10 }}
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
