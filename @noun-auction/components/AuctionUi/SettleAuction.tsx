import { Button, Icon, Box, Stack, StackProps, color } from '@zoralabs/zord'
import { useContractWrite } from 'wagmi'
import { useEffect, useState } from 'react'
import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { PrintError } from '@shared'

export interface SettleAuctionProps extends StackProps {
  useErrorMsg?: boolean
}

export function SettleAuction({ useErrorMsg = false, ...props }: SettleAuctionProps) {
  const [showError, setShowError] = useState(false)

  const {
    daoConfig: { abi, auctionContractAddress },
    layout,
  } = useNounishAuctionProvider()

  const {
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
          loading={isLoading}
        >
          Settle Auction
        </Button>
      </Stack>
      {useErrorMsg && showError && writeContractError && (
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
