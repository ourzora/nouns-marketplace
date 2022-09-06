import { useMemo } from 'react'
import { useNFT } from '@zoralabs/nft-hooks'
import { Flex, Stack } from '@zoralabs/zord'
import { FillV3AskInfo, ModalTitleAndDescription } from '@market/components'
import { useAuth, useTitleWithFallback } from '@shared'
import { CollectionThumbnail } from '@media/CollectionThumbnail'

export enum MODAL_TYPES {
  list = 'list',
  fillAsk = 'fillAsk',
  auction = 'auction',
}

export function NftInfo({
  collectionAddress,
  tokenId,
  askPrice,
  modalType,
}: {
  collectionAddress: string | undefined
  tokenId: string | undefined
  askPrice?: string
  /** Additional NFT info to display based on use context */
  modalType?: 'fillAsk' | 'list' | 'auction'
}) {
  const { data } = useNFT(collectionAddress, tokenId)
  const { address } = useAuth()

  const { fallbackTitle } = useTitleWithFallback({
    contractAddress: collectionAddress,
    tokenId,
  })

  const noWallet = useMemo(() => {
    return address === null ? true : false
  }, [address])

  if (!collectionAddress || !tokenId) return null

  return (
    <Stack gap="x4">
      <Flex justify="space-between" align="flex-start">
        <ModalTitleAndDescription
          title={
            noWallet
              ? 'Connect your Wallet'
              : `${
                  modalType === MODAL_TYPES.fillAsk
                    ? 'Buy'
                    : modalType === MODAL_TYPES.list
                    ? 'List'
                    : MODAL_TYPES.auction
                    ? 'Bid on'
                    : ''
                } ${data && data.metadata?.name ? data.metadata.name : fallbackTitle}`
          }
        />
        <CollectionThumbnail collectionAddress={collectionAddress} tokenId={tokenId} />
      </Flex>
      {data && modalType === 'fillAsk' && askPrice && (
        <FillV3AskInfo nft={data} askPrice={askPrice} />
      )}
    </Stack>
  )
}
