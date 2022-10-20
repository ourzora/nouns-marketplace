import { useMemo } from 'react'

import { AddressWithLink } from '@market/components/AddressWithLink'
import { WalletBalance } from '@market/components/WalletBalance'
import { formatCryptoVal, useAuth } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { BoxProps, Flex, Heading, Label, Stack } from '@zoralabs/zord'

export interface FillV3AskInfoProps extends BoxProps {
  nft: NFTObject
  askPrice?: string
  showBalance?: boolean
}

export function FillV3AskInfo({ nft, askPrice, showBalance = true }: FillV3AskInfoProps) {
  const { address } = useAuth()

  const cryptoVal = useMemo(() => {
    if (askPrice) return `${formatCryptoVal(parseFloat(askPrice))} ETH`
  }, [askPrice])

  if (!nft) {
    return null
  }

  return (
    <>
      <Flex justify="space-between">
        <Label className="zora-market-fillAskInfo-label" color="text3">
          Owned by
        </Label>
        {nft?.nft?.owner?.address ? (
          <AddressWithLink address={nft.nft.owner.address} />
        ) : (
          '...'
        )}
      </Flex>
      <Flex justify="space-between">
        <Label className="zora-market-fillAskInfo-label" color="text3">
          Minted by
        </Label>
        {nft?.nft?.minted?.address ? (
          <AddressWithLink address={nft.nft.minted.address} />
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
