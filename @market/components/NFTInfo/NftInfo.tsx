import { useMemo } from 'react'
import { useNFT } from '@zoralabs/nft-hooks'
import { useAccount } from 'wagmi'
import { Flex, Stack, Separator } from '@zoralabs/zord'
import { ModalTitleAndDescription } from '@market/components/ModalTitleAndDescription'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { FillAskInfo } from './FillAskInfo'
import { useTitleWithFallback } from 'hooks'

/* integrate market types */
// import { MARKET_TYPES } from '@zoralabs/nft-hooks/dist/types'

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
  const { address } = useAccount()

  if (!collectionAddress || !tokenId) return null

  const { fallbackTitle } = useTitleWithFallback(collectionAddress, tokenId)

  const noWallet = useMemo(() => {
    return address === null ? true : false
  }, [address])

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
        <FillAskInfo nft={data} askPrice={askPrice} />
      )}
    </Stack>
  )
}
