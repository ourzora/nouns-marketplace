import { Stack, StackProps, Paragraph } from '@zoralabs/zord'
import { useAuth } from '@shared/hooks'
import * as styles from './NFTPage.css'
import { useOffchainOrders } from '@market/hooks/useOffchainOrders'
import { useMemo } from 'react'
import { useValidateContractCall } from '@market/hooks/useValidateContractCall'
import { NFTObject } from '@zoralabs/nft-hooks'

export interface NFTOffchainOrdersProps extends StackProps {
  nft: NFTObject
  offchainOrders: any[]
  userAddress: string
}

export function NFTOffchainOrders({
  nft,
  userAddress,
  offchainOrders,
  className,
  ...props
}: NFTOffchainOrdersProps) {
  // const { primarySalePrice } = useNounishAuctionProvider()
  // const { nft, tokenId: tokenIdString, contractAddress } = useNFTProvider()
  // const { data: offchainOrders } = useOffchainOrders(nft!)
  // const hasOffchainOrders = useMemo(() => offchainOrders?.length > 0, [offchainOrders])
  // const { tokenID, hasPreviousNFT, hasNextNFT, handlePrev, handleNext } = useTokenHelper(
  //   nft!
  // )
  // const { address: userAddress } = useAuth()
  const order = useMemo(() => offchainOrders[0], [offchainOrders])

  console.log('ORDER', order)

  const contractAddress = useMemo(() => order.offchainOrder.contractAddress, [order])
  const callData = useMemo(() => order.offchainOrder.calldata, [order])
  const value = useMemo(() => order.offchainOrder.price.chainTokenPrice.decimal, [order])

  const contractCall = useMemo(() => {
    return {
      caller_address: userAddress!, // user address
      contract_address: contractAddress, // the contract that fills the orders, eg. Seaport
      calldata: callData, //
      value: value, // Price in Ether (Decimal price)
    }
  }, [callData, contractAddress, userAddress, value])

  console.log('CONTRACT_CALL', contractCall)

  const { isValidated } = useValidateContractCall(contractCall)

  // console.log('OFF_CHAIN', offchain)

  // if (!hasOffchainOrders) return null

  return (
    <Stack
      id="nft-info-sidebar"
      className={[styles.nftInfoSidebar, className]}
      {...props}
    >
      <Paragraph size="sm">
        OFFCHAIN PRICE:{' '}
        {offchainOrders[0]?.offchainOrder?.price?.chainTokenPrice?.decimal}
        IS_VALIDATED: {isValidated ? 'yes' : 'no'}
      </Paragraph>
    </Stack>
  )
}
