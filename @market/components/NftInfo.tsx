import { useMemo } from 'react'
import { Flex, Label, Stack, Heading, Separator } from '@zoralabs/zord'
import { ModalTitleAndDescription } from './ModalTitleAndDescription'
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

  return (
    <Stack gap="x4">
      <Flex justify="space-between" align="center">
        <ModalTitleAndDescription
          title={
            noWallet ? 'Connect your Wallet' : `Buy ${data ? data.metadata?.name : '...'}`
          }
        />
        <CollectionThumbnail collectionAddress={collectionAddress} tokenId={tokenId} />
      </Flex>
      <Separator />
      <Flex justify="space-between">
        <Label color="tertiary">Owned by</Label>
        {data?.nft?.owner?.address ? (
          <AddressWithLink address={data.nft.owner.address} />
        ) : (
          '...'
        )}
      </Flex>
      <Flex justify="space-between">
        <Label color="tertiary">Minted by</Label>
        {data?.nft?.minted?.address ? (
          <AddressWithLink address={data.nft.minted.address} />
        ) : (
          '...'
        )}
      </Flex>
      <Stack align="flex-end">
        {askPrice && (
          <Flex justify="space-between" align="center" w="100%">
            <Label color="tertiary">Price:</Label>
            <Heading size="md">{cryptoVal}</Heading>
          </Flex>
        )}
        {account?.address && <WalletBalance address={account.address} />}
      </Stack>
    </Stack>
  )
}
