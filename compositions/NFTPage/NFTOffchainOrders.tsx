import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { useToken } from 'hooks/useToken'

import { PriceCards } from '@market/components/PriceCards'
import { Stack, StackProps } from '@zoralabs/zord'

export interface NFTOffchainOrdersProps extends StackProps {
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: ReturnType<typeof useToken>['markets']
  offchainOrders: OffchainOrderWithToken[]
}

export function NFTOffchainOrders({
  tokenId,
  contractAddress,
  collectionName,
  markets,
  offchainOrders,
  className,
  ...props
}: NFTOffchainOrdersProps) {
  // TODO: use useSWR to periodically refetch offchain orders.
  // It's quite unlikely that orders will be added while the page is open but it IS a possibility
  // One issue with this is that the order data from Seaport is dirty and we'd need to run a revalidation for each order to determine which should be shown
  // so we aren't displaying orders that cannot be filled.
  return (
    <Stack className={[className]} {...props}>
      <PriceCards
        tokenId={tokenId}
        contractAddress={contractAddress}
        collectionName={collectionName}
        markets={markets}
        offchainOrders={offchainOrders}
      />
    </Stack>
  )
}
