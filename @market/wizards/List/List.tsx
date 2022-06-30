import React, { useCallback, useMemo, useState } from 'react'

import { Stack, Button, Heading, Paragraph } from '@zoralabs/zord'
import {
  ERC721ContractApprovalForm,
  FixedPriceListingForm,
  V3ApprovalForm,
  ContractInteractionStatus,
  NftInfo,
} from '@market/components'
import {
  ListingType,
  TRANSFER_HELPER_APPROVAL_COPY,
  ASKS_V1_APPROVAL_COPY,
  ASKS_V1_LISTED_COPY,
} from '@market/wizards/common'
import { useZoraERC721Approvals, useZoraV3ModuleApprovals } from '@market/hooks'
import { ASKS_V11_ADDRESS, ERC721_TRANSFER_HELPER_ADDRESS } from '@market/utils'
import { NFTObject } from '@zoralabs/nft-hooks'

type ListNFTStep =
  | 'SelectType'
  | 'ApproveTransferHelper'
  | 'ApproveAskModule'
  | 'ListingDetails'
  | 'Confirmation'

export function List({
  tokenId,
  tokenAddress,
  onClose,
  nftData,
  previewURL,
}: {
  tokenId: string
  tokenAddress: string
  onClose?: () => void
  previewURL?: string
  nftData: NFTObject
}) {
  const { asksV1 } = useZoraV3ModuleApprovals()
  const { transferHelper } = useZoraERC721Approvals(tokenAddress)

  const [wizardStep, setWizardStep] = useState<ListNFTStep>('SelectType')
  const [listingType, setListingType] = useState<ListingType>('FIXED_PRICE')
  const [txHash, setTxHash] = useState<string>()
  const [askState, setAskState] = useState<{ amount: string; currency: string }>()

  const { metadata } = nftData

  const handleConfirmType = useCallback(() => {
    setWizardStep(
      transferHelper
        ? asksV1
          ? 'ListingDetails'
          : 'ApproveAskModule'
        : 'ApproveTransferHelper'
    )
  }, [asksV1, listingType, transferHelper])

  const handleOnConfirmation = useCallback(
    (hash: string, amount: string, currency: string) => {
      setTxHash(hash)
      setAskState({ amount, currency })
      setWizardStep('Confirmation')
    },
    []
  )

  return (
    <Stack w="100%" gap="x4" p="x4">
      {wizardStep !== 'Confirmation' && (
        <NftInfo collectionAddress={tokenAddress} tokenId={tokenId} modalType="list" />
      )}
      {wizardStep === 'SelectType' ? (
        <Stack gap="x4">
          <Paragraph size="lg">
            Click continue to list {metadata?.name} for a fixed price with zoraV3. We will
            check if any approvals are needed before commencing.
          </Paragraph>
          <Button width="100%" variant="primary" onClick={handleConfirmType}>
            Continue
          </Button>
        </Stack>
      ) : wizardStep === 'ApproveTransferHelper' ? (
        <ERC721ContractApprovalForm
          title="Allow ZORA V3 to Use Your NFT"
          tokenAddress={tokenAddress}
          spenderAddress={ERC721_TRANSFER_HELPER_ADDRESS}
          approvalCopy={TRANSFER_HELPER_APPROVAL_COPY}
          buttonCopy="Approve NFT"
          onApproval={() => setWizardStep('ApproveAskModule')}
          onBack={() => setWizardStep('SelectType')}
        />
      ) : wizardStep === 'ApproveAskModule' ? (
        <V3ApprovalForm
          title="Allow Asks Module to Use Your Assets"
          spenderAddress={ASKS_V11_ADDRESS}
          approvalCopy={ASKS_V1_APPROVAL_COPY}
          buttonCopy="Approve Module"
          onApproval={() => setWizardStep('ListingDetails')}
          onBack={() => setWizardStep('SelectType')}
        />
      ) : wizardStep === 'ListingDetails' ? (
        listingType === 'FIXED_PRICE' && (
          <FixedPriceListingForm
            tokenId={tokenId}
            tokenAddress={tokenAddress}
            onConfirmation={handleOnConfirmation}
          />
        )
      ) : wizardStep === 'Confirmation' && txHash ? (
        <ContractInteractionStatus
          title="Your NFT will be listed shortly"
          description={ASKS_V1_LISTED_COPY}
          tokenId={tokenId}
          tokenAddress={tokenAddress}
          previewURL={previewURL}
          txHash={txHash}
          buttonCopy="Got it"
          onConfirm={onClose}
          amount={askState?.amount}
          currencyAddress={askState?.currency}
        />
      ) : null}
    </Stack>
  )
}
