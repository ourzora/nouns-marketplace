import { useMemo, useState } from 'react'
import { ContractTransaction } from '@ethersproject/contracts'
import { formatContractError } from '@shared'

export enum WalletCallStatus {
  INITIAL = 'INITIAL',
  PROMPTED = 'PROMPTED',
  CONFIRMING = 'CONFIRMING',
  CONFIRMED = 'CONFIRMED',
  ERRORED = 'ERRORED',
}

export function useContractTransaction(confirmations: number = 1) {
  const [txStatus, setState] = useState<WalletCallStatus>(WalletCallStatus.INITIAL)
  const [txError, setError] = useState<Error | undefined>()
  const [tx, setTx] = useState<ContractTransaction>()

  async function handleTx(promise: Promise<ContractTransaction>) {
    try {
      setError(undefined)
      setState(WalletCallStatus.PROMPTED)
      const tx = await promise
      setTx(tx)
      setState(WalletCallStatus.CONFIRMING)
      await tx.wait(confirmations)
      setState(WalletCallStatus.CONFIRMED)

      return tx
    } catch (e: any) {
      const formattedError = new Error(formatContractError(e))
      setError(formattedError)
      setState(WalletCallStatus.ERRORED)
      throw formattedError
    }
  }

  const txInProgress = useMemo(
    () =>
      txStatus === WalletCallStatus.CONFIRMING || txStatus === WalletCallStatus.PROMPTED,
    [txStatus]
  )

  return { tx, txStatus, txInProgress, txError, handleTx }
}
