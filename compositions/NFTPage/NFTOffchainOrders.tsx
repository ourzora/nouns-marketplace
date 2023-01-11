import { OffchainOrderWithToken } from 'types/zora.api.generated'

import { PriceCards } from '@market/components/PriceCards'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Stack, StackProps } from '@zord'

export interface NFTOffchainOrdersProps extends StackProps {
  nft: NFTObject
  offchainOrders: OffchainOrderWithToken[]
}

export function NFTOffchainOrders({
  nft,
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
      <PriceCards nft={nft} offchainOrders={offchainOrders} />
    </Stack>
  )
}
