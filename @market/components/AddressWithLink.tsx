import { useMemo } from 'react'
import { Label, Icon, Flex } from '@zoralabs/zord'
import { useEnsName } from 'wagmi'
import { useShortAddress } from 'hooks/useShortAddress'

export function AddressWithLink({ address }: { address: string }) {
  const { data: ensName } = useEnsName({
    address: address,
  })

  const shortAddress = useShortAddress(address)

  const buildTokenInfoLink = useMemo(
    () => `https://etherscan.io/address/${address}`,
    [address]
  )

  return (
    <Flex
      align="center"
      gap="x2"
      as="a"
      href={buildTokenInfoLink}
      target="_blank"
      rel="noreferrer"
    >
      <Label>{ensName ? ensName : shortAddress}</Label>
      <Icon id="ArrowRightAngle" />
    </Flex>
  )
}
