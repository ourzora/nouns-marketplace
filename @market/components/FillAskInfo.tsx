import { NFTObject } from '@zoralabs/nft-hooks'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { Flex, Label, Stack, Heading } from '@zoralabs/zord'
import { AddressWithLink } from '@market/components/AddressWithLink'
import { formatCryptoVal } from '@market/utils/numbers'
import { WalletBalance } from '@market/components/WalletBalace'

export function FillAskInfo({
  nft,
  askPrice,
  showBalance = true,
}: {
  nft: NFTObject
  askPrice?: string
  showBalance?: boolean
}) {
  const { address } = useAccount()

  const cryptoVal = useMemo(() => {
    if (askPrice) return `${formatCryptoVal(parseFloat(askPrice))} ETH`
  }, [])

  if (!nft) {
    return null
  }

  return (
    <>
      <Flex justify="space-between">
        <Label className="zora-market-fillAskInfo-label" color="tertiary">
          Owned by
        </Label>
        {nft?.nft?.owner?.address ? (
          <AddressWithLink address={nft.nft.owner.address} />
        ) : (
          '...'
        )}
      </Flex>
      <Flex justify="space-between">
        <Label className="zora-market-fillAskInfo-label" color="tertiary">
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
            <Label className="zora-market-fillAskInfo-label" color="tertiary">
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
