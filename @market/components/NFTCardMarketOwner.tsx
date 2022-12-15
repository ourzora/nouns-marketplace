import { lightFont } from '@shared'
import { Label, Stack, StackProps } from '@zoralabs/zord'

import { AddressWithLink } from './AddressWithLink'

interface NFTCardMarketOwnerProps extends StackProps {
  address: string | undefined // Must be a valid ETH address
  size?: 'md' | 'lg'
}

export function NFTCardMarketOwner({ address, size = 'md' }: NFTCardMarketOwnerProps) {
  if (!address) {
    return null
  }

  return (
    <Stack justify="space-between">
      <Label size={size} className={lightFont} color="text3">
        Owned by
      </Label>
      <AddressWithLink address={address} />
    </Stack>
  )
}
