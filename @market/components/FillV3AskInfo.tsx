import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { AddressWithLink } from '@market/components/AddressWithLink'
import { WalletBalance } from '@market/components/WalletBalance'
import { formatCryptoVal, useAuth } from '@shared'
import { BoxProps, Flex, Heading, Label, Stack } from '@zord'

export interface ViewV3AskInfoProps extends BoxProps {
  token: TypeSafeToken
  askPrice?: string
  showBalance?: boolean
}

export function ViewV3AskInfo({
  token,
  askPrice,
  showBalance = true,
}: ViewV3AskInfoProps) {
  const { address } = useAuth()

  const cryptoVal = useMemo(() => {
    if (askPrice) return `${formatCryptoVal(parseFloat(askPrice))} ETH`
  }, [askPrice])

  if (!token) {
    return null
  }

  return (
    <>
      <Flex justify="space-between">
        <Label className="zora-market-fillAskInfo-label" color="text3">
          Owned by
        </Label>
        {token.owner ? <AddressWithLink address={token.owner} /> : '...'}
      </Flex>
      <Flex justify="space-between">
        <Label className="zora-market-fillAskInfo-label" color="text3">
          Minted by
        </Label>
        {token.mintInfo?.toAddress ? (
          <AddressWithLink address={token.mintInfo?.toAddress} />
        ) : (
          '...'
        )}
      </Flex>
      <Stack align="flex-end">
        {askPrice && (
          <Flex justify="space-between" align="center" w="100%">
            <Label className="zora-market-fillAskInfo-label" color="text3">
              Price:
            </Label>
            <Heading size="md">{cryptoVal}</Heading>
          </Flex>
        )}
        {showBalance && address && <WalletBalance address={address} />}
      </Stack>
    </>
  )
}
