import { lightFont } from '@shared'
import { Label, Stack } from '@zord'

import { AddressWithLink } from './AddressWithLink'

export function NFTOwner({
  address,
  align = 'right',
  size = 'lg',
}: {
  /** Must be a valid ETH address */
  address: string | undefined
  align?: 'right' | 'left'
  size?: 'md' | 'lg'
}) {
  if (!address) {
    return null
  }

  return (
    <Stack
      align={align === 'left' ? 'flex-start' : 'flex-end'}
      justify="space-between"
      flex={1}
    >
      <Label size={size} align={align} className={lightFont} color="text3">
        Owned by
      </Label>
      <AddressWithLink address={address} />
    </Stack>
  )
}
