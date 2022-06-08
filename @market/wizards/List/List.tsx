import { useState, useEffect } from 'react'
import { Box, Stack } from '@zoralabs/zord'
import {
  TransactionSubmitButton,
  ContractInteractionStatus,
  NftInfo,
  PrintError,
} from '@market/components'

type ListStep = 'ConnectWallet' | 'ReviewDetails' | 'Confirmation'

export function List({
  tokenId,
  tokenAddress,
}: {
  tokenId: string
  tokenAddress: string
}) {
  const [wizardStep, setWizardStep] = useState<ListStep>('ReviewDetails')

  return (
    <Stack w="100%">
      {wizardStep !== 'Confirmation' && (
        <NftInfo collectionAddress={tokenAddress} tokenId={tokenId} modalType="list" />
      )}
    </Stack>
  )
}
