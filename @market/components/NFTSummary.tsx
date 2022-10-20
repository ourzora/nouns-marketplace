import { useMemo } from 'react'

import { FillV3AskInfo, ModalTitleAndDescription } from '@market/components'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useAuth, useTitleWithFallback } from '@shared/hooks'
import { useNFT } from '@zoralabs/nft-hooks'
import { Flex, Stack } from '@zoralabs/zord'

export enum MODAL_TYPES {
  list = 'list',
  fillAsk = 'fillAsk',
  auction = 'auction',
}

export function NFTSummary({
  collectionAddress,
  tokenId,
  askPrice,
  modalType,
}: {
  collectionAddress: string | undefined
  tokenId: string | undefined
  askPrice?: string
  /** Additional NFT info to display based on use context */
  modalType?: MODAL_TYPES.fillAsk | MODAL_TYPES.list | MODAL_TYPES.auction
}) {
  const { data: nft } = useNFT(collectionAddress, tokenId)
  const { address } = useAuth()
  const hasAsk = useMemo(
    () => nft && modalType === MODAL_TYPES.fillAsk && askPrice,
    [askPrice, nft, modalType]
  )
  const { fallbackTitle } = useTitleWithFallback({
    contractAddress: collectionAddress,
    tokenId,
  })

  const noWallet = useMemo(() => address === null, [address])
  const modalTitle = useMemo(
    () =>
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
          } ${nft && nft.metadata?.name ? nft.metadata.name : fallbackTitle}`,
    [nft, fallbackTitle, modalType, noWallet]
  )

  if (!collectionAddress || !tokenId) return null

  return (
    <Stack gap="x4">
      <Flex justify="space-between" align="flex-start">
        <ModalTitleAndDescription title={modalTitle} />
        <CollectionThumbnail
          initialNFT={nft}
          collectionAddress={collectionAddress}
          tokenId={tokenId}
        />
      </Flex>
      {hasAsk && <FillV3AskInfo nft={nft!} askPrice={askPrice} />}
    </Stack>
  )
}
