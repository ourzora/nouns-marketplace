import { useZoraV3ModuleApproval } from '@market/hooks'
import { useContractContext } from '@market/providers'
import { useContractTransaction, useToggleOnce } from '@shared'
// import { Button, Heading, Paragraph, Spinner, Stack } from '@zoralabs/zord'
import { useCallback, useState } from 'react'

// import { LearnMoreButton } from './LearnMoreButton'
// import { CommonPrivateAskComponentProps } from './PrivateAskModal'

// interface PrivateAskApproveModuleProps extends CommonPrivateAskComponentProps {}

export function usePrivateAskModuleApproval() {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const [error, setError] = useState<string>()

  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const {
    approved: isApproved,
    approve,
    mutate,
  } = useZoraV3ModuleApproval(PrivateAsks.address)
  //   const [initialized, toggleInitialized] = useToggleOnce(false)

  // console.log('in PrivateAskApproveModule...')

  // @BJ TODO: move into an Approval hook?
  const handleApproveModule = useCallback(async () => {
    // @TODO: Add approve module logic
    console.log('in handleApproveModule()...')
    console.log('APPROVED?', isApproved)

    try {
      console.log('in TRY')
      setError('')
      const promise = approve()
      await handleTx(promise)
      await mutate()

      //   isApproved && onNext && onNext()
    } catch (e: any) {
      console.log('in CATCH', e.message)
      setError(e.message)
      await mutate()
    }
    console.log('APPROVED?', isApproved)
    // isApproved && onNext && onNext()
  }, [
    approve,
    isApproved,
    handleTx,
    mutate,
    //  onNext
  ])

  return {
    txStatus,
    txInProgress,
    isApproved,
    error,
    handleApproveModule,
  }
}
