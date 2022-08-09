import { Text, Stack } from '@zoralabs/zord'
import { lightFont } from '@shared'
import { AddressWithLink } from './AddressWithLink'

export function NFTOwner({
  address,
  align = 'right',
}: {
  /** Must be a valid ETH address */
  address: string | undefined
  align?: 'right' | 'left'
}) {
  if (!address) {
    return null
  }

  return (
    <Stack
      align={align === 'left' ? 'flex-start' : 'flex-end'}
      justify="space-between"
      flex="1"
    >
      <Text variant="label-lg" align={align} className={lightFont} color="tertiary">
        Owned by
      </Text>
      <AddressWithLink address={address} />
    </Stack>
  )
}
