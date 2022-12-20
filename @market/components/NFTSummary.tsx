import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'

import { ModalTitleAndDescription, ViewV3AskInfo } from '@market/components'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { ErrorBoundary } from '@sentry/nextjs'
import { useAuth } from '@shared/hooks'
import { Flex, Stack } from '@zord'

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
  collectionAddress: string
  tokenId: string
  askPrice?: string
  /** Additional NFT info to display based on use context */
  modalType?: MODAL_TYPES.fillAsk | MODAL_TYPES.list | MODAL_TYPES.auction
}) {
  const { token } = useToken({ collectionAddress, tokenId })

  const { address } = useAuth()
  const hasAsk = useMemo(
    () => token && modalType === MODAL_TYPES.fillAsk && askPrice,
    [askPrice, token, modalType]
  )
  const fallbackTitle = `${token?.collectionName} #${token?.tokenId}`

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
          } ${token?.collectionName ?? fallbackTitle}`,
    [token, fallbackTitle, modalType, noWallet]
  )

  if (!token || !collectionAddress || !tokenId) return null

  return (
    <ErrorBoundary>
      <Stack gap="x4">
        <Flex justify="space-between" align="flex-start">
          <ModalTitleAndDescription title={modalTitle} />
          <CollectionThumbnail collectionAddress={token.collectionAddress} />
        </Flex>
        {hasAsk && <ViewV3AskInfo token={token} askPrice={askPrice} />}
      </Stack>
    </ErrorBoundary>
  )
}
