import { useEnsName } from 'wagmi'

import { useMemo } from 'react'

import { useShortAddress } from '@shared'
import { Flex, FlexProps, Heading, Icon } from '@zord'

interface AddressWithLinkProps extends FlexProps {
  address: string
  useEns?: boolean
}

export function AddressWithLink({
  address,
  useEns = true,
  ...props
}: AddressWithLinkProps) {
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
      {...props}
    >
      <Heading size="xs" className="zora-market-addressWithLink">
        {ensName && useEns ? ensName : shortAddress}
      </Heading>
      <Icon id="ArrowRightAngle" />
    </Flex>
  )
}
