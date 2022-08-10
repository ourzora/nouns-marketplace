import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Paragraph, Text } from '@zoralabs/zord'
import { useContractTransaction, PrintError } from '@shared'
import { TransactionSubmitButton, ModalTitleAndDescription } from '@market/components'
import { useZoraV3ModuleApproval } from '@market/hooks'

interface ContractApprovalFormProps {
  title: string
  approvalCopy?: string
  buttonCopy?: string
  spenderAddress: string
  onApproval: () => void
  onBack: () => void
}

export function V3ApprovalForm({
  title,
  approvalCopy = 'To list your NFTs on ZORA, you first need to approve permission for ZORA to use your NFTs',
  buttonCopy = 'Approve your NFTs',
  spenderAddress,
  onApproval,
  onBack,
}: ContractApprovalFormProps) {
  const [error, setError] = useState<string>()
  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const { approved, approve, mutate } = useZoraV3ModuleApproval(spenderAddress)

  const handleApproveZoraV3Module = useCallback(async () => {
    try {
      setError('')
      const promise = approve()
      await handleTx(promise)
      await mutate()
    } catch (e: any) {
      setError(e.message)
      await mutate()
    }
  }, [approve, handleTx, mutate])

  useEffect(() => {
    if (approved) {
      onApproval()
    }
  }, [approved, onApproval])

  return (
    <Box>
      <ModalTitleAndDescription title={title} description={approvalCopy} mb="x2" />
      <Box mb="x4">
        <a>
          <Text as="span" variant="link">
            What's an approval?
          </Text>{' '}
          <Paragraph as="sup" top="x0" size="sm">
            ↗
          </Paragraph>
        </a>
      </Box>
      {error && <PrintError errorMessage={error} />}
      <TransactionSubmitButton
        txInProgress={txInProgress}
        txStatus={txStatus}
        onClick={handleApproveZoraV3Module}
      >
        {buttonCopy}
      </TransactionSubmitButton>
      <Button onClick={onBack} disabled={txInProgress} variant="ghost" w="100%">
        Go back
      </Button>
    </Box>
  )
}
