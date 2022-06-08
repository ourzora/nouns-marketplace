import { useState, useEffect } from 'react'
import { Box, Stack } from '@zoralabs/zord'
import {
  TransactionSubmitButton,
  ContractInteractionStatus,
  NftInfo,
  PrintError,
} from '@market/components'
import { CreateAsk } from './CreateAsk'

export type ListStep = 'ConnectWallet' | 'ReviewDetails' | 'Confirmation'

export function List({
  tokenId,
  tokenAddress,
}: {
  tokenId: string
  tokenAddress: string
}) {
  const [wizardStep, setWizardStep] = useState<ListStep>('ReviewDetails')

  return (
    <Stack w="100%" gap="x4">
      {wizardStep !== 'Confirmation' && (
        <NftInfo collectionAddress={tokenAddress} tokenId={tokenId} modalType="list" />
      )}
      <CreateAsk />
    </Stack>
  )
}
