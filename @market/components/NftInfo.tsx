import { useMemo } from 'react'
import { Flex, Label, Stack } from '@zoralabs/zord'
import { ModalTitleAndDescription } from '@modal'
import { useNFT } from '@zoralabs/nft-hooks'
import { useAccount } from 'wagmi'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { AddressWithLink } from './AddressWithLink'
import { formatCryptoVal } from '@market/utils/numbers'
import { WalletBalance } from './WalletBalace'

export function NftInfo({
  collectionAddress,
  tokenId,
  askPrice,
}: {
  collectionAddress: string
  tokenId: string
  askPrice?: string
}) {
  const { data } = useNFT(collectionAddress, tokenId)
  const { data: account } = useAccount()

  const noWallet = useMemo(() => {
    return account === null ? true : false
  }, [account])

  const cryptoVal = useMemo(() => {
    if (askPrice) return `${formatCryptoVal(parseFloat(askPrice))} ETH`
  }, [])

  if (!data) {
    return null
  }

  return (
    <Stack gap="x6">
      <Flex justify="space-between">
        <Stack>
          <ModalTitleAndDescription
            title={noWallet ? 'Connect your Wallet' : `Buy ${data.metadata?.name}`}
          />
          {askPrice && <Label>for: {cryptoVal}</Label>}
          {account?.address && <WalletBalance address={account.address} />}
        </Stack>
        <CollectionThumbnail collectionAddress={collectionAddress} tokenId={tokenId} />
      </Flex>
      <Flex justify="space-between">
        <Label>Owned by</Label>
        {data?.nft?.owner?.address && (
          <AddressWithLink address={data.nft.owner.address} />
        )}
      </Flex>
      <Flex justify="space-between">
        <Label>Minted by</Label>
        {data?.nft?.minted?.address && (
          <AddressWithLink address={data.nft.minted.address} />
        )}
      </Flex>
    </Stack>
  )
}
