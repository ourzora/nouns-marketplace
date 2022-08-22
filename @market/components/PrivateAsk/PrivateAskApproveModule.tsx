import { useZoraV3ModuleApproval } from '@market/hooks'
import { useContractContext } from '@market/providers'
import { useContractTransaction, useToggleOnce } from '@shared'
import { Button, Heading, Paragraph, Spinner, Stack } from '@zoralabs/zord'
import React, { useCallback, useEffect, useState } from 'react'

import { LearnMoreButton } from './LearnMoreButton'
import { CommonPrivateAskComponentProps } from './PrivateAskModal'

interface PrivateAskApproveModuleProps extends CommonPrivateAskComponentProps {}

export function PrivateAskApproveModule({
  onNext,
  ...props
}: PrivateAskApproveModuleProps) {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const [error, setError] = useState<string>()

  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const { approved, approve, mutate } = useZoraV3ModuleApproval(PrivateAsks.address)
  const [initialized, toggleInitialized] = useToggleOnce(false)

  console.log('in PrivateAskApproveModule...')

  // @BJ TODO: move into an Approval hook?
  const handleApproveModule = useCallback(async () => {
    // @TODO: Add approve module logic
    console.log('in handleApproveModule()...')
    console.log('APPROVED?', approved)

    try {
      console.log('in TRY')
      setError('')
      const promise = approve()
      await handleTx(promise)
      await mutate()

      approved && onNext && onNext()
    } catch (e: any) {
      console.log('in CATCH', e.message)
      setError(e.message)
      await mutate()
    }
    console.log('APPROVED?', approved)
    approved && onNext && onNext()
  }, [approve, approved, handleTx, mutate, onNext])

  useEffect(() => {
    approved ? onNext && onNext() : toggleInitialized()

    // approved && onNext && onNext()
  }, [approved, onNext, toggleInitialized])

  return !initialized ? (
    <Spinner />
  ) : (
    <Stack gap="x2">
      <Stack gap="x2">
        <Heading size="xs">Approve Module</Heading>

        <Paragraph size="sm">
          The new Reserve Auction Smart Contract features several improvements as well as
          new features such as
        </Paragraph>
      </Stack>

      <Button onClick={handleApproveModule} disabled={txInProgress}>
        Approve module
      </Button>

      <LearnMoreButton
        href="https://support.zora.co/en/articles/5878598-what-s-an-approval"
        target="_blank"
      >
        Learn more about selling on Zora
      </LearnMoreButton>
    </Stack>
  )
}
