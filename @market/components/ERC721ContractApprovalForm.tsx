import { Button } from 'components/Button'

import { useCallback, useEffect, useState } from 'react'

import { ModalTitleAndDescription, TransactionSubmitButton } from '@market/components'
import { useERC721TokenApproval } from '@market/hooks'
import { PrintError, useContractTransaction } from '@shared'
import { Box, Grid, Paragraph, Stack, Text } from '@zoralabs/zord'

interface ContractApprovalFormProps {
  title: string
  approvalCopy?: string
  buttonCopy?: string
  tokenAddress: string
  spenderAddress: string
  onApproval: () => void
  onBack: () => void
}

// TODO - add error message state
export function ERC721ContractApprovalForm({
  title,
  approvalCopy = 'To list your NFTs on ZORA, you first need to approve permission for ZORA to use your NFTs',
  buttonCopy = 'Approve your NFTs',
  tokenAddress,
  spenderAddress,
  onApproval,
  onBack,
}: ContractApprovalFormProps) {
  const [error, setError] = useState<string>()
  const { approved, approve, mutate } = useERC721TokenApproval(
    tokenAddress,
    spenderAddress
  )
  const { txStatus, handleTx, txInProgress } = useContractTransaction()

  const handleApproveERC721ForSpender = useCallback(async () => {
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
    <Stack gap="x4">
      <Box>
        <ModalTitleAndDescription title={title} description={approvalCopy} mb="x2" />
        <a
          href="https://support.zora.co/en/articles/5878598-what-s-an-approval"
          target="_blank"
          rel="noreferrer"
        >
          <Text as="span" variant="link">
            What&apos;s an approval?
          </Text>{' '}
          <Paragraph as="sup" top="x0" size="sm">
            ↗
          </Paragraph>
        </a>
      </Box>
      {error && <PrintError errorMessage={error} />}
      <Grid style={{ gridTemplateColumns: '1fr 1fr' }} gap="x2">
        <Button disabled={txInProgress} variant="secondary" w="100%" onClick={onBack}>
          Go back
        </Button>
        <TransactionSubmitButton
          w="100%"
          txInProgress={txInProgress}
          txStatus={txStatus}
          onClick={handleApproveERC721ForSpender}
        >
          {buttonCopy}
        </TransactionSubmitButton>
      </Grid>
    </Stack>
  )
}
